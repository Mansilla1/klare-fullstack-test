import { types } from '/spa/src/redux/actions/tickets/tickets'


const initialState = {
  ticketsList: [],
  updateTicket: {},
  addTicket: {},
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
      updateTicket: action.payload.response,
    }
  }

  case types.addTicket: {
    return {
      ...state,
      addTicket: action.payload.response,
    }
  }

  default:
    return state
  }
}

export default tickets
