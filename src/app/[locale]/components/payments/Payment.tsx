"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { faPen, faTrash, faEye, faPlus, faFilter,faMoneyBill,faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import toast from 'react-hot-toast';
import { deleteRent, fetchRents } from '@/actions/rentManagmentAction';
import AddRentForm from '../forms/rentManagment/AddRentForm';
import { withAuth } from '@/hooks/withAuth';
import UpdateRentForm from '../forms/rentManagment/UpdateRentForm';
import { fetchPayments,approvePayment } from '@/actions/payment';

type Payment = {
  id: number;
  amount: number;
  created_at: string;
  due_date: string;
  status: string;
  payment_method: string;
  transaction_id: string;
  rent_cycles:any;
  rent_id: {
    id: number;
    property_id: {
      id: number;
      name: string;
    };
    user_id: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
  };
};

type ViewMode = 'edit' | 'view';

const Payment = () => {
  const queryClient = useQueryClient();
  const [addRentModal, setRentModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number, name: string } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [filterComponent, setFilterComponent] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('view');
  const [approveConfirmation, setApproveConfirmation] = useState<{
    show: boolean;
    paymentId: number | null;
  }>({ show: false, paymentId: null });
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
    queryKey: ['payments', filters],
    queryFn: () => fetchPayments({
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

  const approvePaymentMutation = useMutation({
    mutationFn: (paymentId: number) => approvePayment(paymentId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Payment approved successfully");
        queryClient.invalidateQueries({ queryKey: ['payments'] });
        setApproveConfirmation({ show: false, paymentId: null });
      } else {
        toast.error("Failed to approve payment");
      }
    },
    onError: (error) => {
      toast.error("Failed to approve payment");
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

  console.log(selectedPayment,'payment seleceted Datas')
  return (
    <div className='flex flex-col justify-between p-4'>
      {/* <div className='flex items-center justify-between w-full gap-5 xl:gap-0'>
        <div onClick={openFilterComp} className='flex p-5 cursor-pointer bg-gray-100 dark:bg-gray-300 rounded-full size-5 items-center justify-center'>
          <FontAwesomeIcon icon={faFilter} className='text-dark dark:text-gray-800 text-sm' />
        </div>
      </div>
    
      {filterComponent && (
        <div className='relative w-full overflow-x-auto border-gray-200 dark:bg-[#27282b] bg-[#f3f4f6] dark:border-[#27282b] border-1 p-4 rounded-sm overflow-y-auto py-3 my-3'>
          <div className='flex flex-col md:flex-row gap-4 w-[100%]'>
            <div className='flex gap-2 justify-evenly md:gap-2 flex-col 2xl:flex-row w-full min-w-full'>
              <div className='flex flex-col items-center rounded-lg p-4'>
                <p className='font-semibold text-gray-700 pt-2 dark:text-gray-100 text-sm'>{t('payment-status')}</p>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="dark:bg-[#27282b] max-w-[14rem] bg-[#f3f4f6] w-full mt-2 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">{t('all-statuses')}</option>
                  <option value="pending">{t('pending')}</option>
                  <option value="completed">{t('completed')}</option>
                  <option value="failed">{t('failed')}</option>
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
      )} */}

      <div className='py-5'>
        <div className='relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200'>
              <tr>
                <th className='px-6 py-3'>{t('id')}</th>
                <th className='px-6 py-3'>{t('property')}</th>
                <th className='px-6 py-3'>{t('tenant')}</th>
                <th className='px-6 py-3'>{t('date')}</th>
                <th className='px-6 py-3'>{t('amount')}</th>
                <th className='px-6 py-3'>{t('payment-method')}</th>
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
              ) : data?.data?.map((payment: Payment) => (
                <tr 
                  key={payment.id} 
                  className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'
                >
                  <td className='px-6 py-4'>{payment.id}</td>
                  <td className='px-6 py-4'>
                    {payment.rent_id?.property_id?.name || 'N/A'}
                  </td>
                  <td className='px-6 py-4'>
                    {payment.rent_id?.user_id?.first_name || 'N/A'} {payment.rent_id?.user_id?.last_name || ''}
                    <div className='text-xs text-gray-400'>{payment.rent_id?.user_id?.email || ''}</div>
                  </td>
                  <td className='px-6 py-4'>{new Date(payment.created_at).toLocaleDateString()}</td>
                  <td className='px-6 py-4'>{payment.amount.toLocaleString()}</td>
                  <td className='px-6 py-4'>{payment.payment_method}</td>
                  <td className='px-6 py-4'>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'payment complete' ? 'bg-green-100 text-green-800' :
                      payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                    <FontAwesomeIcon 
                      icon={faEye} 
                      onClick={() => {
                        setSelectedPayment(payment);
                        setViewMode('view');
                      }} 
                      className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
                    />
                  {(payment?.status === "pending") && (
                <FontAwesomeIcon 
                  icon={faCircleCheck} 
                  onClick={(e) => {
                    e.stopPropagation();
                    setApproveConfirmation({ show: true, paymentId: payment.id });
                  }} 
                  className="text-green-500 dark:text-green-400 text-sm cursor-pointer hover:text-green-700" 
                  title={t('approve-payment')}
                />
              )}
                  
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

      {approveConfirmation.show && (
          <div className="fixed inset-0 bg-gray-800/90 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {t('confirm-approve-title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('confirm-approve-message')}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => !approvePaymentMutation.isPending && setApproveConfirmation({ show: false, paymentId: null })}
                  disabled={approvePaymentMutation.isPending}
                  className={`px-4 py-2 border cursor-pointer border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                    approvePaymentMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={() => {
                    if (approveConfirmation.paymentId && !approvePaymentMutation.isPending) {
                      approvePaymentMutation.mutate(approveConfirmation.paymentId);
                    }
                  }}
                  disabled={approvePaymentMutation.isPending}
                  className={`px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 ${
                    approvePaymentMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {approvePaymentMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('processing')}
                    </span>
                  ) : (
                    t('confirm-approve')
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      {selectedPayment && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className={`relative max-w-2xl max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full`}>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t("payment-details")}
              </h3>
              <button 
                onClick={() => setSelectedPayment(null)} 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            
            <div className="p-4 md:p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
                <div className="col-span-2">
                  <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                    {t('payment-details')}
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">{t('transaction-id')}: </span>
                      {selectedPayment.transaction_id}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">{t('amount')}: </span>
                      {selectedPayment.amount.toLocaleString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">{t('payment-method')}: </span>
                      {selectedPayment.payment_method}
                    </p>
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">{t('status')}: </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedPayment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        selectedPayment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedPayment.status}
                      </span>
                    </p>
                  </div>
                </div>

                {selectedPayment.rent_id?.user_id && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                      {t('tenant-details')}
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-medium">{t('name')}: </span>
                        {selectedPayment.rent_id.user_id.first_name} {selectedPayment.rent_id.user_id.last_name}
                      </p>
                      <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-medium">{t('email')}: </span>
                        {selectedPayment.rent_id.user_id.email}
                      </p>
                    </div>
                  </div>
                )}

                {selectedPayment.rent_id?.property_id && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                      {t('property-details')}
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-200">
                        <span className="font-medium">{t('property')}: </span>
                        {selectedPayment.rent_id.property_id.name}
                      </p>
                    </div>
                  </div>
                )}

            

        <div className='flex flex-col'>
           <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                
                    {t('payed-rent-date-details')}
                  </h4>
                  <p></p>
                  {/* {selectedPayment?.rent_cycles[0].cycle_start} */}
                  {selectedPayment?.rent_cycles?.map((pay:any,id:any)=>(
                          <div key={id} className="text-gray-700 dark:text-gray-200 space-y-1 py-4">
                 

                           <p className='font-bold'>Rent_cycles {id+1}</p>
                           <div >
                            {new Date(pay?.cycle_start).toLocaleDateString()} to   {new Date(pay?.cycle_end).toLocaleDateString()}
                          </div>

                            </div>
                     
                  ))}




                  </div>
                 
                  <div>
                  <h4 className="text-md font-semibold text-gray-600 dark:text-white mb-2">
                    {t('date-details')}
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-600 p-3 rounded-lg">
                  
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-medium">{t('created-at')}: </span>
                      {new Date(selectedPayment.created_at).toLocaleDateString()}
                    </p>

              
                  </div>
                </div>
                </div>
            
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default withAuth(Payment, ["system-admin"], ["auth.view_permission", "ednant"]);