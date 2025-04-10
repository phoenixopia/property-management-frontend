import React from 'react'
import Link from 'next/link';

const ContactFast = () => {
  return (
    <div className='flex w-full justify-normal md:justify-between flex-col md:flex-row  items-center gap-2'>
      <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row px-16 py-4 text-xs'>
             <p className='text-[#285e67] text-sm font-bold'>Interested in working with Us?</p>

           <div className='flex flex-col pl-12 space-x-4 '>
            <p className='text-[#333535] text-sm font-bold'>+251939000000</p>
            <p className='text-[#333535] text-sm font-bold'>marketing@phoenixopia.com</p>
           </div>
      </div>
  
    </div>
  )
}

export default ContactFast