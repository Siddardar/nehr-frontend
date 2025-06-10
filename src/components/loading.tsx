import React from 'react';

const LoadingPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Simple spinner */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
        
        {/* Loading text */}
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Searching for patient...
        </h2>
        
        <p className="text-gray-500">
          Please wait while we locate the patient records
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;