"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faMapMarkerAlt, 
  faCity, 
  faMoneyBillWave, 
  faBed, 
  faBath, 
  faTag,
  faImages,
  faChevronLeft,
  faChevronRight,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 

type PropertyImage = {
  id: number;
  description: string;
  property_image: string;
};

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
  property_pictures: PropertyImage[];
};

type PropertyDetailProps = {
  property: any;
};

const PropertyDetail = ({ property }: PropertyDetailProps) => {
  const locale = useLocale();  
  const t = useTranslations('full');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.property_pictures.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.property_pictures.length - 1 : prev - 1
    );
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setShowModal(true);
  };

  return (
    <div className='flex flex-col w-full p-4'>
      {/* Image Gallery Section */}
      {property.property_pictures?.length > 0 && (
        <div className='mb-8'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2'>
            <FontAwesomeIcon icon={faImages} />
            {t('property-images')}
          </h3>
          
       
          <div className='relative h-64 md:h-80 lg:h-96 w-full bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mb-4'>
            <img
              src={property.property_pictures[currentImageIndex].property_image}
              alt={property.property_pictures[currentImageIndex].description || 'Property image'}
              className='w-full h-full object-cover cursor-pointer'
              onClick={() => openImageModal(currentImageIndex)}
            />
            
            {property.property_pictures.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70'
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70'
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
            
           
            {property.property_pictures[currentImageIndex].description && (
              <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm'>
                {property.property_pictures[currentImageIndex].description}
              </div>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          <div className='grid grid-cols-4 gap-2'>
            {property.property_pictures.map((image:any, index:any) => (
              <div 
                key={image.id}
                className={`relative h-20 cursor-pointer overflow-hidden rounded-lg ${
                  currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image.property_image}
                  alt={image.description || `Thumbnail ${index + 1}`}
                  className='w-full h-full object-cover'
                />
                {image.description && (
                  <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate'>
                    {image.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Details */}
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

        {/* Management Info */}
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
                </div>
              )}
              
              {property.manager_id && (
                <div className='bg-gray-50 dark:bg-gray-700 p-4 rounded-md'>
                  <h4 className='font-medium mb-2'>{t('manager')}</h4>
                  <p>ID: {property.manager_id}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4'>
          <div className='relative max-w-4xl w-full'>
            <button
              onClick={() => setShowModal(false)}
              className='absolute top-4 right-4 z-10 bg-black size-8 rounded-full text-white text-2xl'
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            
            <img
              src={property.property_pictures[currentImageIndex].property_image}
              alt={property.property_pictures[currentImageIndex].description || 'Property image'}
              className='w-full max-h-[80vh] object-contain'
            />
            
            {property.property_pictures[currentImageIndex].description && (
              <div className='absolute bottom-4 left-4 right-4 bg-black/70 text-white p-3 rounded text-center'>
                {property.property_pictures[currentImageIndex].description}
              </div>
            )}
            
            {property.property_pictures.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black'
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  onClick={nextImage}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-3 rounded-full hover:bg-black'
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;