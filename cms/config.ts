import rawConfig from './rawConfig.json'

// const collections = rawConfig.collections as (typeof rawConfig['collections'])
export type CMSConfig = typeof rawConfig

export const cms = {
  collectionNames: rawConfig.collections.map(collection => collection.name)
}

export default rawConfig
