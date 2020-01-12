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

  case types.updateTicket: {
    return {
      ...state,
      response: action.payload.response,
    }
  }

  case types.addTicket: {
    return {
      ...state,
      response: action.payload.response,
    }
  }

  default:
    return state
  }
}

export default tickets
