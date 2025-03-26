"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./theme/theme-toggle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faHouse,faUser,faBell,faCircleUser, faRightFromBracket,faUsersGear } from '@fortawesome/free-solid-svg-icons'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

const SideBar = () => {
  const locale = useLocale();  
  const t = useTranslations('Dashboard'); 
  const t2 = useTranslations('full'); 


  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); 

  const validRoutes = [
    `/${locale}/dashboard`,
    `/${locale}/user-managment`,
    `/${locale}/settings`,
    `/${locale}/role-managment`,

  ];

  if ( !validRoutes.includes(pathname)) return null;
 
  

  const getLinkClasses = (path: string) =>

    
    `${
      pathname === `/${locale}${path}`
        ? "flex items-center  w-full hover:ml-2 p-2 rounded-l-lg text-white  bg-gray-900 dark:bg-gray-700 group w-full group ml-2"
        : "flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 w-full hover:ml-2  p-2 rounded-l-lg text-black dark:text-white  group"
    }`;

    
  const getLinkClassesIcon = (path: string) =>{
 
   return `${
      pathname === `/${locale}${path}`
        ? "w-5 h-5 text-black dark:text-white "
        : "w-5 h-5 text-black dark:text-white"
    }`};

  return (
    <div>
   
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute items-center p-2 mt-2  text-sm z-40 text-black dark:text-gray-100  rounded-lg  md:hidden "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-80 w-64 h-screen transition-transform bg-gray-100  dark:bg-[#212327] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* <ThemeToggle/> */}


      

        <div className="flex flex-col items-center gap-2 py-6 ">

        <div className="flex w-full justify-end">
        <FontAwesomeIcon icon={faBell} className='text-black w-16 dark:text-white text-2xl'/>

        </div>
        <div className="flex w-full mx-4 cursor-pointer">
          <div className="flex flex-col justify-between items-center px-7 border-1 w-full border-gray-50 shadow-2xs bg-white dark:bg-gray-600 dark:border-gray-800 py-2  gap-2 ">
          <div>
          <FontAwesomeIcon icon={faCircleUser} className="flex flex-row  text-3xl dark:text-gray-400 text-gray-600"/>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-black dark:text-white font-bold dar">AdminName</span>
            <span className="text-gray-400 dark:text-white text-[0.68rem]">AdminName@gmail.com</span>
          </div>
          </div>
        </div>
          


        </div>

  
        <hr className="h-px mt-4  bg-gray-200 border-0 dark:bg-gray-700"/>

        
        
        <div className="h-full pl-3 py-4 overflow-y-auto">



          <ul className="space-y-2 font-medium text-sm">
            
            <li>
            
              <Link  href="/dashboard" className=" flex items-center w-full ">
              <FontAwesomeIcon icon={faHouse} className={getLinkClassesIcon("/dashboard")}/>
          
              
          
              <div
               
                className={`${getLinkClasses("/dashboard")} `}
              >
                <span className="ms-3">{t('dashboardTitle')}</span>
                </div>
              </Link>
              
            </li>


            <li>
            
            <Link  href="/user-managment" className=" flex items-center w-full ">
            <FontAwesomeIcon icon={faUser}
                  className={getLinkClassesIcon("/user-managment")}

               />
            
        
            <div
             
              className={`${getLinkClasses("/user-managment")} `}
            >
              
              <span className="ms-3">{t('user-managment')}</span>
              </div>
            </Link>
            
          </li>


          <li>
            
            <Link  href="/role-managment" className=" flex items-center w-full ">
            <FontAwesomeIcon icon={faUsersGear}
                  className={getLinkClassesIcon("/role-managment")}

               />
            
        
            <div
             
              className={`${getLinkClasses("/role-managment")} `}
            >
              
              <span className="ms-3">{t2('role-managment')}</span>
              </div>
            </Link>
            
          </li>


          <li>
            
            <Link  href="/settings" className=" flex items-center w-full ">
            <FontAwesomeIcon icon={faGear}
                  className={getLinkClassesIcon("/settings")}

               />
            
        
            <div
              className={`${getLinkClasses("/settings")} `}
            >
              
             
              <span className="ms-3">{t('setting')}</span>

              </div>
            </Link>
            
          </li>




          <li className="w-full">
        
        <div className=" flex items-center w-full cursor-pointer ">
        
               
        <FontAwesomeIcon icon={faRightFromBracket}
             className="w-5 h-5 text-black dark:text-white "

               />
               <div className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 w-full hover:ml-2  p-2 rounded-l-lg text-black dark:text-white  group" >
                         <span className="ms-3">
                {t('sign-out')}
                </span>

               </div>
     

            
              </div>
            
          </li>

       
          
          </ul>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0  bg-opacity-50 md:hidden"
        />
      )}
    </div>
  );
};

export default SideBar;
