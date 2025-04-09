import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-end items-center gap-2'>
        <p>
       Copyright © {new Date().getFullYear()} pms
         
        </p> <p>|</p>

        <p>Powered by phoenixopia</p>
    </div>
  )
}

export default Footer