import React from 'react'

const LoadingIcon = ({color="violet-500",width=8,height=8}) => {
  return (
    <div className={`w-${width} h-${height} border-${color} border-b-transparent border-2 animate-spin rounded-full`}>
      
    </div>
  )
}

export default LoadingIcon
