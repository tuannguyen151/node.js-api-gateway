import * as fs from 'fs'

async function getMicroservices() {
  const folderPath = new URL('./', import.meta.url)
  const files = fs.readdirSync(folderPath)

  const microservicesPromises = files
    .filter(
      (fileName) => fileName !== 'index' && fileName.includes('.microservice')
    )
    .map(async (fileName) => {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      const { default: microservice } = await import(
        new URL(fileName, folderPath)
      )
      return microservice
    })

  const microservices = await Promise.all(microservicesPromises)
  return microservices
}

const MICROSERVICES = await getMicroservices()

export default MICROSERVICES
