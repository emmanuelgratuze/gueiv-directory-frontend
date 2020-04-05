import fs from 'fs'
// import { Brand } from 'types/data/brand'

const contentsPath = `${process.env.PWD}/cms/contents`

export async function getCollectionData(collectionName: string): Promise<unknown[]> {
  const filesPromises = fs.readdirSync(`${contentsPath}/${collectionName}`).map((filePath) => (
    new Promise((resolve, reject) => {
      fs.readFile(`${contentsPath}/${collectionName}/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(data))
        }
      })
    })
  ))

  const data = await Promise.all(filesPromises)
  return data
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
