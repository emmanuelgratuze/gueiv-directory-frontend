import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

import useLoading from 'hooks/generic/useRouteLoading'
import LoadingScreen from './Screen'

const LoadingWrapper: React.FC = ({ children }) => {
  const { isLoading, currentPage } = useLoading()
  return (
    <div>
      {children}

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
