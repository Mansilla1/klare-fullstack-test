import reduxApi, { transformers as t } from 'redux-api'

import adapterFetch from '/spa/src/api/adapters/fetch'
import { getOptions } from '/spa/src/utils/utils'

export default reduxApi({
  status: {
    url: 'api/v1/status/',
    transformer: t.object,
    options: getOptions('GET'),
  },
})
  .use('fetch', adapterFetch(fetch))
