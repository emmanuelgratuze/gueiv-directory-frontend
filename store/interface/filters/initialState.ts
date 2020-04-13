import { List, fromJS } from 'immutable'

export const availableFilters = List([
  fromJS({
    id: 'criteria',
    brandProperty: 'criteria',
    dataEntity: 'criteria',
    label: 'Criterio'
  }),
  fromJS({
    id: 'genders',
    brandProperty: 'genders',
    dataEntity: 'genders',
    label: 'Género'
  }),
  fromJS({
    id: 'country',
    brandProperty: 'country',
    dataEntity: 'countries',
    label: 'País'
  }),
  fromJS({
    id: 'productTypes',
    brandProperty: 'productTypes',
    dataEntity: 'productTypes',
    label: 'Product'
  })
])

export default {}
