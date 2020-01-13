import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from '/spa/src/redux/reducers/reducers'


const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleWare(
  reducer,
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
)

if (module.hot) {
  module.hot.accept('/spa/src/redux/reducers/reducers', () => {
    /* eslint-disable global-require */
    const nextRootReducer = require('/spa/src/redux/reducers/reducers')
    /* eslint-enable */
    store.replaceReducer(nextRootReducer)
  })
}

export default store
