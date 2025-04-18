"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

const Top = () => {
    const t = useTranslations("full");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        delay: 0.5
      }
    }
  };

  return (
    <div className="relative">
          <div className="absolute  inset-0 2xl:top-1/10 2xl:bottom-1/10  bg-[url(/tech-back.jpg)] bg-no-repeat bg-cover " aria-hidden="true"></div>
          <div className="absolute  inset-0 2xl:top-1/10 2xl:bottom-1/10 bg-white/80 bg-no-repeat bg-cover " aria-hidden="true"></div>

  <motion.div 
      className='max-w-7xl mx-auto relative'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} 
      variants={containerVariants}
    >
       

      <div className='grid grid-cols-1 md:grid-cols-2 items-center p-6 md:p-10 gap-8'>
        <motion.div 
          className='flex flex-col gap-6 md:gap-8 py-4'
          variants={containerVariants}
        >
          <motion.p 
            className='text-gray-900 text-3xl md:text-4xl font-extrabold'
            variants={itemVariants}
          >
            {t('Property Management')}
            
          </motion.p>
          
          <motion.div
            className='text-gray-600 text-base md:text-lg'
            variants={itemVariants}
          >
            {t("Our all in one system streamlines every aspect of property management")}:
            <ul className='mt-4 space-y-2'>
              <motion.li className='flex items-start' variants={itemVariants}>
                <span className='text-[#285E67] mr-2'>✓</span>
                {t("Instant maintenance request tracking")}
                
              </motion.li>
              <motion.li className='flex items-start' variants={itemVariants}>
                <span className='text-[#285E67] mr-2'>✓</span>
                {t("Automated tenant communication")}
                
              </motion.li>
              <motion.li className='flex items-start' variants={itemVariants}>
                <span className='text-[#285E67] mr-2'>✓</span>
                {t("Digital lease management")}
              </motion.li>
              <motion.li className='flex items-start' variants={itemVariants}>
                <span className='text-[#285E67] mr-2'>✓</span>
                {t("Real-time financial reporting")}
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          variants={imageVariants}
          className='order-first md:order-last'
        >
          <Image
            src="/finpa.png"
            width={1500}
            height={1500}
            alt="Property management illustration"
            className='w-full h-auto object-contain'
            priority
          />
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
};

export default Top;