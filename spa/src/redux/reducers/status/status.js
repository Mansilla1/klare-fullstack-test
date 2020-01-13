import { types } from '/spa/src/redux/actions/status/status'


const initialState = {
  statusList: [],
}

const status = (state = initialState, action) => {
  switch (action.type) {
  case types.showStatusList: {
    return {
      ...state,
      statusList: action.payload.statusList,
    }
  }

  default:
    return state
  }
}

export default status
