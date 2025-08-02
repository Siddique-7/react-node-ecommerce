const Loader = ({ size = 'medium', fullScreen = false }) => {
  const sizeClass = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const LoaderSpinner = () => (
    <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 ${sizeClass[size]}`}></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <LoaderSpinner />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <LoaderSpinner />
    </div>
  );
}

export default Loader;
