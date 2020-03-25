declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
export interface ProcessEnv {
  APP_CONFIG: string;
  APP_ENV: 'development' | 'staging' | 'test' | 'production';
}
