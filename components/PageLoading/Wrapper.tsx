import React from 'react'
import { Stack, StackProps } from 'grommet'

import useLoading from 'hooks/generic/useRouteLoading'
import useBrowser from 'hooks/generic/useBrowser'

import LoadingScreen from './Screen'

const LoadingWrapper: React.FC<StackProps> = ({ children, ...props }) => {
  const { isLoading, currentPage } = useLoading()
  const { isServerSide } = useBrowser()
  return (
    <Stack
      {...props}
    >
      {/* No loading on server side */}
      {!isServerSide && (
        <LoadingScreen
          currentPage={currentPage}
          isLoading={isLoading}
        />
      )}
      {children}
    </Stack>
  )
}

export default LoadingWrapper
