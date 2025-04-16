"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { faUser, faBars, faTimes, faGauge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Language from '../../language/Language';
import { useTranslations } from "next-intl";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations("full");

  const handleDashboardClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.groups?.includes('system-admin')) {
      router.push('/dashboard');
    } else if (user.groups?.includes('property-manager')) {
      router.push('/dashboard');
    } else if (user.groups?.includes('tenant')) {
      router.push('/tenant/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300
      }
    })
  };

  return (
    <header className="fixed w-full z-30 bg-white md:bg-opacity-90 transition duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex text-black items-center justify-between h-16 md:h-20">
       
          <motion.div 
            className="flex-shrink-0 items-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
        <Link href="/" className='cursor-pointer'>

              <img
                src="/pms_logo.png"
                alt="Profile"
                className="xl:w-18 xl:h-18 w-16 h-16 rounded-full object-cover"
              />
              </Link>
          </motion.div>

          <nav className="hidden md:flex ">
            <ul className="flex gap-6 flex-grow justify-end items-center">
            <motion.li
           
           initial="hidden"
           animate="visible"
         
           variants={{
             hidden: { opacity: 0, y: -10 },
             visible: {
               opacity: 1,
               y: 0,
               transition: { delay:  0.1 }
             }
           }}
           className="hover:text-[#285E67] transition duration-200"
         >
        <Language/>
         </motion.li>
            <motion.li
                 
                  initial="hidden"
                  animate="visible"
                  
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay:  0.1 }
                    
                    }
                  }}
                  className="hover:text-[#285E67] transition duration-200"
                >
                  <Link href="/" className='cursor-pointer'>
                    {t('home')}
                  </Link>
                </motion.li>

                <motion.li
           
           initial="hidden"
           animate="visible"
         
           variants={{
             hidden: { opacity: 0, y: -10 },
             visible: {
               opacity: 1,
               y: 0,
               transition: { delay:  0.1 }
             }
           }}
           className="hover:text-[#285E67] transition duration-200"
         >
           {/* <Link href='/about-us'>
              About Us
           </Link> */}
         </motion.li>
         <motion.li
           
           initial="hidden"
           animate="visible"
         
           variants={{
             hidden: { opacity: 0, y: -10 },
             visible: {
               opacity: 1,
               y: 0,
               transition: { delay:  0.1 }
             }
           }}
           className="hover:text-[#285E67] transition duration-200"
         >
           <Link href='/properties' className='capitalize'>
       
           {t('properties')}

           </Link>
         </motion.li>
                
                <motion.li
           
                  initial="hidden"
                  animate="visible"
                
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay:  0.1 }
                    }
                  }}
                  className="hover:text-[#285E67] transition duration-200"
                >
                  <Link href='/contact-us'>
                      {t('contact-us')}
                  </Link>
                </motion.li>
           

    
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {user?.groups && user.groups.length > 0 ? (
                  <motion.button 
                    type="button" 
                    onClick={handleDashboardClick}
                    className="flex items-center gap-2  cursor-pointer  rounded-lg bg-[#285E67] px-4 py-2 text-white hover:bg-[#1e4a52] transition duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faGauge} className="text-sm" />
                    <span>{t('dashboard')}</span>
                  </motion.button>
                ) : (
                  <motion.button 
                    type="button" 
                    onClick={handleLoginClick}
                    className="flex items-center gap-2 cursor-pointer rounded-lg bg-[#285E67] px-4 py-2 text-white hover:bg-[#1e4a52] transition duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faUser} className="text-sm " />
                    <span>{t('login')}</span>
                  </motion.button>
                )}
              </motion.li>
              {user && user.groups && user.groups.length > 0 && (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-gray-600"
                >
                  {`(${user.groups[0]})`}
                </motion.li>
              )}
            </ul>
          </nav>

          <motion.div 
            className="md:hidden flex items-center"
            whileTap={{ scale: 0.9 }}
          >
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-[#285E67] focus:outline-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
            <motion.div
             
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <Link 
                    href="/"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('home')}
                  </Link>
                </motion.div>
                {/* <motion.div
             
             initial="hidden"
             animate="visible"
             variants={menuItemVariants}
           >
             <Link 
               href="/about"
               className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50"
               onClick={() => setMobileMenuOpen(false)}
             >
               About
             </Link>
           </motion.div> */}

           <motion.div
             
             initial="hidden"
             animate="visible"
             variants={menuItemVariants}
           >
              <Link 
               href="/properties"
               className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50"
               onClick={() => setMobileMenuOpen(false)}
             >
               Properties
             </Link>
             <Link 
               href="/contact-us"
               className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-50"
               onClick={() => setMobileMenuOpen(false)}
             >
               {t('contact-us')}
             </Link>
             <motion.div
                  custom={3.5}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                  className="text-sm text-gray-600 px-3 py-2 max-w-[12rem]"
                >
                 <Language />
                </motion.div>   
           </motion.div>
              {user && user.groups && user.groups.length > 0 && (
                <motion.div
                  custom={3.5}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                  className="text-sm text-gray-600 px-3 py-2"
                >
                  {`Role: ${user.groups[0]}`}
                </motion.div>
              )}
              <motion.div
                custom={4}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
              >
                <motion.button
                  type="button"
                  onClick={user?.groups?.length ? handleDashboardClick : handleLoginClick}
                  className="w-full  flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-[#285E67] px-4 py-2 text-white mt-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={user?.groups?.length ? faGauge : faUser} className="text-sm" />
                  <span>{user?.groups?.length ? t('dashboard') : t('login')}</span>
                </motion.button>
              </motion.div>
              
            </div>
          </motion.div>
          
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;