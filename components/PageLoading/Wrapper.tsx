import React from 'react'
import { Stack } from 'grommet'

import useLoading from 'hooks/generic/useRouteLoading'
import useBrowser from 'hooks/generic/useBrowser'

import LoadingScreen from './Screen'

const LoadingWrapper: React.FC = ({ children }) => {
  const { isLoading, currentPage } = useLoading()
  const { isServerSide } = useBrowser()
  return (
    <Stack>
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
