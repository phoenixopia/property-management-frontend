"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileExport, faPen, faTrash, faEye,faMagnifyingGlass,faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import maintenanceData from '../../../../maintenanceData.json';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import AddUserForm from '../forms/userManagment/AddUserForm';
import EditUserForm from '../forms/userManagment/EditUserForm';
type MaintenanceUsers={
    id: string;
    fixedDate:string,
    requestedDate:string,
    discription:string,
    status:string,
    name: string;
    email: string;
  };
const MaintenanceManagement = () => {
    const[addUser,setUser]=useState(false);
    const[openUser,setOpenUser]=useState(false);
    const[editUser,setEditUser]=useState(false);

    const [users, setUsers] = useState<MaintenanceUsers[]>([]); 
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
   const openUserDetail=()=>{
    setOpenUser(true)
   }
   const closeUserDetail=()=>{
    setOpenUser(false)
   }

  useEffect(() => {
    setUsers(maintenanceData);
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





        <div className='flex justify-end gap-2'>
          <button   onClick={openAddUserModal} className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
            <FontAwesomeIcon icon={faScrewdriverWrench} />
           {t('add-maintenance-request')}
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
                <th className='px-6 py-3'>{t('email')}</th>
                <th className='px-6 py-3'>{t('status')}</th>
                <th className='px-6 py-3'>{t('requested-date')}</th>
                <th className='px-6 py-3'>{t('fixed-date')}</th>
                <th className='px-6 py-3'>{t('description')}</th>
                <th className='px-6 py-3'>{t('action')}</th>


                
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} onClick={openUserDetail} className=' cursor-pointer bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                  <td className='px-6 py-4'>{user?.id}</td>
                  <td className='px-6 py-4'>{user?.name}</td>
                  <td className='px-6 py-4'>{user?.email}</td>
                  <td className='px-6 py-4'>{user?.status}</td>
                  <td className='px-6 py-4'>{user?.requestedDate}</td>
                  <td className='px-6 py-4'>{user?.fixedDate}</td>
                  <td className='px-6 py-4'>{user?.discription}</td>

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
    {openUser && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-3xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("user-detail")}
                </h3>
                <button onClick={closeUserDetail}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
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

export default MaintenanceManagement;
