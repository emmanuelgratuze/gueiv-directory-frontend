/* eslint-disable no-console */
import fs from 'fs'
import { getCollectionData } from '../cms/api'
import { Brand } from '../types/data/brand'

const writeSiteMap = async (): Promise<void> => {
  const dataList = [
    { collection: 'brands', schema: ['brand'] }
  ]
  const dataPromises = dataList.map((datum) => getCollectionData<Brand>(datum.collection))
  const data = await Promise.all(dataPromises)
  const host = process.env.HOST_NAME || 'directorio.gueiv.com'
  const xmlSiteMapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://${host}</loc>
        <priority>1</priority>
      </url>
      <url>
        <loc>https://${host}/criterios</loc>
        <priority>0.8</priority>
      </url>
      ${data[0].map((brand) => `
      <url>
        <loc>https://${host}/marcas/${brand.slug}</loc>
        <priority>0.5</priority>
      </url>`).join('')}
    </urlset>
  `

  function writeFile(content: string): void {
    fs.writeFile('./public/sitemap.xml', content, () => {
      console.log('Sitemap successfully created.')
    })
  }

  if (!fs.existsSync('./public')) {
    // eslint-disable-next-line prefer-numeric-literals
    fs.mkdirSync('./public', parseInt('0766', 8))
    writeFile(xmlSiteMapContent)
  } else {
    writeFile(xmlSiteMapContent)
  }
}

writeSiteMap()

export default {}
