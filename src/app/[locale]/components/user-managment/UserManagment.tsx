"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileExport, faPen, faTrash, faEye,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import usersData from '../../../../usersData.json';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import AddUserForm from '../forms/userManagment/AddUserForm';
import EditUserForm from '../forms/userManagment/EditUserForm';
type User = {
    id: string;
    name: string;
    role: string;
    email: string;
  };
const UserManagement = () => {
    const[addUser,setUser]=useState(false);
    const[editUser,setEditUser]=useState(false);

    const [users, setUsers] = useState<User[]>([]); 
      const locale = useLocale();  
      const t = useTranslations('full'); 

      const openAddUserModal =()=>{
        setUser(true);
      }
      const openEditUserModal =()=>{
        setUser(false);
        setEditUser(true);
      }
      const closeEditUserPage =()=>{
        setUser(false);
        setEditUser(false);
      }
      const closeAddUserPage =()=>{
        setUser(false);
        setEditUser(false);
      }
 
  useEffect(() => {
    setUsers(usersData);
  }, []);

  return (
    <div className='flex flex-col justify-between p-4'>
      <div className='flex items-center flex-col xl:flex-row  justify-between w-full gap-5 xl:gap-0'>
        <div className='relative w-[100%] xl:w-[28rem] pr-4 mb-2 sm:mb-0'>
          <input
            type='text'
         placeholder={`${t("search-user")}...`}
            className='border border-gray-300 dark:border-gray-700 p-2 pl-10 rounded-lg w-full dark:text-gray-200 focus:outline-none  placeholder-gray-400 text-gray-700'
          />
                     <FontAwesomeIcon icon={faMagnifyingGlass}      className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-white'/>

      
        </div>



  <div className="flex w-full max-w-[12rem] gap-2 dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-800 hover:border-gray-400 transition-all duration-200 py-1 relative">
  <select
  
    className="appearance-none w-full pl-4 pr-8 text-sm capitalize py-2 bg-transparent outline-none text-gray-700 dark:text-gray-200 dark:bg-gray-600  cursor-pointer   transition-all duration-200"
  >
    <option value="">{t('all-role')}</option>

      <option >Manager</option>
      <option >Tenant</option>


  </select>


  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
</div>



        <div className='flex justify-end gap-2'>
          <button   onClick={openAddUserModal} className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
            <FontAwesomeIcon icon={faUserPlus} />
           {t('add-user')}
          </button>
          <button className='flex cursor-pointer items-center capitalize text-sm justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
            <FontAwesomeIcon icon={faFileExport} />
           {t('export-csv')}
          </button>
        </div>
      </div>
      <div className='py-5'>
        <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
              <tr>
                <th className='px-6 py-3'>{t('id')}</th>
                <th className='px-6 py-3'>{t('name')}</th>
                <th className='px-6 py-3'>{t('role')}</th>
                <th className='px-6 py-3'>{t('email')}</th>
                <th className='px-6 py-3'>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                  <td className='px-6 py-4'>{user.id}</td>
                  <td className='px-6 py-4'>{user.name}</td>
                  <td className='px-6 py-4'>{user.role}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                    <button onClick={openEditUserModal} >
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

      {editUser&&(
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("edit-user")}
                </h3>
                <button onClick={closeEditUserPage}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <EditUserForm/>
          </div>
        </div>
      )}


      {addUser && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-md'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("create-user")}
                </h3>
                <button onClick={closeAddUserPage}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <AddUserForm/>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserManagement;
