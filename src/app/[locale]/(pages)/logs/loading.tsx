
export default function Loading() {

    return(
      <div className='flex md:ml-60 text-black dark:text-gray-300 bg-white dark:bg-[#292a2d] min-h-screen items-center justify-center' role='status'>

<svg className="w-5 h-5 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
    </div>
    )
  }