"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter(); 
  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        
        {/* Main message */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        {/* Back button */}
        <button 
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;