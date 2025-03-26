"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileExport, faPen, faTrash, faEye,faUsersGear } from '@fortawesome/free-solid-svg-icons';
import usersData from '../../../../usersData.json';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

import AddRoleForm from '../forms/roleManagment/AddRoleForm';
import EditRoleForm from '../forms/roleManagment/EditRoleForm';
type User = {
    id: string;
    name: string;
    role: string;
    email: string;
  };
const RoleManagment = () => {

  const[addRole,setAddRole]=useState(false);
    const [users, setUsers] = useState<User[]>([]); 
    const [editRole,setEditRole]=useState(false)
      const locale = useLocale();  
      const t = useTranslations('full'); 

      const openAddRoleModal =()=>{
        setAddRole(true);
      }
      const openEditModal =()=>{
        setEditRole(true);
        setAddRole(false);
      }
      const closeEditModal =()=>{
        setEditRole(false);
        setAddRole(false);
      }
      const closeAddRolePage =()=>{
        setAddRole(false);
        setEditRole(false);
      }

  useEffect(() => {
    setUsers(usersData);
  }, []);

  return (
    <div className='flex flex-col justify-between p-4'>
      
     
        <div className='flex justify-start gap-2'>
          <button   onClick={openAddRoleModal} className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
            <FontAwesomeIcon icon={faUsersGear} />
           {t('add-role')}
          </button>
       
      </div>
      <div className='py-5'>
        <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
              <tr>
                <th className='px-6 py-3'>{t('id')}</th>
                <th className='px-6 py-3'>{t('role')}</th>
                <th className='px-6 py-3'>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                  <td className='px-6 py-4'>{user.id}</td>
                  <td className='px-6 py-4'>{user.role}</td>
                  <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                    <button onClick={openEditModal}>
                    <FontAwesomeIcon icon={faPen} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                       
                    </button>
                    <FontAwesomeIcon icon={faTrash} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                    <FontAwesomeIcon icon={faEye} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]'>
       

           <div>

             <p className='text-gray-600 dark:text-gray-200'>Showing 1 to 11 of 11 entries</p>
           </div>

           <div className='flex items-center justify-center gap-x-2'>

            <span className='p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md'>
            {t("previous")}
            </span>

            <p className='p-1 px-4 bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-800 rounded-md'>1</p>

            <span className='p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md'>
              {t("next")}</span>

           </div>


        </div>
      </div>


      {addRole && <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("create-role")}
                </h3>
                <button onClick={closeAddRolePage}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <AddRoleForm/>
          </div>
        </div>
      }

{editRole && <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("edit-role")}
                </h3>
                <button onClick={closeEditModal}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <EditRoleForm/>
          </div>
        </div>
      }


    </div>
  );
};


export default RoleManagment