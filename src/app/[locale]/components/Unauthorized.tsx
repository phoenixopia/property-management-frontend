import React from 'react';
import Link from 'next/link';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-3xl font-bold text-red-900 dark:text-white mb-4">
        Unauthorized Access
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mb-6">
        You do not have permission to view this page.
      </p>
 
    </div>
  );
};

export default Unauthorized;
