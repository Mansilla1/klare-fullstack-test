import { notification } from 'antd'

import ticketsApi from '/spa/src/api/tickets/tickets'

export const types = {
  showTicketsList: 'SHOW_TICKETS_LIST',
  updateTicket: 'UPDATE_TICKET',
  addTicket: 'ADD_TICKET',
}

export const showTicketsList = ticketsList => ({
  type: types.showTicketsList,
  payload: {
    ticketsList,
  },
})

export const updateTicket = response => ({
  type: types.updateTicket,
  payload: {
    response,
  },
})

export const addTicket = response => ({
  type: types.addTicket,
  payload: {
    response,
  },
})

export const getTicketList = () => dispatch => {
  dispatch(ticketsApi.actions.tickets())
    .then(response => dispatch(showTicketsList(response.data)))
    .catch(() => {
      notification.error({
        message: 'No se puede obtener información',
        duration: 15,
      })
    })
}

export const saveData = payload => dispatch => {
  new Promise((resolve, reject) => {
    if (payload.id) {
      dispatch(ticketsApi.actions.detail.patch(payload.id, payload))
        .then((response) => {
          dispatch(updateTicket(response))
          notification.success({
            message: `Ticket ${payload.id} actualizado con éxito`,
          })
          resolve(response)
        })
        .catch((error) => {
          notification.error({
            message: `Ticket ${payload.id} no se puede actualizar`,
          })
          reject(error)
        })
    } else {
      dispatch(ticketsApi.actions.create.post(payload))
        .then((response) => {
          dispatch(addTicket(response))
          notification.success({
            message: 'Tarjeta creada con éxito',
          })
          resolve(response)
        })
        .catch((error) => {
          notification.error({
            message: 'No se puede crear la tarjeta',
          })
          reject(error)
        })
    }
  })
}