import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

import useLoading from 'hooks/generic/useRouteLoading'
import LoadingScreen from './Screen'

const LoadingWrapper: React.FC = ({ children }) => {
  const { isLoading, currentPage } = useLoading()
  return (
    <div>
      <AnimatePresence>
        {!isLoading && (
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
        )}
      </AnimatePresence>

      {isLoading && (
        <LoadingScreen
          currentPage={currentPage}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default LoadingWrapper
