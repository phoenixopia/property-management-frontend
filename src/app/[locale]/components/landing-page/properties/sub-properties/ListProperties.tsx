"use client"

import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faUserPlus, faFileExport, faPen, faTrash, faEye, faMagnifyingGlass, faBan, faBath,faBed } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { activateUser, getAllUsers, deactivateUser, exportAllUsers } from '@/actions/userManagmentAction';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import { withAuth } from '@/hooks/withAuth';
import { getAllNotifications, readNotifications } from '@/actions/notifications';
import { getAllLogs } from '@/actions/logs';
import { getAllPropertiesForUsers } from '@/actions/propertyManagmentAction';

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

const ListProperties = () => {
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
    const [currentpropertiesData, setCurrentpropertiesData] = useState<User | null>(null);


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

    
          const { data: propertiesData, isPending, isError, isSuccess } = useQuery({
                queryKey: ["getAllProperties", currentPage],
                queryFn: () => getAllPropertiesForUsers(currentPage),
            });
    console.log(propertiesData,'propertiesData')
   
    const propertiesList = propertiesData?.data || [];
    const total_pages = propertiesData?.total_pages || 0;
    const previous = propertiesData?.previous || false;
    const next = propertiesData?.next || false;
    const count = propertiesData?.count || 0;

    const openAddUserModal = () => setUser(true);
    const openEditUserModal = (user: User) => {
        setSelectedUser(user);
        setEditUser(true);
    };
  





  
 



    return (
        <div className='flex flex-col justify-between p-4'>

            <div className='py-5'>
                <div className='relative overflow-x-auto max-h-[600px] overflow-y-auto'>
                {isPending ? (
                                <div>
                                    <p className='px-6 py-4 text-center text-gray-800'>Loading...</p>
                                </div>
                            ) : isError ? (
                                <div>
                                    <p className='px-6 py-4 text-center'>Failed to load properties!</p>
                                </div>
                            ) : propertiesList?.length === 0 && isSuccess ? (
                                <div>
                                    <p  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {t('nothing-to-show')}
                                    </p>
                                </div>
                                
                            ) : 
                            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4 gap-4 py-4'>
                        
                                          
                                     
                               { propertiesList?.map((property: any) => (
                                 

                                <div key={property?.id} className='flex flex-col shadow-sm cursor-pointer '>
                                <img    src={`${property?.property_pictures[0]?.property_image ?property?.property_pictures[0]?.property_image:"https://res.cloudinary.com/dxuvdtoqa/image/upload/v1744721661/null_kxkl0v.jpg"}`}
                                                alt='alts'
                                    className=" w-[100%] h-[16rem]"
                                />
                                                                           <p className='absolute p-2 bg-black/80 text-white'>{property?.rent?property?.rent + "Br":"-"}</p>

                                <div className='flex flex-row justify-between text-sm text-gray-600 p-3'>
                                <div className='flex flex-row gap-2 '>
                                    <p className='truncate max-w-[3rem]'>
                                        <FontAwesomeIcon icon={faBed} className='  cursor-pointer' /> {property?.bed_rooms?property?.bed_rooms:"-"}
                                    </p>
                                    <p>|</p>
                                    <p className='truncate max-w-[3rem]' >
                                        <FontAwesomeIcon icon={faBath} className='  cursor-pointer' /> {property?.bath_rooms?property?.bath_rooms:"-"}
                                    </p>
                                    </div>
                                    

                                    <p className='turn truncate max-w-[10rem]'>
                                    Addis Ababa, GurdShola
                                    </p>
                                </div>

                                
                                
                                
                                </div>
                                    
                                           
                             ))} 
                                 </div>
                               
                               }
                </div>

                <div className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]'>
                    <div>
                        <p className='text-gray-600 dark:text-gray-200'>Showing {propertiesList.length} of {count} entries</p>
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

 
    

      

         

     
        </div>
    );
};

export default ListProperties

