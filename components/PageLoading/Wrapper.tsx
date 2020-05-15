import { motion } from 'framer-motion'
import React from 'react'
import { Stack } from 'grommet'

import useLoading from 'hooks/generic/useRouteLoading'
import LoadingScreen from './Screen'

const LoadingWrapper: React.FC = ({ children }) => {
  const { isLoading, currentPage } = useLoading()
  return (
    <Stack fill>
      <motion.div
        initial={{ transform: 'translate3d(0, 0, 0)', opacity: 0 }}
        animate={{ transform: 'translate3d(0, 0, 0)', opacity: isLoading ? 0 : 1 }}
        exit={{ transform: 'translate3d(0, 0, 0)', opacity: 0 }}
        style={{
          position: 'relative',
          zIndex: 2
        }}
      >
        {children}
      </motion.div>

      {isLoading && (
        <LoadingScreen
          currentPage={currentPage}
          isLoading={isLoading}
        />
      )}
    </Stack>
  )
}

export default LoadingWrapper
