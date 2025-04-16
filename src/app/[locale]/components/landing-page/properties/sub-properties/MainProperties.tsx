"use client"
import { formatDistanceToNow, parseISO } from 'date-fns';
import React, { useState, useCallback } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 


import { activateUser, getAllUsers, deactivateUser, exportAllUsers } from '@/actions/userManagmentAction';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';

import { withAuth } from '@/hooks/withAuth';
import { getAllNotifications, readNotifications } from '@/actions/notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faHouse, faPen, faTrash, faEye, faMagnifyingGlass, faBan, faLockOpen,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import ListProperties from './ListProperties';


const MainProperties = () => {
       const t = useTranslations("full");
     
  return (
    <section className="relative">
  


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 space-y-4">

          <div className='flex justify-end flex-row gap-2'>   
            
               <Link href="/" className='text-sm text-cyan-950'>
                <FontAwesomeIcon icon={faHouse} className=' text-sm cursor-pointer' /> {t('home')}
               </Link>

               <p className='text-sm text-gray-700'>{'>'}</p>

               <p className='text-sm text-gray-700'>
                  {t('properties')}
               </p>
          </div>
          <div className='capitalize text-gray-700 bg-gray-200 p-4 font-bold' >
            <p >{t("available properties")}</p>
          </div>
        <hr className="h-px  bg-gray-200 border-0 dark:bg-gray-700" />

{/*           
          <p className='text text-sm text-black'>Browse a wide selection of flats, condominiums, and apartments for rent in Addis Ababa and beyond. Whether you're looking for a cozy studio or a spacious family unit, our nationwide listings connect you with trusted real estate agents dedicated to finding your ideal rental. Start your search today!</p> */}

          </div>
          {/* mainList */}
          <ListProperties/>
    
     

     
      </div>


    </section>
  )
}

export default MainProperties