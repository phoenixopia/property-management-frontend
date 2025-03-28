import React from 'react'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
const AddPropertyForm = () => {

   const t=useTranslations("full")

  return (
   <div>
    <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                 


                <div className="col-span-2">
                       <select
                            
                                className="flex p-3 text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-600 border-gray-300 rounded-lg w-full"
                               
                            >
                                <option className='text-gray-600 dark:text-white ' value="">{t("select-owner")}</option>
                             
                                <option className='text-gray-600 dark:text-white '>
                                   Kebede
                                </option>
                                <option className='text-gray-600 dark:text-white '>
                                   Tegitu
                                </option>
                               
                            </select>
             
                     </div>
                     <div className="col-span-2">
                       <select
                            
                                className="flex p-3 text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-600 border-gray-300 rounded-lg w-full"
                               
                            >
                                <option className='text-gray-600 dark:text-white ' value="">{t("select-manager")}</option>
                             
                                <option className='text-gray-600 dark:text-white '>
                                   ayele
                                </option>
                                <option className='text-gray-600 dark:text-white '>
                                   tigistu
                                </option>
                               
                            </select>
             
                     </div>

                    <div className="col-span-2">
                       <input type="text" name="name" id="name" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Property Name" />
                    </div>
                    <div className="col-span-2">
                       <input type="text" name="name" id="name" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter City" />
                    </div>

                    <div className="col-span-2">
                       <input type="text" name="name" id="name" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Address" />
                    </div>
                    
                    <div className="col-span-2">
                       <input type="text" name="name" id="name" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter Zip_Code" />
                    </div>

                    <div className="col-span-2">
                       <input type="text" name="name" id="name" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Price" />
                    </div>
                    <div className="col-span-2">
                       <select
                            
                                className="flex p-3 text-gray-600 dark:text-white bg-gray-100 dark:bg-gray-600 border-gray-300 rounded-lg w-full"
                               
                            >
                                <option className='text-gray-600 dark:text-white ' value="">{t("status")}</option>
                             
                                <option className='text-gray-600 dark:text-white '>
                                   Available
                                </option>
                                <option className='text-gray-600 dark:text-white '>
                                  Rented
                                </option>
                                <option className='text-gray-600 dark:text-white '>
                                  Maintenance
                                </option>
                               
                            </select>
             
                     </div>
          

              
                </div>
                <button className=" cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                   {t("add-property")}
                </button>
            </form>
   </div>
  )
}

export default AddPropertyForm