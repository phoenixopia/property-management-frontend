"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt, faCity, faMoneyBillWave, faBed, faBath, faTag } from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
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
  created_at: string;
  updated_at: string;
  owner_id: number | null;
  manager_id: number | null;
 
};
type PropertyDetailProps = {
  property: any;
};

const PropertyDetail = ({ property }: PropertyDetailProps) => {
  const locale = useLocale();  
  const t = useTranslations('full'); 

  return (
    <div className='flex flex-col w-full p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 dark:text-white text-sm'>
        {/* Property Basic Info */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
            {t('property-information')}
          </h3>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faHome} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('name')}:</strong> {property.name}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faTag} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('type')}:</strong> {property.property_type}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('address')}:</strong> {property.address}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faCity} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('city')}:</strong> {property.city}, {property.state}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <span className='w-4'></span>
            <span><strong>{t('zip-code')}:</strong> {property.zip_code}</span>
          </div>
        </div>

        {/* Property Specifications */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4'>
            {t('specifications')}
          </h3>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faMoneyBillWave} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('price')}:</strong> {property.price.toLocaleString()}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faMoneyBillWave} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('rent')}:</strong> {property.rent.toLocaleString()}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faBed} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('bedrooms')}:</strong> {property.bed_rooms}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <FontAwesomeIcon icon={faBath} className='text-gray-500 dark:text-gray-300' />
            <span><strong>{t('bathrooms')}:</strong> {property.bath_rooms}</span>
          </div>
          
          <div className='flex items-center gap-3'>
            <span className='w-4'></span>
            <span><strong>{t('status')}:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                property.status === 'occupied' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                {property.status}
              </span>
            </span>
          </div>
        </div>

        {/* Owner/Manager Info (if available) */}
        {(property.owner_id || property.manager_id) && (
          <div className='md:col-span-2 space-y-4 pt-4 border-t dark:border-gray-600'>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
              {t('management')}
            </h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {property.owner_id && (
                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-md'>
                  <h4 className='font-medium mb-2'>{t('owner')}</h4>
                  <p>ID: {property.owner_id}</p>
                  {/* You would typically fetch owner details here */}
                </div>
              )}
              
              {property.manager_id && (
                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-md'>
                  <h4 className='font-medium mb-2'>{t('manager')}</h4>
                  <p>ID: {property.manager_id}</p>
                  {/* You would typically fetch manager details here */}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetail;