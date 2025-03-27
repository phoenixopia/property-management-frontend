import React from 'react'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
const EditProfileForm = () => {

   const t=useTranslations("full")

  return (
   <div>
    <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                       <input type="text" name="role" id="role" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter role name" />
                    </div>
                    <div className="col-span-2">
                       <input type="password" name="role" id="role" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="admin@gmail.com" />
                    </div>
                    <div className="col-span-2">
                       <input type="password" name="role" id="role" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="********" />
                    </div>
               

                
                </div>
                <div>
                          
                </div>
                <button className=" cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                               {t("update")}
                </button>
            </form>
   </div>
  )
}

export default EditProfileForm