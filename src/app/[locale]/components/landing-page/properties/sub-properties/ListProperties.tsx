"use client"

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { faBath, faBed, faFilter } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl'; 
import { getAllPropertiesForUsers } from '@/actions/propertyManagmentAction';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyDetailModal from './PropertyDetailModal';
type Property = {
    id: string;
    rent: number;
    bed_rooms: number;
    bath_rooms: number;
    property_pictures: Array<{ property_image: string }>;
};

const ListProperties = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const t = useTranslations('full');
    const [minRent, setMinRent] = useState<string>("");
    const [maxRent, setMaxRent] = useState<string>("");
    const [showFilters, setShowFilters] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState({
        minRent: "",
        maxRent: ""
    });
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const { data: propertiesData, isPending, isError, isSuccess } = useQuery({
        queryKey: ["getAllProperties", currentPage, appliedFilters],
        queryFn: () => getAllPropertiesForUsers(
            currentPage, 
            appliedFilters.minRent, 
            appliedFilters.maxRent
        ),
    });

    const propertiesList = propertiesData?.data || [];
    const total_pages = propertiesData?.total_pages || 0;
    const previous = propertiesData?.previous || false;
    const next = propertiesData?.next || false;
    const count = propertiesData?.count || 0;

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAppliedFilters({
            minRent,
            maxRent
        });
        setCurrentPage(1);
    };

    const clearFilters = () => {
        setMinRent("");
        setMaxRent("");
        setAppliedFilters({
            minRent: "",
            maxRent: ""
        });
        setCurrentPage(1);
    };

    const handlePropertyClick = (property: Property) => {
        setSelectedProperty(property);
    };

    const closeModal = () => {
        setSelectedProperty(null);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    const filterVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' }
    };
    console.log(propertiesList,'li')

    return (
        <div className='flex flex-col justify-between max-w-7xl mx-auto'>
            <div className='flex justify-start mb-4'>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFilters(!showFilters)}
                    className='px-4 py-2 text-sm bg-[#285E67] cursor-pointer text-white rounded-md flex items-center gap-2 shadow-md'
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {t('filters')}
                </motion.button>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={filterVariants}
                        transition={{ duration: 0.5 }}
                        className='bg-white p-4 rounded-md shadow-sm mb-4 dark:bg-gray-700 overflow-hidden'
                    >
                        <form onSubmit={handleFilterSubmit} className='flex flex-col sm:flex-row gap-4 items-end'>
                            <div className='w-full sm:w-auto'>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                                    {t('min-rent')}
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type='number'
                                    value={minRent}
                                    onChange={(e) => setMinRent(e.target.value)}
                                    placeholder="min."
                                    className='p-2 text-sm text-gray-800 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#285E67]'
                                />
                            </div>
                            <div className='w-full sm:w-auto'>
                                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
                                    {t('max-rent')}
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type='number'
                                    value={maxRent}
                                    onChange={(e) => setMaxRent(e.target.value)}
                                    placeholder="max."
                                    className='p-2 border text-sm text-gray-800 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#285E67]'
                                />
                            </div>
                            <div className='flex gap-2 w-full sm:w-auto'>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type='submit'
                                    className='px-4 text-sm py-2 bg-[#285E67] text-white rounded-md shadow-md'
                                >
                                    {t('apply-filters')}
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type='button'
                                    onClick={clearFilters}
                                    className='px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 shadow-md'
                                >
                                    {t('clear')}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className='py-5'>
                {isPending ? (
                    <div className='flex justify-center items-center h-64'>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className='w-10 h-10 border-4 border-[#285E67] border-t-transparent rounded-full'
                        />
                    </div>
                ) : isError ? (
                    <div className='px-6 py-4 text-center text-red-500'>
                        {t("something went wrong please try again later")}!
                    </div>
                ) : propertiesList?.length === 0 && isSuccess ? (
                    <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                        {t('nothing-to-show')}
                    </div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 py-4'
                    >
                        <AnimatePresence>
                            {propertiesList?.map((property: any) => (
                                <motion.div 
                                    key={property?.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                    className='flex flex-col shadow-lg cursor-pointer rounded-md overflow-hidden border  transition-all duration-300 hover:shadow-xl'
                                    onClick={() => handlePropertyClick(property)}
                                >
                                    <div className='relative'>
                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className='absolute p-2 bg-black/80 text-white rounded-br-md'
                                        >
                                            {property?.rent ? property?.rent + " Br" : "-"}
                                        </motion.p>
                                        <img
                                            src={`${property?.property_pictures[0]?.property_image ? property?.property_pictures[0]?.property_image : "https://res.cloudinary.com/dxuvdtoqa/image/upload/v1744721661/null_kxkl0v.jpg"}`}
                                            alt='property'
                                            className="w-full h-[16rem] object-cover"
                                        />
                                    </div>
                                    <div className='flex flex-row justify-between text-sm text-gray-600 dark:text-gray-300 p-3 bg-white dark:bg-gray-700'>
                                        <div className='flex flex-row gap-2'>
                                            <p className='truncate max-w-[3rem]'>
                                                <FontAwesomeIcon icon={faBed} className='mr-1' /> 
                                                {property?.bed_rooms ? property?.bed_rooms : "-"}
                                            </p>
                                            <p>|</p>
                                            <p className='truncate max-w-[3rem]'>
                                                <FontAwesomeIcon icon={faBath} className='mr-1' /> 
                                                {property?.bath_rooms ? property?.bath_rooms : "-"}
                                            </p>
                                        </div>
                                        <p className='truncate max-w-[10rem]'>
                                            {property?.city?property?.city:"-"},{property?.address?property?.address:"-"}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm rounded-md'
                >
                    <div>
                        <p className='text-gray-600 dark:text-gray-200'>
                            {t('showing-entries', { shown: propertiesList.length, total: count })}
                        </p>
                    </div>
                    <div className='flex items-center justify-center gap-x-2'>
                        <motion.button 
                            whileHover={{ scale: !previous ? 1 : 1.05 }}
                            whileTap={{ scale: !previous ? 1 : 0.95 }}
                            className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-md ${
                                !previous && "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!previous}
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            {t("previous")}
                        </motion.button>
                        <motion.p 
                            whileHover={{ scale: 1.1 }}
                            className='p-1 px-4 bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-800 rounded-md'
                        >
                            {currentPage}
                        </motion.p>
                        <motion.button
                            whileHover={{ scale: !next ? 1 : 1.05 }}
                            whileTap={{ scale: !next ? 1 : 0.95 }}
                            className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-md ${
                                !next && "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!next}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            {t("next")}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProperty && (
                    <PropertyDetailModal 
                        property={selectedProperty} 
                        onClose={closeModal} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};


export default ListProperties;