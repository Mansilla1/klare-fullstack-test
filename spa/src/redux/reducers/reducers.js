import { combineReducers } from 'redux'

import ticketsApi from '/spa/src/api/tickets/tickets'
import statusApi from '/spa/src/api/status/status'
import ticketsReducers from '/spa/src/redux/reducers/tickets/tickets'
import statusReducers from '/spa/src/redux/reducers/status/status'


export default combineReducers({
  api: combineReducers({
    tickets: combineReducers(ticketsApi.reducers),
    status: combineReducers(statusApi.reducers),
  }),
  tickets: ticketsReducers,
  status: statusReducers,
})
