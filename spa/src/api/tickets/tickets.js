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
    url: 'api/v1/tickets/:ticketId/',
    transformer: t.object,
    options: getOptions('GET'),
    helpers: {
      get(ticketId) {
        return [{
          ticketId,
        }, {}]
      },
    },
  },
  patch: {
    url: 'api/v1/tickets/:ticketId/',
    transformer: t.object,
    options: getOptions('PATCH'),
    helpers: {
      patch(ticketId, payload) {
        return [{
          ticketId,
        }, {
          body: JSON.stringify(payload),
        }]
      },
      delete(ticketId) {
        return [{
          ticketId,
        }, {}]
      },
    },
  },
  remove: {
    url: 'api/v1/tickets/:ticketId/',
    transformer: t.object,
    options: getOptions('DELETE'),
    helpers: {
      delete(ticketId) {
        return [{
          ticketId,
        }, {}]
      },
    }
  }
})
  .use('fetch', adapterFetch(fetch))
