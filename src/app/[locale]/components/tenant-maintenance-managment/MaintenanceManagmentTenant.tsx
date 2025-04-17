"use client"
import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { faUserPlus, faFileExport, faPen, faTrash, faEye, faMagnifyingGlass, faBan, faLockOpen,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { withAuth } from '@/hooks/withAuth';
import AddUserForm from '../forms/userManagment/AddUserForm';
import EditUserForm from '../forms/userManagment/EditUserForm';
import { activateUser, getAllUsers, deactivateUser, exportAllUsers } from '@/actions/userManagmentAction';
import { getAllMaintenance, getSingleUserMaintenance, resolveMaintenance } from '@/actions/maintenanceManagmentAction';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';
import ViewMaintenanceData from './singleMaintenanceData/ViewMaintenanceData';
// import ViewmaintenanceData from '../forms/userManagment/ViewmaintenanceData';

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

const MaintenanceManagmentTenant = () => {
    const [startDate, setStartDate] = useState("");
     const [endDate, setEndDate] = useState("");
    // const [confirmUserDeactivate, setConfirmUserDeactivate] = useState<{ id: number, name: string } | null>(null);
    // const [confirmActivateUser, setConfirmActivateUser] = useState<{ id: number, name: string } | null>(null);
    // const queryClient = useQueryClient();
    // const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [addUser, setUser] = useState(false);
    // const [editUser, setEditUser] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const locale = useLocale();  
    const t = useTranslations('full'); 
    const [currentUserView, setCurrentUserView] = useState(false);
    const [currentmaintenanceData, setCurrentmaintenanceData] = useState<User | null>(null);
    const [fixedMaintenanceData, setFixedMaintenanceData] = useState<User | null>(null);

    const [fixedMaintenanceView,setFixedMaintenanceView]=useState(false);

    // const debouncedSearch = useCallback(
    //     debounce((query: string) => {
    //         setSearchQuery(query);
    //         setCurrentPage(1);
    //     }, 500),
    //     []
    // );

    // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     debouncedSearch(e.target.value);
    // };

    const { data: maintenanceData, isPending, isError, isSuccess } = useQuery({
      queryKey: ["getAllMaintenanceData", currentPage, searchQuery, startDate, endDate],
      queryFn: () => getSingleUserMaintenance(currentPage, searchQuery, startDate, endDate),
    });

   
    const maintenanceList = maintenanceData?.data || [];
    const total_pages = maintenanceData?.total_pages || 0;
    const previous = maintenanceData?.previous || false;
    const next = maintenanceData?.next || false;
    const count = maintenanceData?.count || 0;
    const queryClient= useQueryClient();


 


  
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

    const viewmaintenanceData = (dataMaintenance: any) => {
        setFixedMaintenanceView(false);

        setCurrentUserView(true);
        setCurrentmaintenanceData(dataMaintenance);
    };


    const fixedMaintenanceRequest =(dataMaintenance:any)=>{
        setFixedMaintenanceView(true);
            setCurrentUserView(false);
            setFixedMaintenanceData(dataMaintenance)
    }
      const fixMaintenance = useMutation({
        mutationFn: ( id: number) => resolveMaintenance(id),
        onSuccess: () => {
            toast.success("Successfully updated the status!");
            setFixedMaintenanceView(false);
            queryClient.invalidateQueries({ queryKey: ['getAllMaintenanceData'] });
        },
        onError: (error) => {
          console.error('Error updating the status', error);
          toast.error("Error updating the status!");
    
        },
      });
   

    return (
        <div className='flex flex-col justify-between p-4'>
            <div className='flex items-center flex-col xl:flex-row justify-between w-full gap-5 xl:gap-0'>
             

                <div className='flex justify-end gap-2'>

                <div className='flex flex-col sm:flex-row  gap-2'>
                    <div className="flex gap-4 items-center">
                        <label htmlFor="startDate" className="text-sm text-gray-600 dark:text-gray-200">Start-date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Select start date"
                        />
                    </div>

                    <div className="flex gap-4 items-center">
                        <label htmlFor="endDate" className="text-sm text-gray-600 dark:text-gray-200">End-date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Select end date"
                        />
                    </div>
                </div>
                
                    {/* <button  onClick={handleExport}
                             disabled={exportMutation.isPending} className='flex cursor-pointer items-center capitalize text-sm justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
                       
                       {exportMutation.isPending ? "Exporting..." : <> <FontAwesomeIcon icon={faFileExport} />{t('export-csv')}</>}
                    </button> */}
                </div>
            </div>
        
            <div className='py-5'>
                <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
                    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
                            <tr>
                                <th className='px-6 py-3'>Applicant Name</th>
                                <th className='px-6 py-3'>Description</th>
                               <th className='px-6 py-3'>{t('status')}</th>
                                <th className='px-6 py-3'>Requested_At</th>
                                <th className='px-6 py-3'>Action</th>
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
                            ) : maintenanceList?.length === 0 && isSuccess ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {t('nothing-to-show')}
                                    </td>
                                </tr>
                            ) : (
                                maintenanceList?.map((data: any) => (
                                    <tr key={data.id} className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                                        <td className='px-6 py-4'>{data?.user_id?.first_name || '-'} {data?.user_id?.last_name || '-'}</td>
                                        <td className='px-6 py-4 truncate max-w-[200px]'>{data?.description || '-'}</td>
                                        <td className='px-6 py-4'>{data?.status || '-'}</td>
                                        <td className='px-6 py-4'>{data?.requested_at || '-'}</td>
                                        <td className='px-6 py-4'>
                                            <div className='flex flex-row space-x-4 items-center'>                      
                                                <button onClick={() => viewmaintenanceData(data)}>
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
                        <p className='text-gray-600 dark:text-gray-200'>Showing {maintenanceList.length} of {count} entries</p>
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

            {currentUserView && currentmaintenanceData && (
                <div className="fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-120">
                    <div className="relative max-h-[80%] bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-2xl overflow-x-hidden overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                            Maintenance Detail
                            </h3>
                            <button onClick={() => setCurrentUserView(false)}>
                                ✖
                            </button>
                        </div>
                        <ViewMaintenanceData maintenanceData={currentmaintenanceData} />
                    </div>
                </div>
            )}

            {fixedMaintenanceView && fixedMaintenanceData && (
                            <div>
                                      <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
                                  
                    <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
                

                        <div className='flex justify-end'>
                                             <button className='text-gray-800' onClick={() => setFixedMaintenanceView(false)}>
                                                    ✖
                                                </button>
                            </div>
                       <hr className="h-px mt-4 bg-gray-200 border-0 dark:bg-gray-400" />
          
                 
                       <div className="flex flex-col items-center justify-center mb-4 text-center text-gray-600 gap-1 ">
                      
                        <p className='flex text-gray-800 py-2'>{t('Are you sure you want to change the request')}?</p>
                        <div className='py-3'>
                        <p className='text-red-950 text-xs'>{t('Before you make this request,The maintenance problem must have to be fixed')}!</p>
                        </div>
                      
                         <div className='flex w-full justify-evenly'>
                            <button     disabled={fixMaintenance.isPending} onClick={() => fixMaintenance.mutate(parseInt(fixedMaintenanceData?.id))} className='bg-[#51a2ff] cursor-pointer px-4 text-white py-2 rounded-sm'>
                                {fixMaintenance?.isPending ? 'Processing...' : "Fix"}
                                   
                            </button>
                            <button className='bg-red-900 cursor-pointer px-4 py-2 text-white rounded-sm' onClick={() => setFixedMaintenanceView(false)}>
                                     Cancel
                            </button>
                            </div>
                      </div>
                    
                    <div className="flex justify-center items-center space-x-4">
       
           
                      </div>
                    </div>
                  </div>
                                </div>

            )}

         
        </div>
    );
};



export default withAuth(MaintenanceManagmentTenant, ["tenant"], ["pms.view_rent", "ednant"]);
