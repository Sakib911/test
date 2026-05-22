import React from 'react'

interface FullContainerProps {
  children: React.ReactNode
  className?: string
}

const FullContainer = ({ children, className }: FullContainerProps) => {
  return <div className={`w-full ${className || ''}`}>{children}</div>
}

export default FullContainer
