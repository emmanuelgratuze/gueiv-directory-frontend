import React from 'react'
import A from 'components/A'

type StandardLinkProps = {
  href?: string;
  external?: boolean;
}

const StandardLink: React.FC<StandardLinkProps> = ({
  href,
  external = false,
  children,
  ...props
}) => (
  <A
    href={href || ''}
    target={external ? '_blank' : undefined}
    {...props}
    rel={external ? 'noopener noreferrer' : undefined}
    style={{ textDecoration: 'none' }}
  >
    {children}
  </A>
)

export default StandardLink
