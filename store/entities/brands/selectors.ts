import { RootStateOrAny } from 'react-redux'
import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import { Record, List } from 'immutable'

import { brand as brandSchema } from '~/store/schemas'
import { ImmutableBrand } from './types'

export const selectBrandsTree = (state: RootStateOrAny): List<ImmutableBrand> => state.get('brands')

export const selectBrands = createSelector(
  // TODO: select depending on the schema
  selectBrandsTree,
  (state) => state,
  (brands, state) => {
    const res = state.get('brands')
      .filter((brand: ImmutableBrand) => !!brand.get('name'))
      .map((brand: ImmutableBrand) => {
        return denormalize(brand, brandSchema, state)
      })
      .toIndexedSeq()

    console.log(res.toJS())

    return res
    // return List([])
  }
)

// export const selectBrand = (state: RootStateOrAny): List<ImmutableBrand> => (
//   state.get('brands')
//     // Don't display brands without name
//     .find((brand: ImmutableBrand) => !!brand.get('name'))
//     .toIndexedSeq()
// )

// export const selectAlbum = createSelector(
//   selectAlbums,
//   selectStatePortionInSchemas([albumSchema]),
//   (albums, state) => memoize(
//     id => {
//       const normalizedAlbum = albums.get(`${id}`)
//       return normalizedAlbum
//         ? denormalize(normalizedAlbum, albumSchema, state)
//         : undefined
//     }
//   )
// )

// export const selectArtistAlbums = createSelector(
//   selectAlbums,
//   selectStatePortionInSchemas([albumSchema]),
//   (albums, state) => memoize(
//     (artistId, { onlyPublic = false } = {}) => (
//       albums
//         .filter((album) => (
//           album.get && [album.get('artistId'), album.get('artist')].includes(Number(artistId))
//         ))
//         .filter((album) => {
//           if (onlyPublic) {
//             return typeof album.get('visible') === 'undefined' || album.get('visible') === true
//           }
//           return true
//         })
//         .map((album) => (
//           denormalize(album, albumSchema, state)
//         ))
//         .toIndexedSeq()
//     ), (artistId, { onlyPublic = false }) => (
//       `${artistId}|${onlyPublic ? 'public' : ''}`
//     )
//   )
// )

// export const selectArtistLatestAlbum = createSelector(
//   selectAlbums,
//   (albums) => memoize(
//     (artistId) => {
//       let latestAlbum
//       let latestAlbumDate
//       albums
//         .filter((album) => (
//           parseInt(album.get('artistId'), 10) === parseInt(artistId, 10)
//         ))
//         .forEach((album) => {
//           latestAlbumDate = latestAlbum ? new Date(latestAlbum.get('releaseDate')) : 0
//           const albumDate = new Date(album.get('releaseDate'))
//           if (!album || albumDate > latestAlbumDate) {
//             latestAlbum = album
//           }
//         })
//       return latestAlbum
//     }
//   )
// )

// export const selectJustCreatedAlbum = createSelector(
//   selectAlbums,
//   (albums) => albums.find((album) => album.get('justCreated'))
// )

// export default {
//   album: selectAlbum
// }

export default {}
