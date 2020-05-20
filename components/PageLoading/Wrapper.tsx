import React from 'react'

import useLoading from 'hooks/generic/useRouteLoading'
import LoadingScreen from './Screen'

const LoadingWrapper: React.FC = ({ children }) => {
  const { isLoading, currentPage } = useLoading()
  return (
    <div>
      <LoadingScreen
        currentPage={currentPage}
        isLoading={isLoading}
      />
      {children}
    </div>
  )
}

export default LoadingWrapper
