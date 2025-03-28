"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileExport, faPen, faTrash, faEye,faMagnifyingGlass,faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import propertyData from '../../../../../propertyData.json';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
const PropertyDetail = () => {
          const locale = useLocale();  
          const t = useTranslations('full'); 
  return (
    <div className='flex flex-col w-full'>

    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 dark:text-white text-sm p-6'>
          <div>
            <span>{t("name")}: Kebede Tola</span>
            </div> 
            <div>
            <span>{t("phone-number")}: +251939582545</span>
            </div>
            <div>
            <span>{t("email")}: tenant@gmail.com</span>
            </div>
            <div>
            <span>{t("property-name")}: Penthouse A </span>
            </div> 
            <div>
            <span>{t("city")}: Addis Ababa</span>
            </div>  
            <div>
            <span>{t("price")}: 45000</span>
            </div>  
            <div>
            <span>{t("zip-code")}: 1000</span>
            </div>  
      </div>

  </div>
  )
}

export default PropertyDetail