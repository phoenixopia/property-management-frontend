import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='flex w-full justify-normal md:justify-between flex-col md:flex-row  items-center gap-2'>
      <div className='flex items-center px-16 text-xs'>
        <Link href="/" className='cursor-pointer'>
        <img   
                src="/pms_logo.png"
                alt="Profile"
                className="xl:w-12  xl:h-12 w-10 h-10 rounded-full object-cover"
              />
        </Link>
        

           <div className='flex pl-12 space-x-4'>
            <Link href="/" className='cursor-pointer'>Home</Link>
            <p>|</p>
            {/* <Link href="/about-us">About Us</Link>
            <p>|</p> */}
            <Link href="contact-us">Contact Us</Link>
           </div>
      </div>
      <div className='flex items-center gap-2'>
      <p>
       Copyright © {new Date().getFullYear()} pms
         
        </p> <p>|</p>

        <p>Powered by phoenixopia</p>
      </div>
       
    </div>
  )
}

export default Footer