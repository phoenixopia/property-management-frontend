"use client"
import { formatDistanceToNow, parseISO } from 'date-fns';
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
import { getAllNotifications, readNotifications } from '@/actions/notifications';
import ViewNotificationData from './sub-notifications/ViewNotificationData';
function formatTimeAgo(isoDateString:any) {
    try {
      const date = parseISO(isoDateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'some time ago';
    }
  }
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

const Notifications = () => {
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
    const [currentNotificationView, setCurrentNotificationView] = useState(false);

    const [currentUserData, setCurrentUserData] = useState<User | null>(null);
    const [currentNotificationData, setCurrentNotificationData] = useState<User | null>(null);


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

    const { data: notificationData, isPending, isError, isSuccess } = useQuery({
        queryKey: ["getAllNotifications", currentPage],
        queryFn: () => getAllNotifications(currentPage),
    });
   
    const notificationList = notificationData?.data || [];
    const total_pages = notificationData?.total_pages || 0;
    const previous = notificationData?.previous || false;
    const next = notificationData?.next || false;
    const count = notificationData?.count || 0;

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


    const seenMutation = useMutation({
        mutationFn: (id: number) => readNotifications(id),
        onSuccess: () => {
 
            
            queryClient.invalidateQueries({ queryKey: ['getAllNotifications'] });
            queryClient.invalidateQueries({ queryKey: ['shortNotificationData'] });

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

    const viewNotiData = (notification: any) => {
        setCurrentNotificationView(true);
        setCurrentNotificationData(notification);
        seenMutation.mutate(notification?.id)
    };

    console.log(notificationData,'data of the notification after the fetch')

    return (
        <div className='flex flex-col justify-between p-4'>

            <div className='py-5'>
                <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>{t('notification_type')}</th>
                                <th className='px-6 py-3'>{t('message')}</th>
                                <th className='px-6 py-3'>{t('is_read')}</th>
                                <th className='px-6 py-3'>{t('created_at')}</th>
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
                                    <td colSpan={4} className='px-6 py-4 text-center'>Failed to load notifications!</td>
                                </tr>
                            ) : notificationList?.length === 0 && isSuccess ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {t('nothing-to-show')}
                                    </td>
                                </tr>
                            ) : (
                                notificationList?.map((notification: any) => (
                                    <tr key={notification.id} className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                                        <td className='px-6 py-4'>{notification?.notification_type || '-'}</td>
                                        <td className='px-6 py-4 truncate max-w-[12rem]'>{notification?.message || '-'}</td>

                                        <td className='px-6 py-4'>{notification?.is_read==true?"YES":"NO"}</td>
                                        <td className='px-6 py-4'>{formatTimeAgo(notification?.created_at)}</td>
                                        <td className='px-6 py-4'>
                                        <button onClick={() => viewNotiData(notification)}>
                                                    <FontAwesomeIcon icon={faEye} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                                </button>
                                        
                                        </td>

                                     
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]'>
                    <div>
                        <p className='text-gray-600 dark:text-gray-200'>Showing {notificationList.length} of {count} entries</p>
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

            {currentNotificationView && currentNotificationData && (
                <div className="fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-120">
                    <div className="relative max-h-[80%] bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-2xl overflow-x-hidden overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                                {t("view-notification")}
                            </h3>
                            <button onClick={() => setCurrentNotificationView(false)}>
                                ✖
                            </button>
                        </div>
                        <ViewNotificationData notificationData={currentNotificationData} />
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

export default withAuth(Notifications, ["system-admin"], ["auth.view_permission", "ednant"]);

