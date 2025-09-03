const LoadingSpinner = ({ size = 'sm' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4'
      case 'md':
        return 'w-6 h-6'
      case 'lg':
        return 'w-8 h-8'
      default:
        return 'w-4 h-4'
    }
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${getSizeClasses()}`}></div>
  )
}

export default LoadingSpinner
