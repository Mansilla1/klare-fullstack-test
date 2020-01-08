import { combineReducers } from 'redux'

import ticketsApi from '/spa/src/api/tickets/tickets'
import ticketsReducers from '/spa/src/redux/reducers/tickets/tickets'


export default combineReducers({
  api: combineReducers({
    tickets: combineReducers(ticketsApi.reducers),
  }),
  tickets: ticketsReducers,
})
