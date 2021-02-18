import { UniverseRepository } from './repositories/api/UniverseRepository.js'

// 47908999999 is invalid
const itemIds = [ 17482, 20189, 47908999999, 20185, 28754 ]

const universeApi = new UniverseRepository()

async function main () {

  try {

    const res = await getAllTypeNamesById(itemIds)
    
  } catch (error) {
    console.error(error)
  }
}

async function getAllTypeNamesById (typeIds) {

  let items = new Set()
  let failedLookups = []

  await universeApi.initCache()

  for (let i = 0; i < typeIds.length; i++) {

    try {

        const { data } = await universeApi.getTypeNameById(typeIds[i])

        if (!data) {
          throw new Error('getAllTypeNamesById: Unable to retrieve name from API for type_id ' + typeIds[i])
        }

        items.add({
          type_id: typeIds[i],
          name: data.name
        })
      
    } catch (error) {
      
      console.log('getAllTypeNamesById Error:', error.message)

      failedLookups.push({
        type_id: typeIds[i],
        error_message: error.message
      })

    }
  }

  console.log('getAllTypeNamesById finished looking up ' + typeIds.length + ' items')

  if (failedLookups.length > 0) {
    console.log('getAllTypeNamesById failed on ' + failedLookups.length + ' items')
    console.log(failedLookups)
  }

  return [...items]
}

main()
