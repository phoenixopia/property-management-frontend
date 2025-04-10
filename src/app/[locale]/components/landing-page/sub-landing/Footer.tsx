import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex w-full justify-normal md:justify-between flex-col md:flex-row  items-center gap-2'>
      <div className='flex px-16 text-xs'>
           <p>Logo</p>

           <div className='flex pl-12 space-x-4'>
            <Link href="/" className='cursor-pointer'>Home</Link>
            <p>|</p>
            {/* <Link href="/about-us">About Us</Link>
            <p>|</p> */}
            <Link href="contact-us">Contact Us</Link>
           </div>
      </div>
      <div className='flex items-center'>
      <p>
       Copyright © {new Date().getFullYear()} pms
         
        </p> <p>|</p>

        <p>Powered by phoenixopia</p>
      </div>
       
    </div>
  )
}

export default Footer