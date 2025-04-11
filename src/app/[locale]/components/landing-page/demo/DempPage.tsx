"use client"
import React,{useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocale } from "next-intl";  
import { faUser, faBars, faTimes, faVial,faBullhorn } from '@fortawesome/free-solid-svg-icons';

const DemoPage = () => {
  const [openDemoPage,setOpenDemoPage]=useState(false);
  const [openAccount,setOpenAccount]=useState(false);
  const openDemo =()=>{
         setOpenDemoPage(true);
  }
  return (
    <div className="flex">
       <div className='flex flex-col gap-2 animate-bounce  cursor-pointer justify-center items-center' onClick={()=>openDemo()}>
           <p className='flex  size-12 bg-gray-600 items-center  justify-center text-center rounded-full'>        
             <FontAwesomeIcon icon={faBullhorn} className='text-white w-4 text-2xl'/>
           </p>

           <p className='px-2 py-1 rounded-sm truncate bg-gray-600 text-white'>Free Trial</p>
       </div>

       {openDemoPage && 
           <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
           <div className='relative  bg-gradient-to-r from-[#dff6fe] to-[#c4dde5]  dark:bg-gray-700 max-h-[80%] overflow-y-auto shadow-xl p-3 rounded-lg w-full max-w-xl'>
               <div className="flex items-center justify-between dark:border-gray-600 border-gray-200">
                
                   <button onClick={()=>setOpenDemoPage(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                           <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                       </svg>
                       <span className="sr-only">Close modal</span>
                   </button>
               </div>
               <div className='flex flex-row'>
                      <div>
                        <img
                        src="/pms_logo.png"
                        alt="Profile"
                        className="xl:w-50 xl:h-50 w-30 h-30 rounded-full object-cover"
                    />
                    </div>

                    <div className='flex flex-col text-start w-full justify-evenly px-4  '>
                        <div>
                                <p className='text-xl font-bold  text-[#104277] '>Modernize Property Management. Maximize Returns.</p>
                                <p className='text-md font-bold text-black '>የንብርት አስተዳደርን ዘመናዊን በማረግበማረግ። ተመላሾትን ከፍ ይድርጉ።</p>
                        </div>

                        <div className='flex flex-row gap-2 items-center'>
                             
                                <p className='text-md font-bold text-[#104277] '>www.astedaderpms.com</p>
                                <span onClick={()=>setOpenAccount(true)} className='bg-[#104275] cursor-pointer px-3 py-1 rounded-sm text-white'>
                                    
                                    <p>Start Free Trial </p> 
                                   <p className='text-xs text-center'>ነጻ ሙከራ ይጀምሩ</p> 
                            </span>
                        </div>

                        {
                            openAccount&&( <div className='fixed flex-col inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
                                <div className='bg-black/70 p-8 rounded-xl'>
                                <div className='flex justify-end'>
                                    <button onClick={()=>setOpenAccount(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                      </button>
                                </div>
                          <div className='flex flex-col gap-2'>
                               <div className='flex flex-col text-white bg-gray-800 p-2 rounded-sm'>
                                         <p>AdminEmail:- danit.yohannes@gmail.com</p>
                                        <p>AdminPassword:- 12345</p>
                                    </div>

                                    <div className='flex flex-col bg-gray-800 p-2 rounded-sm'>

                                    <p>MaintenanceEmail:- kebe@gmail.com</p>
                                    <p>AdminPassword:- 123456</p>
                                </div>
                            </div>
                                    
                              
                      
                               
                                </div>
                                </div>
                             )
                        }

                     </div>
                </div>

               </div>

              


        
        </div>}
    
      
      
    </div>
  );
};

export default DemoPage;