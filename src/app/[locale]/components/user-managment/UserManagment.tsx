"use client"
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faUserPlus, faFileExport, faPen, faTrash, faEye, faMagnifyingGlass, faBan, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import AddUserForm from '../forms/userManagment/AddUserForm';
import EditUserForm from '../forms/userManagment/EditUserForm';
import { activateUser, getAllUsers, deactivateUser, exportAllUsers } from '@/actions/userManagmentAction';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import ViewUserData from '../forms/userManagment/ViewUserData';
import { withAuth } from '@/hooks/withAuth';
type User = {
    id: string;
    first_name: string;
    role: string;
    email: string;
    last_name: string;
    groups: string[];
    user_permissions: string[];
    is_active: boolean;
};

const UserManagement = () => {
    const [confirmUserDeactivate, setConfirmUserDeactivate] = useState<{ id: number, name: string } | null>(null);
    const [confirmActivateUser, setConfirmActivateUser] = useState<{ id: number, name: string } | null>(null);
    const queryClient = useQueryClient();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [addUser, setUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const locale = useLocale();  
    const t = useTranslations('full'); 
    const [currentUserView, setCurrentUserView] = useState(false);
    const [currentUserData, setCurrentUserData] = useState<User | null>(null);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            setSearchQuery(query);
            setCurrentPage(1);
        }, 500),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const { data: userData, isPending, isError, isSuccess } = useQuery({
        queryKey: ["getAllUserData", currentPage, searchQuery],
        queryFn: () => getAllUsers(currentPage, searchQuery),
    });
   
    const usersList = userData?.data || [];
    const total_pages = userData?.total_pages || 0;
    const previous = userData?.previous || false;
    const next = userData?.next || false;
    const count = userData?.count || 0;

    const openAddUserModal = () => setUser(true);
    const openEditUserModal = (user: User) => {
        setSelectedUser(user);
        setEditUser(true);
    };
    const closeEditUserPage = () => setEditUser(false);
    const closeAddUserPage = () => setUser(false);

    const deactivateMutation = useMutation({
        mutationFn: (id: number) => deactivateUser(id),
        onSuccess: () => {
            toast.success("Successfully deactivated the user!");
            setConfirmUserDeactivate(null);
            queryClient.invalidateQueries({ queryKey: ['getAllUserData'] });
        },
        onError: () => {
            toast.error("Error deactivating the user!");
        },
    });

    const activateMutation = useMutation({
        mutationFn: (id: number) => activateUser(id),
        onSuccess: () => {
            toast.success("Successfully activated user!");
            setConfirmActivateUser(null);
            queryClient.invalidateQueries({ queryKey: ['getAllUserData'] });
        },
        onError: () => {
            toast.error("Error activating the user!");
        }
    });



  
    const exportMutation = useMutation({
        mutationFn: async () => {
          const response = await exportAllUsers(currentPage, searchQuery);
          if (response.status !== 200) {
            throw new Error(response.error || "Failed to export clients.");
          }
      

          return response.clients;
        },
        onSuccess: (clients:any) => {

         
     
          const csvContent = [
            ["First Name", "Middle Name","Last Name","email", "Is_superuser", "Is_active", "Is_staff", "Address","Phone Number","Date joined","Roles"],
            ...clients?.data.map((client:any) => [
              client?.first_name || "N/A",
              client?.middle_name || "N/A",
              client?.last_name || "N/A",
              client?.email || "N/A",
              client?.is_superuser || "N/A",
              client?.is_active || "N/A",
              client?.is_staff || "N/A",
              client?.address || "N/A",
              client?.phone_number || "N/A",
              new Date(client?.date_joined).toLocaleDateString(),
              client?.groups.map((groupdata:any)=>groupdata),
            ])
          ].map(e => e.join(",")).join("\n");
    
          // Create a Blob and trigger download
          const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "clients_export.csv");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    
          toast.success("Users exported successfully!");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to export users.");
        },
      });
   
    const handleExport = () => {
        exportMutation.mutate();
      };

    const viewUserData = (user: User) => {
        setCurrentUserView(true);
        setCurrentUserData(user);
    };



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
                    <button  onClick={handleExport}
                             disabled={exportMutation.isPending} className='flex cursor-pointer items-center capitalize text-sm justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
                       
                       {exportMutation.isPending ? "Exporting..." : <> <FontAwesomeIcon icon={faFileExport} />{t('export-csv')}</>}
                    </button>
                </div>
            </div>
        
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
                            {isPending ? (
                                <tr>
                                    <td colSpan={4} className='px-6 py-4 text-center'>Loading...</td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={4} className='px-6 py-4 text-center'>Failed to load user!</td>
                                </tr>
                            ) : usersList?.length === 0 && isSuccess ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {t('nothing-to-show')}
                                    </td>
                                </tr>
                            ) : (
                                usersList?.map((user: User) => (
                                    <tr key={user.id} className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                                        <td className='px-6 py-4'>{user?.first_name || '-'}</td>
                                        <td className='px-6 py-4'>{user?.groups[0] || '-'}</td>
                                        <td className='px-6 py-4'>{user?.email || '-'}</td>
                                        <td className='px-6 py-4'>
                                            <div className='flex flex-row space-x-4 items-center'>
                                                <button onClick={() => openEditUserModal(user)}>
                                                    <FontAwesomeIcon icon={faPen} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                                </button>
                                                {user?.is_active ? (
                                                    <button onClick={() => setConfirmUserDeactivate({ id: parseInt(user.id), name: user.first_name })}>
                                                        <FontAwesomeIcon icon={faBan} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                                    </button>
                                                ) : (
                                                    <button onClick={() => setConfirmActivateUser({ id: parseInt(user.id), name: user.first_name })}>
                                                        <FontAwesomeIcon icon={faLockOpen} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                                    </button>
                                                )}
                                                <button onClick={() => viewUserData(user)}>
                                                    <FontAwesomeIcon icon={faEye} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                                </button>
                                            </div>
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

            {currentUserView && currentUserData && (
                <div className="fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-120">
                    <div className="relative max-h-[80%] bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-2xl overflow-x-hidden overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                                {t("view-user")}
                            </h3>
                            <button onClick={() => setCurrentUserView(false)}>
                                ✖
                            </button>
                        </div>
                        <ViewUserData userData={currentUserData} />
                    </div>
                </div>
            )}

            {editUser && selectedUser && (
                <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
                    <div className='relative bg-white dark:bg-gray-700 max-h-[80%] overflow-y-auto shadow-xl p-3 rounded-lg w-full max-w-xl'>
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                                {t("edit-user")}
                            </h3>
                            <button onClick={closeEditUserPage} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
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

            {confirmActivateUser && (
                <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
                    <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
                        <svg className="text-gray-600 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                        </svg>
                        <div className="flex items-center justify-center mb-4 text-center text-gray-600 gap-1">
                            <p>Are you sure you want to activate</p> 
                            <p className="bg-gray-200 rounded-lg p-2">{confirmActivateUser.name}</p>
                            <p>?</p>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => activateMutation.mutate(confirmActivateUser.id)}
                                className='px-4 py-2 cursor-pointer bg-green-500 text-white rounded hover:bg-green-600'
                                disabled={activateMutation.isPending}
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setConfirmActivateUser(null)}
                                className='px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {confirmUserDeactivate && (
                <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
                    <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
                        <svg className="text-gray-600 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
                        </svg>
                        <div className="flex items-center justify-center mb-4 text-center text-gray-600 gap-1">
                            <p>Are you sure you want to deactivate</p> 
                            <p className="bg-gray-200 rounded-lg p-2">{confirmUserDeactivate.name}</p>
                            <p>?</p>
                        </div>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => deactivateMutation.mutate(confirmUserDeactivate.id)}
                                className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                                disabled={deactivateMutation.isPending}
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setConfirmUserDeactivate(null)}
                                className='px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {addUser && (
                <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
                    <div className='relative bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-md'>
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                                {t("create-user")}
                            </h3>
                            <button onClick={closeAddUserPage} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
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

export default withAuth(UserManagement, ["system-admin"], ["auth.view_permission", "ednant"]);
