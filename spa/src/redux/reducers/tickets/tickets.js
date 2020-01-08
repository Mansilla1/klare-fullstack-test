import { types } from '/spa/src/redux/actions/tickets/tickets'


const initialState = {
  ticketsList: [],
}

const tickets = (state = initialState, action) => {
  switch (action.type) {
  case types.showTicketsList: {
    return {
      ...state,
      ticketsList: action.payload.ticketsList,
    }
  }

  default:
    return state
  }
}

export default tickets
