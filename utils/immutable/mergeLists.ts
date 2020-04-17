import { List } from 'immutable'

function mergeList(leftList: List<unknown>, rightList: List<unknown>): List<unknown> {
  const union: { [key: number]: unknown } = {}

  leftList.forEach((x) => {
    if (typeof x === 'number') {
      union[x] = undefined
    }
  })

  rightList.forEach((x) => {
    if (typeof x === 'number') {
      union[x] = undefined
    }
  })

  return List(Object.keys(union).map((i) => (
    parseInt(i, 10)
  )))
}

export default mergeList
