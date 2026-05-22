const GlobalLoading = () => {
  return (
    <div>
      {' '}
      <div className='min-h-screen bg-gray-50 p-8 lg:px-[calc(100vh-90vh)]'>
        <div className='flex h-64 items-center justify-center'>
          <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600'></div>
        </div>
      </div>
    </div>
  )
}

export default GlobalLoading
