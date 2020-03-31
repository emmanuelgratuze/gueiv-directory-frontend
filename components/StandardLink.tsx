import React from 'react'

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
  <a
    href={href || ''}
    target={external ? '_blank' : undefined}
    {...props}
    rel={external ? 'noopener noreferrer' : undefined}
    style={{ textDecoration: 'none' }}
  >
    {children}
  </a>
)

export default StandardLink
