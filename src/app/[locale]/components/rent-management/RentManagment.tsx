"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { faPen, faTrash, faEye, faPlus, faFilter,faMoneyBill,faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import toast from 'react-hot-toast';
import { deleteRent, fetchRents, terminateRent } from '@/actions/rentManagmentAction';
import AddRentForm from '../forms/rentManagment/AddRentForm';
import { withAuth } from '@/hooks/withAuth';
import UpdateRentForm from '../forms/rentManagment/UpdateRentForm';

type Rent = {
  id: number;
  property_id: {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
  };
  user_id: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  rent_type: string;
  start_date: string;
  end_date: string;
  payment_cycle: string;
  rent_amount: number;
  deposit_amount: number;
  status: string;
  created_at: string;
};
type ViewMode = 'edit' | 'view' | 'payment' |"delete";

const RentManagement = () => {
  const queryClient = useQueryClient();
  const [addRentModal, setRentModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number, name: string } | null>(null);
  const [selectedRent, setSelectedRent] = useState<Rent | null>(null);
  const [filterComponent, setFilterComponent] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('edit');
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    start_date_min: '',
    start_date_max: '',
    end_date_min: '',
    end_date_max: '',
    page: '1'
  });

  const locale = useLocale();  
  const t = useTranslations('full');

  const { data, isPending, error, isSuccess } = useQuery({
    queryKey: ['rents', filters],
    queryFn: () => fetchRents({
      search: filters.search,
      status: filters.status,
      start_date_min: filters.start_date_min,
      start_date_max: filters.start_date_max,
      end_date_min: filters.end_date_min,
      end_date_max: filters.end_date_max,
      page: filters.page
    })
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: '1'
    }));
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteRent(id),
    onSuccess: () => {
      toast.success(t('rent-delete-success'));
      setConfirmDelete(null);
      queryClient.invalidateQueries({ queryKey: ['rents'] });
    },
    onError: () => {
      toast.error(t('rent-delete-error'));
    },
  });

    const terminateMutation = useMutation({
      mutationFn: (id: any) => terminateRent(id),
      onSuccess: (response) => {
          
          if(response.success){
            queryClient.invalidateQueries({ queryKey: ['rents'] });
            toast.success(response?.message || 'successfuly terminated the rent!')
            setSelectedRent(null);
          }
        
        
  
      }
  });

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage.toString()
    }));
  };

  const openAddRentModal = () => setRentModal(true);
  const closeAddRentModal = () => setRentModal(false);
  const openFilterComp = () => setFilterComponent(!filterComponent);

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      start_date_min: '',
      start_date_max: '',
      end_date_min: '',
      end_date_max: '',
      page: '1'
    });
  };
 console.log(data,'data of the rents')
  return (
    <div className='flex flex-col justify-between p-4'>
      <div className='flex items-center justify-between w-full gap-5 xl:gap-0'>
        <div onClick={openFilterComp} className='flex p-5 cursor-pointer bg-gray-100 dark:bg-gray-300 rounded-full size-5 items-center justify-center'>
          <FontAwesomeIcon icon={faFilter} className='text-dark dark:text-gray-800 text-sm' />
        </div>

        <div className='flex justify-end gap-2'>
          <button onClick={openAddRentModal} className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
            <FontAwesomeIcon icon={faPlus} />
            {t('add-rent')}
          </button>
        </div>
      </div>
    
      {filterComponent && (
        <div className='relative w-full overflow-x-auto border-gray-200 dark:bg-[#27282b] bg-[#f3f4f6] dark:border-[#27282b] border-1 p-4 rounded-sm overflow-y-auto py-3 my-3'>
          <div className='flex flex-col md:flex-row gap-4 w-[100%]'>
            <div className='flex gap-2 justify-evenly md:gap-2 flex-col 2xl:flex-row w-full min-w-full'>
              <div className='flex flex-col items-center rounded-lg p-4'>
                <p className='font-semibold text-gray-700 pt-2 dark:text-gray-100 text-sm'>{t('rent-start-date-range')}</p>
                <div className='flex flex-col items-center justify-center py-2 sm:flex-row gap-2 w-full'>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="start_date_min" className="text-sm text-gray-700 dark:text-gray-100 truncate">{t('from')}</label>
                    <input
                      type="date"
                      id="start_date_min"
                      name="start_date_min"
                      value={filters.start_date_min}
                      onChange={handleFilterChange}
                      className="border text-gray-700 dark:text-gray-100 text-sm border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="start_date_max" className="text-sm text-gray-700 dark:text-gray-100 truncate">{t('up-to')}</label>
                    <input
                      type="date"
                      id="start_date_max"
                      name="start_date_max"
                      value={filters.start_date_max}
                      onChange={handleFilterChange}
                      className="border text-gray-700 dark:text-gray-100 text-sm border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-center rounded-lg p-4'>
                <p className='font-semibold text-gray-700 pt-2 dark:text-gray-100 text-sm'>{t('rent-end-date-range')}</p>
                <div className='flex flex-col items-center justify-center py-2 sm:flex-row gap-2 w-full'>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="end_date_min" className="text-sm text-gray-700 dark:text-gray-100 truncate">{t('from')}</label>
                    <input
                      type="date"
                      id="end_date_min"
                      name="end_date_min"
                      value={filters.end_date_min}
                      onChange={handleFilterChange}
                      className="border text-gray-700 dark:text-gray-100 text-sm border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label htmlFor="end_date_max" className="text-sm text-gray-700 dark:text-gray-100 truncate">{t('up-to')}</label>
                    <input
                      type="date"
                      id="end_date_max"
                      name="end_date_max"
                      value={filters.end_date_max}
                      onChange={handleFilterChange}
                      className="border text-gray-700 dark:text-gray-100 text-sm border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className='flex flex-col items-center rounded-lg p-4'>
                <p className='font-semibold text-gray-700 pt-2 dark:text-gray-100 text-sm'>{t('rent-status')}</p>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="dark:bg-[#27282b] max-w-[14rem] bg-[#f3f4f6] w-full mt-2 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">{t('all-statuses')}</option>
                  <option value="active">{t('active')}</option>
                  <option value="expired">{t('expired')}</option>
                  <option value="terminated">{t('terminated')}</option>
                  <option value="completed">{t('completed')}</option>

                </select>
              </div>

              <div className='flex items-center justify-center'>
                <button
                  onClick={clearFilters}
                  className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm'
                >
                  {t('clear-filters')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='py-5'>
        <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
              <tr>
                <th className='px-6 py-3'>{t('id')}</th>
                <th className='px-6 py-3'>{t('property')}</th>
                <th className='px-6 py-3'>{t('tenant')}</th>
                <th className='px-6 py-3'>{t('start-date')}</th>
                <th className='px-6 py-3'>{t('end-date')}</th>
                <th className='px-6 py-3'>{t('rent-amount')}</th>
                <th className='px-6 py-3'>{t('status')}</th>      
                <th className='px-6 py-3'>{t('action')}</th>                
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <tr>
                 <td colSpan={8} className='px-6 text-black py-4 text-center'>Loading</td>
                </tr>
              ) : error ? (
                <tr>
                <td colSpan={8} className='px-6 text-black py-4 text-center'>Something went wrong!</td>
                </tr>
              ) : data?.data?.length === 0 && isSuccess ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    {t('nothing-to-show')}
                  </td>
                </tr>
              ) : data?.data?.map((rent: Rent) => (
                <tr 
                  key={rent.id} 
                  className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'
                >
                  <td className='px-6 py-4'>{rent.id}</td>
                  <td className='px-6 py-4'>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{rent.property_id.name}</span>
                      <span className='text-xs text-gray-400'>{rent.property_id.address}, {rent.property_id.city}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    {rent.user_id.first_name} {rent.user_id.last_name}
                    <div className='text-xs text-gray-400'>{rent.user_id.email}</div>
                  </td>
                  <td className='px-6 py-4'>{new Date(rent.start_date).toLocaleDateString()}</td>
                  <td className='px-6 py-4'>{new Date(rent.end_date).toLocaleDateString()}</td>
                  <td className='px-6 py-4'>{rent.rent_amount.toLocaleString()}</td>
                  <td className='px-6 py-4'>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rent.status === 'active' ? 'bg-green-100 text-green-800' :
                      rent.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {t(rent.status)}
                    </span>
                  </td>
                  <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                  <button onClick={() => {
                          setSelectedRent(rent);
                          setViewMode('edit');
                        }}>
                          <FontAwesomeIcon 
                            icon={faPen} 
                            className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
                          />
                        </button>
              
                    {rent.status ==="active" &&   <FontAwesomeIcon 
                icon={faCircleStop} 
                onClick={() => {
                  setSelectedRent(rent);
                  setViewMode('delete');
                }} 
                className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
              />}
              

<FontAwesomeIcon 
                icon={faMoneyBill} 
                onClick={() => {
                  setSelectedRent(rent);
                  setViewMode('payment');
                }} 
                className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
              />
                      <FontAwesomeIcon 
                icon={faEye} 
                onClick={() => {
                  setSelectedRent(rent);
                  setViewMode('view');
                }} 
                className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
              />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {data && (
          <div className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]'>
            <div>
              <p className='text-gray-600 dark:text-gray-200'>
                {t('showing-entries', { showing: data?.data?.length, total: data?.count })}
              </p>
            </div>

            <div className='flex items-center justify-center gap-x-2'>
              <button 
                onClick={() => handlePageChange(Number(filters.page) - 1)} 
                disabled={!data?.previous}
                className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md ${
                  !data?.previous ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {t("previous")}
              </button>

              <span className='p-1 px-4 bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-800 rounded-md'>
                {filters?.page}
              </span>

              <button 
                onClick={() => handlePageChange(Number(filters?.page) + 1)} 
                disabled={!data?.next}
                className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md ${
                  !data?.next ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {t("next")}
              </button>
            </div>
          </div>
        )}
      </div>
      {(selectedRent && viewMode==='delete' ) &&
  <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>

        <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
        <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
          
          <div className="flex items-center justify-center mb-2 text-center text-gray-600 gap-1">
            <p>Terminate Rent</p> 
          </div>

          <p className='text-xs text-gray-600 text-center p-4'>Are you sure you want to end the lease?</p>
          
          <div className="flex justify-center items-center space-x-4">
            {terminateMutation?.isPending ? (
              <button
                onClick={() => terminateMutation.mutate(selectedRent?.id)}
                className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                disabled={deleteMutation.isPending}
              >
                {t('processing')}
              </button>
            ) : (
              <button
                onClick={() => terminateMutation.mutate(selectedRent?.id)}
                className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                disabled={terminateMutation.isPending}
              >
                {t('confirm')}
              </button>
            )}
            
            <button
              onClick={() => setSelectedRent(null)}
              className='px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
      </div>

      
      }
      {selectedRent && (viewMode==="view" || viewMode==="edit") &&(
  <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
    <div className={`relative ${viewMode === 'view' ? 'max-w-2xl' : 'max-w-xl'} max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full`}>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
          {viewMode === 'edit' ? t("update-rent") : t("rent-details")}
        </h3>
        <button 
          onClick={() => setSelectedRent(null)} 
          type="button" 
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>

   
   {(selectedRent && viewMode ==='edit') &&  <>
    <UpdateRentForm 
          onSuccess={() => {
            setSelectedRent(null);
            queryClient.invalidateQueries({ queryKey: ['rents'] });
          }} 
          rent={selectedRent} 
        />
   </>}


   {(selectedRent && viewMode ==="view") &&<>
    <div className="p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Property Details */}
            <div className="col-span-2">
              <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                {t('property-details')}
              </h4>
              <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('name')}: </span>
                  {selectedRent.property_id.name}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('address')}: </span>
                  {selectedRent.property_id.address}, {selectedRent.property_id.city}, {selectedRent.property_id.state}
                </p>
              </div>
            </div>

            {/* Tenant Details */}
            <div>
              <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                {t('tenant-details')}
              </h4>
              <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('name')}: </span>
                  {selectedRent.user_id.first_name} {selectedRent.user_id.last_name}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('email')}: </span>
                  {selectedRent.user_id.email}
                </p>
              </div>
            </div>

            {/* Rent Details */}
            <div>
              <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                {t('rent-details')}
              </h4>
              <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('rent-type')}: </span>
                  {selectedRent.rent_type}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('payment-cycle')}: </span>
                  {selectedRent.payment_cycle}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('status')}: </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedRent.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedRent.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedRent.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Financial Details */}
            <div>
              <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                {t('financial-details')}
              </h4>
              <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('rent-amount')}: </span>
                  {selectedRent.rent_amount.toLocaleString()} 
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('deposit-amount')}: </span>
                  {selectedRent.deposit_amount.toLocaleString()} 
                </p>
              </div>
            </div>

            {/* Date Details */}
            <div>
              <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                {t('date-details')}
              </h4>
              <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('start-date')}: </span>
                  {new Date(selectedRent.start_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('end-date')}: </span>
                  {new Date(selectedRent.end_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  <span className="font-medium">{t('created-at')}: </span>
                  {new Date(selectedRent.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

       
        </div>
   </>}
   
      
    
    </div>
  </div>
)}



      {addRentModal && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t("add-rent")}
              </h3>
              <button 
                onClick={closeAddRentModal} 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <AddRentForm onSuccess={closeAddRentModal} />
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
          <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
            <svg className="text-gray-600 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"></path>
            </svg>
            <div className="flex items-center justify-center mb-4 text-center text-gray-600 gap-1">
              <p>{t('confirm-delete')}</p> 
              <p className="bg-gray-200 rounded-lg p-2 text-sm">{confirmDelete?.name}?</p>
            </div>
            
            <div className="flex justify-center items-center space-x-4">
              {deleteMutation?.isPending ? (
                <button
                  onClick={() => deleteMutation.mutate(confirmDelete.id)}
                  className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                  disabled={deleteMutation.isPending}
                >
                  {t('processing')}
                </button>
              ) : (
                <button
                  onClick={() => deleteMutation.mutate(confirmDelete.id)}
                  className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                  disabled={deleteMutation.isPending}
                >
                  {t('confirm')}
                </button>
              )}
              
              <button
                onClick={() => setConfirmDelete(null)}
                className='px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
              >
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(RentManagement, ["system-admin"], ["auth.view_permission", "ednant"]);