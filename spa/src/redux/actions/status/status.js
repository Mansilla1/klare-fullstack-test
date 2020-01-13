import statusApi from '/spa/src/api/status/status'

export const types = {
  showStatusList: 'SHOW_STATUS_LIST',
}

export const showStatusList = statusList => ({
  type: types.showStatusList,
  payload: {
    statusList,
  },
})

export const getStatusList = () => (dispatch) => {
  dispatch(statusApi.actions.status())
    .then(response => dispatch(showStatusList(response.data)))
}
