import React from 'react'
import Link from 'next/link';
import { useTranslations } from "next-intl";

const ContactFast = () => {
      const t = useTranslations("full");
  
  return (
    <div className='flex w-full justify-normal md:justify-between flex-col md:flex-row  items-center gap-2'>
      <div className='flex flex-col items-center justify-center space-y-4 sm:flex-row px-16 py-4 text-xs'>
             <p className='text-[#285e67] text-sm font-bold'>{t("Interested in working with Us")}?</p>

           <div className='flex flex-col pl-12 space-x-4 '>
            <p className='text-[#333535] text-sm font-bold'>+251968999900</p>
            <p className='text-[#333535] text-sm font-bold'>+251968999955</p>
            <p className='text-[#333535] text-sm font-bold'>info@phoenixopia.com</p>
           </div>
      </div>
  
    </div>
  )
}

export default ContactFast