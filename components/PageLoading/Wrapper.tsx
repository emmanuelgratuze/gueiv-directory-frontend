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
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'relative',
          zIndex: 2
        }}
      >
        {children}
      </motion.div>

      <LoadingScreen
        currentPage={currentPage}
        isLoading={isLoading}
      />
    </Stack>
  )
}

export default LoadingWrapper
