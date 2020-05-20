import React from 'react'

type Props = {
  symbol: string;
  label?: string;
}

const Emoji: React.FC<Props> = ({
  label = '',
  symbol
}) => (
  <span
    className="emoji"
    role="img"
    aria-label={label}
    aria-hidden={label ? 'false' : 'true'}
  >
    {symbol}
  </span>
)

export default Emoji
