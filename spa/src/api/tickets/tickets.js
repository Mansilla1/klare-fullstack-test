import reduxApi, { transformers as t } from 'redux-api'

import adapterFetch from '/spa/src/api/adapters/fetch'
import { getOptions } from '/spa/src/utils/utils'

export default reduxApi({
  tickets: {
    url: 'api/v1/tickets/',
    transformer: t.object,
    options: getOptions('GET'),
  },
  create: {
    url: 'api/v1/tickets/',
    transformer: t.object,
    options: getOptions('POST'),
    helpers: {
      post(requestData) {
        return [{}, {
          body: JSON.stringify(requestData),
        }]
      },
    },
  },
  detail: {
    url: 'api/v1/tickets/ticketId/',
    transformer: t.object,
    options: getOptions(),
    helpers: {
      get(ticketId) {
        return [{
          ticketId,
        }, {}]
      },
      patch(ticketId) {
        return [{
          ticketId,
        }, {}]
      },
      delete(ticketId) {
        return [{
          ticketId,
        }, {}]
      },
    },
  },
})
  .use('fetch', adapterFetch(fetch))
