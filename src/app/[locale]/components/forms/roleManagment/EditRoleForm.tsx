import React from 'react'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
const EditRoleForm = () => {

   const t=useTranslations("full")

  return (
   <div>
    <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                       <input type="text" name="role" id="role" className="bg-gray-100  text-gray-600 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter role name" />
                    </div>
                    <div className='flex col-span-2 items-center justify-center'>
                        <span className='text-gray-600 capitalize dark:text-gray-400 font-bold'>{t("permssions")}</span>
                    </div>

                    <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700"/>
                    <div className="grid col-span-2 grid-cols-3 gap-4">
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Access Dashboard</label>
                                </div>

                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Manage Users</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                                <div className="flex items-center w-full">
                                    <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                                </div>
                     </div>
               

                
                </div>
                <button className=" cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                   {t("edit-role")}
                </button>
            </form>
   </div>
  )
}

export default EditRoleForm