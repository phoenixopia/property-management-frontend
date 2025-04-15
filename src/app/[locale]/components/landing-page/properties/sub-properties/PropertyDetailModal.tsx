"use client"

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTextSlash, faTimes,faBuilding,faMoneyBillWave,faBed,faBath,faMapMarkerAlt,faRulerCombined,faCompress,faExpand } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';



const PropertyDetailModal = ({ property, onClose }: { property: any, onClose: () => void }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const nextImage = () => {
        setCurrentImageIndex(prev => 
            prev === property?.property_pictures.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex(prev => 
            prev === 0 ? property?.property_pictures.length - 1 : prev - 1
        );
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    return (
        <>
         
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={`bg-white rounded-lg shadow-xl ${isFullscreen ? 'w-full h-full max-w-none max-h-none' : 'max-w-4xl w-full max-h-[90vh]'} overflow-y-auto`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative">
                        <div className={`${isFullscreen ? "hidden":"block"}`}>
                        <button 
                            onClick={onClose}
                            className="absolute cursor-pointer top-4 right-4 bg-black/50 text-white rounded-full p-2 z-20 hover:bg-black/70"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        
                        </div>
                    
                        <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-6 p-6`}>
                          
                            <div className="space-y-4">
                              
                                <div className={`relative ${isFullscreen ? 'h-[80vh] ' : 'h-64 md:h-80'} rounded-lg overflow-hidden`}>
                                    <div 
                                        className="w-full h-full cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFullscreen();
                                        }}
                                    >
                                      
                                            <motion.img
                                                key={currentImageIndex}
                                                src={property?.property_pictures[currentImageIndex]?.property_image || "https://res.cloudinary.com/dxuvdtoqa/image/upload/v1744721661/null_kxkl0v.jpg"}
                                                alt="Property"
                                                className="w-full h-full object-contain"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                      
                                        <p className='absolute text-black text-sm'>{property?.property_pictures[currentImageIndex]?.description || ""}</p>
                                   
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFullscreen();
                                        }}
                                        className="absolute cursor-pointer top-4 left-4 bg-black/50 text-white rounded-full p-2 z-10 hover:bg-black/70"
                                    >
                                        <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
                                    </button>
                                    
                                 
                                    
                                  
                                    {property?.property_pictures.length > 1 && (
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-2 py-1 rounded-full z-10">
                                            {currentImageIndex + 1} / {property?.property_pictures.length}
                                        </div>
                                    )}
                                </div>
                                
                          
                                {!isFullscreen && property?.property_pictures.length > 1 && (
                                    <div className="flex gap-2 overflow-x-auto py-2">
                                        {property?.property_pictures.map((pic: any, index: number) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    goToImage(index);
                                                }}
                                                className={`flex-shrink-0 cursor-pointer w-16 h-16 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-[#285E67]' : 'border-transparent'}`}
                                            >
                                                <img
                                                    src={pic.property_image}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className=' absolute text-gray-800 text-xs font-bold'>
                                                    <p>{pic?.description?pic?.description:""}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                    
                            {!isFullscreen && (
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-800 ">
                                        Property Details
                                    </h2>
                                    <div className="space-y-2">

                                    <div className="flex items-center gap-2">
                                            {/* <FontAwesomeIcon icon={fa} className="text-gray-600 " /> */}
                                            <span className="text-gray-600 ">Name:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.name ? `${property?.name} Br` : "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-gray-600 " />
                                            <span className="text-gray-600 ">Rent:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.rent ? `${property?.rent} Br` : "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBed} className="text-gray-600 " />
                                            <span className="text-gray-600 ">Bedrooms:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.bed_rooms || "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBath} className="text-gray-600 " />
                                            <span className="text-gray-600 ">Bathrooms:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.bath_rooms || "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600 " />
                                            <span className="text-gray-600 ">Location:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.city}, {property?.address}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faRulerCombined} className="text-gray-600 " />
                                            <span className="text-gray-600 ">Size:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.size || "-"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBuilding} className="text-gray-600 " />
                                            <span className="text-gray-600 ">Type:</span>
                                            <span className="font-medium text-gray-800 ">
                                                {property?.property_type || "-"}
                                            </span>
                                        </div>
                                    </div>
                                  <hr className="h-px  bg-gray-200 border-0" />

                                    <div className="pt-4">
                                        {/* <h3 className="text-lg font-semibold text-gray-800  mb-2">Description</h3> */}
                                        <p className="text-gray-600 ">
                                        To arrange a viewing or rental inquiry, please contact our support team.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default PropertyDetailModal;