import React from 'react'
import Link from 'next/link'

const Unauthorized = () => {
  return (
    <div className="text-center">
    <h2 className="text-3xl font-bold text-red-900 dark:text-white mb-4">
      Please Login
    </h2>
    <p className="text-gray-700 dark:text-gray-400 mb-6">
      You need to be logged in to access.
    </p>
    <Link
      href="/"
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
    >
      Go to Login Page
    </Link>
  </div>
  )
}

export default Unauthorized