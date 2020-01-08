import { notification } from 'antd'

import ticketsApi from '/spa/src/api/tickets/tickets'

export const types = {
  showTicketsList: 'SHOW_TICKETS_LIST',
}

export const showTicketsList = ticketsList => ({
  type: types.showTicketsList,
  payload: {
    ticketsList,
  },
})

export const getTicketList = () => (dispatch) => {
  debugger
  dispatch(ticketsApi.actions.tickets())
    .then(response => dispatch(showTicketsList(response.data)))
    .catch(() => {
      notification.error({
        message: 'No se puede obtener información',
        duration: 15,
      })
    })
}
