"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';
import { faPen, faTrash, faEye, faMagnifyingGlass, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import AddPropertyForm from '../forms/propertyManagment/AddPropertyForm';
import PropertyDetail from './property-detail/PropertyDetail';
import toast from 'react-hot-toast';
import { deleteProperty, fetchProperties } from '@/actions/propertyManagmentAction';
import { property } from 'lodash';
import EditPropertyForm from '../forms/propertyManagment/EditPropertyForm';
import AddPropertyMaintenance from '../forms/propertymaintenance/AddPropertyMaintenance';
import { withAuth } from '@/hooks/withAuth';
type Property = {
  id: number;
  property_type: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bed_rooms: number;
  bath_rooms: number;
  rent: number;
  status: string;
  owner_id: number | null;
  manager_id: number | null;
};

const PropertyManagement = () => {
  const queryClient =useQueryClient();
  const [addProperty, setPropertyModal] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<{ id: number ,name:string} | null>(null);
    const [propertyMaintenance,setPropertyMaintenance]=useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    min: '',
    max: '',
    page: '1',
    page_size: '10'
  });
  const [editPropertyModal, setEditPropertyModal] = useState(false);


  
  const locale = useLocale();  
  const t = useTranslations('full');

  const { data, isPending, error,isSuccess } = useQuery({
    queryKey: ['properties', filters],
    queryFn: () => fetchProperties({
      min: filters.min,
      max: filters.max,
      search: filters.search,
      page: filters.page,
      page_size: filters.page_size
    })
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: '1' // Reset to first page when filters change
    }));
  };
  const deleteMutation = useMutation({
    mutationFn: ( id: number) => deleteProperty(id),
    onSuccess: () => {
        toast.success("Successfully Deleted the property!");
        setConfirmDelete(null);
        queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: (error) => {
      console.error('Error deleting the property', error);
      toast.error("Error deleting the property!");

    },
  });

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({
      ...prev,
      page: newPage.toString()
    }));
  };

  const openaddPropertyModal = () => {
    setPropertyModal(true);
  };

  const closeaddPropertyPage = () => {
    setPropertyModal(false);
  };

  const openPropertyDetail = (property: Property) => {
    setSelectedProperty(property);
    setPropertyDetail(true);
  };
  const openAddMaintenance =(property:Property)=>{
    setSelectedProperty(property)
    setPropertyMaintenance(true);
    setPropertyDetail(false);

  }

  const closePropertyDetail = () => {
    setPropertyDetail(false);
    setSelectedProperty(null);
  };

  const closePropertyMaintenance = () => {
    setPropertyMaintenance(false);
    setSelectedProperty(null);
  };
  
  const openEditPropertyModal = (property: Property) => {
    setSelectedProperty(property);
    setEditPropertyModal(true);
  };
  
  const closeEditPropertyModal = () => {
    setEditPropertyModal(false);
    setSelectedProperty(null);
  };



  return (
    <div className='flex flex-col justify-between p-4'>
      <div className='flex items-center flex-col xl:flex-row justify-between w-full gap-5 xl:gap-0'>
        {/* Search and Filter Section */}
        <div className='flex flex-col md:flex-row gap-4 w-[80%]'>
          <div className='relative'>
            <input
              type='text'
              name='search'
              placeholder={t('search')}
              value={filters.search}
              onChange={handleFilterChange}
              className='pl-10 pr-4 py-2 text-sm border rounded-lg dark:bg-gray-700 border-gray-300 dark:border-gray-700 dark:text-white w-full'
            />
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
              className='absolute left-3 top-3 text-gray-400'
            />
          </div>
          
          <div className='flex gap-2'>
            <input
              type='number'
              name='min'
              placeholder="Minimum Rent Price"
              value={filters.min}
              onChange={handleFilterChange}
              className='px-4 py-2 border text-sm rounded-lg dark:bg-gray-700 border-gray-300 dark:border-gray-700 dark:text-white w-full'
            />
            <input
              type='number'
              name='max'
              placeholder='Maximum Rent Price'
              value={filters.max}
              onChange={handleFilterChange}
              className='px-4 py-2 border text-sm rounded-lg dark:bg-gray-700 border-gray-300 dark:border-gray-700 dark:text-white w-full'
            />
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <button 
            onClick={openaddPropertyModal} 
            className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} />
            {t('add-property')}
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
                <th className='px-6 py-3'>{t('address')}</th>
                <th className='px-6 py-3'>{t('city')}</th>
                <th className='px-6 py-3'>{t('price')}</th>
                <th className='px-6 py-3'>{t('status')}</th>      
                <th className='px-6 py-3'>{t('action')}</th>                
              </tr>
            </thead>
            <tbody>


            {isPending ? (
                                <tr>
                                    <td colSpan={7} className='px-6 py-4 text-center'>Loading...</td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} className='px-6 py-4 text-center'>Failed to load user!</td>
                                </tr>
                            ) : data?.data?.length === 0 && isSuccess ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                        {t('nothing-to-show')}
                                    </td>
                                </tr>
                            ):    data?.data?.map((property: Property) => (
                              <tr 
                                key={property.id} 
                                className='bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'
                              >
                                <td className='px-6 py-4'>{property.id}</td>
                                <td className='px-6 py-4'>{property.name}</td>
                                <td className='px-6 py-4'>{property.address}</td>
                                <td className='px-6 py-4'>{property.city}</td>
                                <td className='px-6 py-4'>{property.price}</td>
                                <td className='px-6 py-4'>{property.status}</td>
                                <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                                <button onClick={() => openEditPropertyModal(property)}>
                                  <FontAwesomeIcon 
                                    icon={faPen} 
                                    className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
                                  />
                                </button>
                           <FontAwesomeIcon 
                                    icon={faTrash} 
                                    onClick={() => setConfirmDelete({ id: property?.id,name:property?.name })} 
                                    className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
                                  />
                                  <FontAwesomeIcon 
                                    icon={faEye} 
                                    onClick={() => openPropertyDetail(property)} 
                                    className='text-dark dark:text-gray-200 text-sm cursor-pointer' 
                                  />


                                  <FontAwesomeIcon icon={faScrewdriverWrench}
                                  onClick={()=>openAddMaintenance(property)}
                                  className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                                </td>
                              </tr>
                            )) }

          
            </tbody>
          </table>
        </div>

        {data && (
          <div className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]'>
            <div>
              <p className='text-gray-600 dark:text-gray-200'>
                Showing {data.data.length} of {data.count} entries
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
                {filters.page}
              </span>

              <button 
                onClick={() => handlePageChange(Number(filters.page) + 1)} 
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

      {addProperty && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t("add-property")}
              </h3>
              <button 
                onClick={closeaddPropertyPage} 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <AddPropertyForm onSuccess={closeaddPropertyPage} />
          </div>
        </div>
      )}

      {propertyDetail && selectedProperty && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t("property-detail")}
              </h3>
              <button 
                onClick={closePropertyDetail} 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <PropertyDetail property={selectedProperty} />
          </div>
        </div>
      )}

      {propertyMaintenance && selectedProperty && (
               <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
               <div className='relative max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
                 <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                   <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                     {t("property-maintenance")}
                   </h3>
                   <button 
                     onClick={closePropertyMaintenance} 
                     type="button" 
                     className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                   >
                     <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                     </svg>
                     <span className="sr-only">Close modal</span>
                   </button>
                 </div>
                 <AddPropertyMaintenance property={selectedProperty} />
               </div>
             </div>
      )}


{confirmDelete && (
                  <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
                    <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
                    <svg className="text-gray-600 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" ></path></svg>
                    <div className="flex items-center justify-center mb-4 text-center text-gray-600 gap-1 ">
                      
                     <p>Are you sure you want to delete</p> <p className="bg-gray-200 rounded-lg p-2 text-sm">{confirmDelete?.name}?</p>
                      
                      
                      </div>
                    
                    <div className="flex justify-center items-center space-x-4">
                      {deleteMutation?.isPending ?
               <>
              <button
                         onClick={() => deleteMutation.mutate(confirmDelete.id)}
                          className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                          disabled={deleteMutation.isPending}
                        >
                        processing..
                        </button>
               </>:<>  <button
                         onClick={() => deleteMutation.mutate(confirmDelete.id)}
                          className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                          disabled={deleteMutation.isPending}
                        >
                          Confirm
                        </button></>}
                      
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className='px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

{editPropertyModal && selectedProperty && (
  <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
    <div className='relative max-h-[80%] overflow-auto bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
          {t("edit-property")}
        </h3>
        <button 
          onClick={closeEditPropertyModal} 
          type="button" 
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
      </div>
      <EditPropertyForm property={selectedProperty} onSuccess={closeEditPropertyModal} />
    </div>
  </div>
)}
    </div>
  );
};

export default withAuth(PropertyManagement, ["system-admin"], ["auth.view_permission", "ednant"]);
