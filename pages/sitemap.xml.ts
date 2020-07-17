import { NextPage } from 'next'
import { getCollectionData } from 'cms/api'
import { Brand } from 'types/data/brand'

const SiteMap: NextPage = () => null

SiteMap.getInitialProps = async ({ res, req }) => {
  if (res && req) {
    const dataList = [
      { collection: 'brands', schema: ['brand'] },
      // { collection: 'criteria', schema: ['criterion'] },
      // { collection: 'genders', schema: ['gender'] },
      // { collection: 'configuration', schema: ['configuration'] },
      // { collection: 'countries', schema: ['country'] },
      // { collection: 'product-types', schema: ['productType'] }
    ]
    const dataPromises = dataList.map((datum) => getCollectionData<Brand>(datum.collection))
    const data = await Promise.all(dataPromises)
    const { host } = req.headers

    res.write(`<?xml version="1.0" encoding="UTF-8"?>
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
          </url>
        `)}
      </urlset>
    `)
    return res.end()
  }
  return null
}

export default SiteMap
