class Player < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :user_id, uniqueness: { scope: :game_id }
  delegate :name, to: :user

  scope :decided, -> { where(decided: true) }
  scope :cool, -> { where(hitrojop: false) }
  scope :winners, -> { where(winner: true) }

  after_create :refresh_games, :refresh_player_game

  def decide!(data)
    self.hitrojop = data['hitrojop']
    self.previous_round_hitrojop = data['hitrojop']
    self.increment(:points) if data['hitrojop']
    self.decided = true
    self.save!
  end

  private

  def refresh_games
    manager = GameListManager.new
    manager.refresh(manager.common_channel, changed_games_ids: [self.game.id])
  end

  def refresh_player_game
    manager = GameManager.new(game)
    manager.send_players
  end
end
