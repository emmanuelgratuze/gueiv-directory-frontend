import fs from 'fs'
import { kebabCase } from 'lodash'

const contentsPath = `${process.env.PWD}/cms/contents`

export async function getCollectionData<T extends unknown>(collectionName: string): Promise<T[]> {
  const filesPromises = fs.readdirSync(`${contentsPath}/${collectionName}`).map((filePath) => (
    new Promise<T>((resolve, reject) => {
      fs.readFile(`${contentsPath}/${collectionName}/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          const parsedData = JSON.parse(data)
          const id = parsedData.id || filePath.split('.')[0]
          resolve({
            ...parsedData,
            // if no id field, we use the content file name as id
            id,
            // Slug generation based on name property if exists
            slug: parsedData.name ? kebabCase(parsedData.name) : id
          })
        }
      })
    })
  ))
  return Promise.all(filesPromises)
}

export async function getSingleCollectionData<T extends unknown>(collectionName: string): Promise<T> {
  const data = await getCollectionData<T>(collectionName)
  return data[0]
}


// export const getCriteria = () => {
//   return criteria
// }

// export const getCountries = () => {
//   return countries
// }

// export const getProductTypes = () => {
//   return productTypes
// }

export default {}
