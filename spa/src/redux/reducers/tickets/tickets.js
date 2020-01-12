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
      ticketsList: state.ticketsList.map(data => (
        data.id !== action.payload.response.id ? { ...data } : { ...data, ...action.payload.response }
      )),
    }
  }

  case types.addTicket: {
    return {
      ...state,
      ticketsList: [
        ...state.ticketsList,
        action.payload.response,
      ],
    }
  }

  case types.removeticket: {
    const removeTicket = action.payload.response
    const finalResult = []
    state.ticketsList.forEach(data => {
      if (removeTicket.id !== data.id) {
        finalResult.push(data)
      }
    })
    return {
      ...state,
      ticketsList: finalResult,
    }
  }

  default:
    return state
  }
}

export default tickets
