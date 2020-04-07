import fs from 'fs'

const contentsPath = `${process.env.PWD}/cms/contents`

export async function getCollectionData<T extends object>(
  collectionName: string,
  filter: (arg1: T) => T | Promise<T> = (data) => data
): Promise<T[]> {
  const filesPromises = fs.readdirSync(`${contentsPath}/${collectionName}`).map((filePath) => (
    new Promise<T>((resolve, reject) => {
      const handleData = async (data: string): Promise<void> => {
        const parsedData = JSON.parse(data)
        const id = parsedData.id || filePath.split('.')[0]
        const filteredData = await filter(parsedData)
        resolve({
          ...filteredData,
          // if no id field, we use the content file name as id
          id,
          // Slug generation based on name property if exists
          slug: id
        })
      }
      fs.readFile(`${contentsPath}/${collectionName}/${filePath}`, 'utf8', (err, data) => {
        if (err) {
          reject(err)
        } else {
          handleData(data)
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
