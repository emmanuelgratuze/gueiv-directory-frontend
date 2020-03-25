import PropTypes from 'prop-types'

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type InferPropTypes<
  PropTypes,
  DefaultProps = {},
  Props = PropTypes.InferProps<PropTypes>
> = {
  [Key in keyof Props]: Key extends keyof DefaultProps
    ? Props[Key] | DefaultProps[Key]
    : Props[Key]
}

export type ValueOf<T> = T[keyof T]
