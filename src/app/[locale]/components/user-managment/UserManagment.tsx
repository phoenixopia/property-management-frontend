"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faUserPlus, faFileExport, faPen, faTrash, faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import usersData from '../../../../usersData.json';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import AddUserForm from '../forms/userManagment/AddUserForm';
import EditUserForm from '../forms/userManagment/EditUserForm';
import { getAllUsers } from '@/actions/userManagmentAction';
import { debounce } from 'lodash'

type User = {
    id: string;
    first_name: string;
    role: string;
    email: string;
    last_name:string;
    groups: string[];
    user_permissions:string[];
};

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [addUser, setUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]); 
    const locale = useLocale();  
    const t = useTranslations('full'); 

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
            setCurrentPage(1); // Reset to first page when searching
        }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        debouncedSearch(query);
    };

    const { data: userData, isPending, isError } = useQuery({
        queryKey: ["getAllUserData", currentPage, searchQuery],
        queryFn: () => getAllUsers(currentPage, searchQuery),
    });
   
    const usersList = userData?.data || [];
    const total_pages = userData?.total_pages || 0;
    const previous = userData?.previous || false;
    const next = userData?.next || false;
    const count = userData?.count || 0;

    const openAddUserModal = () => {
        setUser(true);
    };
    const openEditUserModal = ( user:User) => {
      setSelectedUser(user);
    
        setUser(false);
        setEditUser(true);
    };
    const closeEditUserPage = () => {
        setUser(false);
        setEditUser(false);
    };
    const closeAddUserPage = () => {
        setUser(false);
        setEditUser(false);
    };
  console.log(usersList,'usersList')
    return (
        <div className='flex flex-col justify-between p-4'>
            <div className='flex items-center flex-col xl:flex-row justify-between w-full gap-5 xl:gap-0'>
                <div className='relative w-[100%] xl:w-[28rem] pr-4 mb-2 sm:mb-0'>
                    <input
                        type='text'
                        placeholder={`${t("search-user")}...`}
                        className='border border-gray-300 dark:border-gray-700 p-2 pl-10 rounded-lg w-full dark:text-gray-200 focus:outline-none placeholder-gray-400 text-gray-700'
                        onChange={handleSearchChange}
                    />
                    <FontAwesomeIcon 
                        icon={faMagnifyingGlass}      
                        className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-white'
                    />
                </div>

                <div className='flex justify-end gap-2'>
                    <button onClick={openAddUserModal} className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
                        <FontAwesomeIcon icon={faUserPlus} />
                        {t('add-user')}
                    </button>
                    <button className='flex cursor-pointer items-center capitalize text-sm justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
                        <FontAwesomeIcon icon={faFileExport} />
                        {t('export-csv')}
                    </button>
                </div>
            </div>
            {isPending ? (
                <div className="p-4">Loading users...</div>
            ) : isError ? (
                <div className="p-4">Error loading users...</div>
            ):""}
            <div className='py-5'>
                <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>{t('name')}</th>
                                <th className='px-6 py-3'>{t('role')}</th>
                                <th className='px-6 py-3'>{t('email')}</th>
                                <th className='px-6 py-3'>{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                  {usersList?.length === 0 ? (
                      <tr className='bg-white dark:bg-[#333538]'>
                          <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                              {t('nothing-to-show')}
                          </td>
                      </tr>
                  ) : (
                      usersList.map((user: User) => (
                          <tr key={user.id} className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                              <td className='px-6 py-4'>{user?.first_name ? user?.first_name : '-'}</td>
                              <td className='px-6 py-4'>{user?.groups[0] ? user?.groups[0] : '-'}</td>
                              <td className='px-6 py-4'>{user?.email ? user?.email : '-'}</td>
                              <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                                  <button onClick={()=>openEditUserModal(user)}>
                                      <FontAwesomeIcon icon={faPen} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                  </button>
                                  <FontAwesomeIcon icon={faTrash} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                  <FontAwesomeIcon icon={faEye} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
                    </table>
                </div>

                <div className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]'>
                    <div>
                        <p className='text-gray-600 dark:text-gray-200'>Showing {usersList.length} of {count} entries</p>
                    </div>

                    <div className='flex items-center justify-center gap-x-2'>
                        <button 
                            className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md ${
                                !previous && "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!previous}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            {t("previous")}
                        </button>
                        <p className='p-1 px-4 bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-800 rounded-md'>
                            {currentPage}
                        </p>
                        <button
                            className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md ${
                                !next && "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!next}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            {t("next")}
                        </button>
                    </div>
                </div>
            </div>

            {editUser && (
                <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
                    <div className='relative bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
                      {editUser && selectedUser && (

                        
  <div className='fixed inset-0 bg-gray-800/90 max-h-screen flex justify-center items-center z-80'>
    <div className='relative bg-white dark:bg-gray-700 max-h-[80%] overflow-y-auto shadow-xl p-3 rounded-lg w-full max-w-xl'>
      {/* ... modal header ... */}

      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                                {t("edit-user")}
                            </h3>
                            <button onClick={closeEditUserPage} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
      <EditUserForm 
        userId={selectedUser.id}
        initialData={{
          first_name: selectedUser.first_name,
          last_name: selectedUser.last_name,
          email: selectedUser.email,
          groups: selectedUser.groups,
          user_permissions: selectedUser.user_permissions
        }}
        onSuccess={closeEditUserPage}
      />
    </div>
  </div>
)}
                    </div>
                </div>
            )}

            {addUser && (
                <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
                    <div className='relative bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-md'>
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                                {t("create-user")}
                            </h3>
                            <button onClick={closeAddUserPage} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <AddUserForm/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;