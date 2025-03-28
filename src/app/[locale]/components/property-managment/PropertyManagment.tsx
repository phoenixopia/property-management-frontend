"use client"
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileExport, faPen, faTrash, faEye,faMagnifyingGlass,faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import propertyData from '../../../../propertyData.json';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import AddPropertyForm from '../forms/propertyManagment/AddPropertyForm';
import EditUserForm from '../forms/userManagment/EditUserForm';
import PropertyDetail from './property-detail/PropertyDetail';
type propertyData={
    id: string;
    ownerName:string,
    managerName:string,
    leaseId:string,
    status:string
  };
const PropertyManagement = () => {
    const[addProperty,setPropertyModal]=useState(false);
    const[openLeaseDetail,setOpenLeaseDetail]=useState(false);
    const[editUser,setEditUser]=useState(false);
    const[propertyDetail,setPropertyDetail]=useState(false);


    const [property, setProperty] = useState<propertyData[]>([]); 
      const locale = useLocale();  
      const t = useTranslations('full'); 

      const openaddPropertyModal =()=>{
        setPropertyModal(true);
      }
      const openEditUserModal =()=>{
        setPropertyModal(false);
        setEditUser(true);
      }
      const closeEditUserPage =()=>{
        setPropertyModal(false);
        setEditUser(false);
      }
      const closeaddPropertyPage =()=>{
        setPropertyModal(false);
        setEditUser(false);
      }
   const showLeaseDetail=()=>{
    setOpenLeaseDetail(true)
   }
   const closeLeaseDetail=()=>{
    setOpenLeaseDetail(false)
   }
   const openPropertyDetail=()=>{
    setPropertyDetail(true)
   }

   const closePropertyDetail=()=>{
    setPropertyDetail(false);
   }

  useEffect(() => {
    setProperty(propertyData);
  }, []);

  return (
    <div className='flex flex-col justify-between p-4'>
      <div className='flex items-center flex-col xl:flex-row  justify-between w-full gap-5 xl:gap-0'>





        <div className='flex justify-end gap-2'>
          <button   onClick={openaddPropertyModal} className='flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white'>
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
                <th className='px-6 py-3'>{t('owner-name')}</th>
                <th className='px-6 py-3'>{t('manager-name')}</th>
                <th className='px-6 py-3'>{t('lease-id')}</th>
                <th className='px-6 py-3'>{t('status')}</th>      
                <th className='px-6 py-3'>{t('action')}</th>                

              </tr>
            </thead>
            <tbody>
              {property.map((prop) => (
                <tr key={prop.id}  className=' bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200'>
                  <td className='px-6 py-4'>{prop?.id}</td>
                  <td className='px-6 py-4'>{prop?.ownerName}</td>
                  <td className='px-6 py-4'>{prop?.managerName}</td>
                  <td onClick={showLeaseDetail}  className='cursor-pointer px-6 py-4'>{prop?.leaseId}</td>
                  <td className='px-6 py-4'>{prop?.status}</td>
            

                  <td className='flex flex-row px-6 py-4 space-x-4 items-center'>
                    <button onClick={openEditUserModal} >
                     <FontAwesomeIcon  icon={faPen} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                    </button>
                    <FontAwesomeIcon icon={faTrash} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
                    <FontAwesomeIcon icon={faEye} onClick={openPropertyDetail} className='text-dark dark:text-gray-200 text-sm cursor-pointer' />
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
                    {t("edit-property")}
                </h3>
                <button onClick={closeEditUserPage}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <AddPropertyForm/>
          </div>
        </div>
      )}
    {openLeaseDetail && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-3xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("lease-detail")}
                </h3>
                <button onClick={closeLeaseDetail}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
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

{propertyDetail && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-md'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("property-detail")}
                </h3>
                <button onClick={closePropertyDetail}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <PropertyDetail/>
          </div>
        </div>
      )}


      {addProperty && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white  dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-md'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-white ">
                    {t("add-property")}
                </h3>
                <button onClick={closeaddPropertyPage}  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            {/* <ClientForm client={selectedClient} /> */}
            <AddPropertyForm/>
          </div>
        </div>
      )}

    </div>
  );
};

export default PropertyManagement;
