import { connect } from 'react-redux'
import { UPDATE_CURRENT_USER, TOGGLE_DROWER, TOGGLE_SNACKBAR, TOGGLE_RULES,
  ADD_CHANNEL_SUBSCRIPTION_WHEN_READY, REMOVE_CHANNEL_SUBSCRIPTION } from '~/app/reducers/Shared'
import { CHANGE_NAME } from '~/app/reducers/Username'
import { REFRESH } from '~/app/reducers/UsersOnline'
import { createAction } from 'redux-actions'
import * as api from '~/app/api'
import Layout from '~/app/components/layout/Layout'

var mapStateToProps = (state) => {return {
  drowerOpen: state.shared.drower.open,
  snackbarOpen: state.shared.snackbar.open,
  snackbarMessage: state.shared.snackbar.message,
  currentUserLoaded: state.shared.currentUserLoaded,
  cable: state.shared.cable
}}

var mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: async () => {
      const currentUser = await api.getCurrentUser()
      dispatch(createAction(CHANGE_NAME)({name: currentUser.name}))
      dispatch(createAction(UPDATE_CURRENT_USER)({currentUser}))
    },
    toggleDrower: () => { dispatch(createAction(TOGGLE_DROWER)()) },
    toggleSnackbar: () => { dispatch(createAction(TOGGLE_SNACKBAR)({message: ''})) },
    toggleRules: () => { dispatch(createAction(TOGGLE_RULES)()) },
    updateCurrentUser: (currentUser) => { dispatch(createAction(UPDATE_CURRENT_USER)({currentUser}))},
    addSubscription: (channel, settings) => {
      dispatch(createAction(ADD_CHANNEL_SUBSCRIPTION_WHEN_READY)({channel, settings}))
    },
    removeSubscription: (channel) => { dispatch(createAction(REMOVE_CHANNEL_SUBSCRIPTION)({channel})) },
    refreshUsers: (data) => { dispatch(createAction(REFRESH)(data)) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout)
