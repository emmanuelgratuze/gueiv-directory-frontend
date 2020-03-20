declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

type InferPropTypes<
  PropTypes,
  DefaultProps = {},
  Props = PropTypes.InferProps<PropTypes>
> = {
  [Key in keyof Props]: Key extends keyof DefaultProps
    ? Props[Key] | DefaultProps[Key]
    : Props[Key]
}

export interface ProcessEnv {
  APP_CONFIG: string;
  APP_ENV: 'development' | 'staging' | 'test' | 'production';
}
