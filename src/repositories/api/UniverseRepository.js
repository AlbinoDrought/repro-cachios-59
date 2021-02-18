import cachiosInstance from 'cachios' // CHANGE: no `import * as`
import LRU from 'lru-cache'

import { api } from './apiClient.js'
import { readCache, writeCache } from './cacheHelper.js'

import config from '../../config.js'

const version = config.api.version
const datasource = config.api.datasource

const cachios = cachiosInstance.create(api)

class UniverseRepository {

  async initCache () {

    const cacheMaxAmount = 5000
    const cacheMaxAge = 604800000 // 7 days

    cachios.cache = new LRU({ max: cacheMaxAmount
      , length: function (n, key) { return n * 2 + key.length }
      , dispose: function (key, n) { n.close() }
      , maxAge: cacheMaxAge })

    await readCache(cachios.cache)

    console.log('UniverseRepository Cache contains', cachios.cache.itemCount, 'items on disk')
  }

  async getTypeNameById (id) {

    try {

      const response = await cachios.get(`${version}/universe/types/${id}`, {
        params: {
          datasource: datasource
        }
      })

      await writeCache(cachios.cache)

      return response

    } catch (e) {
      throw new Error(e)
    }
  }

}

export {
  UniverseRepository
}
