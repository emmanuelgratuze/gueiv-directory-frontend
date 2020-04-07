/* eslint-disable */

import controlComponent from './RelationControl'
import previewComponent from './RelationPreview'

const Widget = (opts = {}) => ({
  name: 'slug-relation',
  controlComponent,
  previewComponent,
  ...opts,
})

export const NetlifyCmsWidgetRelation = {
  Widget,
  controlComponent,
  previewComponent
}
export default NetlifyCmsWidgetRelation
