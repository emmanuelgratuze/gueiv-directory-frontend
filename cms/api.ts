/* eslint-disable @typescript-eslint/camelcase */
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { Criterion } from 'types/data/criterion'
import fetchFileContent from 'utils/fetchFileContent'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY
})
const contentsPath = `${process.env.PWD}/contents`

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

export async function getSingleCollectionData<T extends object>(collectionName: string): Promise<T> {
  const data = await getCollectionData<T>(collectionName)
  return data[0]
}

// Adapted for pages
export async function getPageCollectionData(collectionName: string): Promise<object[]> {
  if (collectionName === 'criteria') {
    return getCollectionData('criteria', async (criterion: Criterion) => {
      const newCriterion = criterion
      if (criterion.icon) {
        const fullUrl = criterion.icon.includes('://')
          ? criterion.icon
          : cloudinary.url(criterion.icon.split('/')[1])
        newCriterion.iconContent = await fetchFileContent(fullUrl, true)
      }
      return newCriterion
    })
  }
  return getCollectionData(collectionName)
}

export async function getPageCollectionDatas(collections: string[] = []): Promise<object[]> {
  const promises = collections.map((collectionName) => (
    getPageCollectionData(collectionName)
  ))
  return Promise.all(promises)
}

export default {}
