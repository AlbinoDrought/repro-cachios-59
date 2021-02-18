import fs from 'fs'

const cacheFileName = 'cache.json'

const resetCache = () => new Promise((resolve, reject) => {
  const data = JSON.stringify({})
  fs.writeFile(cacheFileName, data, null, (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

const readCache = (lruCache) => new Promise((resolve, reject) => {

  if (!fs.existsSync(cacheFileName)) {
    console.log('cacheHelper: Cache file does not exist, creating it at ' + cacheFileName)
    resetCache()
  }

  fs.readFile(cacheFileName, 'utf8', (err, data) => {
    if (err) {
      return reject(err)
    }

    try {
      const parsedCache = JSON.parse(data)
      lruCache.load(parsedCache)
      return resolve()
    } catch (ex) {
      return reject(ex)
    }
  })
})

const writeCache = (lruCache) => new Promise((resolve, reject) => {
  const data = JSON.stringify(lruCache.dump(), null, 2) // CHANGE: beautified JSON
  fs.writeFile(cacheFileName, data, null, (err) => {
    if (err) {
      reject(err)
    } else {
      resolve()
    }
  })
})

export {
  resetCache,
  readCache,
  writeCache
}
