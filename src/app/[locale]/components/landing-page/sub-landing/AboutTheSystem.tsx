"use client";
import React from 'react';
import { motion } from 'framer-motion';

const AboutTheSystem = () => {

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
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

  const featureCards = [
    {
      title: "Secure Owner Portal",
      description: "Access your dedicated property management dashboard with provider-issued credentials",
      icon: (
        <svg className="w-10 h-10 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="32" className="fill-[#285E67]" />
          <path d="M32 40V24M24 32H40" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 24H20C18.8954 24 18 24.8954 18 26V38C18 39.1046 18.8954 40 20 40H44C45.1046 40 46 39.1046 46 38V26C46 24.8954 45.1046 24 44 24Z" 
                stroke="#1e4a52" strokeWidth="2" fill="none" />
          <path d="M32 24V20C32 17.7909 30.2091 16 28 16H24C21.7909 16 20 17.7909 20 20V24" 
                stroke="#1e4a52" strokeWidth="2" fill="none" />
        </svg>
      )
    },
    {
      title: "Portfolio Configuration",
      description: "Set up property groups, management teams, and customized reporting views",
      icon: (
        <svg className="w-10 h-10 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="32" className="fill-[#285E67]" />
          <path d="M22 22H42V42H22V22Z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M22 26H42" stroke="#1e4a52" strokeWidth="2" />
          <path d="M26 26V42" stroke="#1e4a52" strokeWidth="2" />
          <path d="M30 30H36" stroke="white" strokeWidth="2" />
          <path d="M30 34H36" stroke="white" strokeWidth="2" />
          <path d="M30 38H36" stroke="white" strokeWidth="2" />
          <circle cx="28" cy="32" r="1" fill="white" />
          <circle cx="28" cy="36" r="1" fill="white" />
          <circle cx="28" cy="40" r="1" fill="white" />
        </svg>
      )
    },
    {
      title: "Property Onboarding",
      description: "Add properties, tenants, and lease details to start comprehensive management",
      icon: (
        <svg className="w-10 h-10 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="32" className="fill-[#285E67]" />
          <path d="M24 24L40 24L40 40L24 40L24 24Z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M28 28L36 28" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 32L36 32" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 36L36 36" stroke="#1e4a52" strokeWidth="2" />
          <path d="M32 24V16" stroke="#1e4a52" strokeWidth="2" />
          <path d="M20 40L16 44" stroke="#1e4a52" strokeWidth="2" />
          <path d="M44 40L48 44" stroke="#1e4a52" strokeWidth="2" />
          <circle cx="32" cy="20" r="2" fill="#1e4a52" />
        </svg>
      )
    },
    {
      title: "Property Onboarding",
      description: "Add properties, tenants, and lease details to start comprehensive management",
      icon: (
        <svg className="w-10 h-10 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="32" className="fill-[#285E67]" />
          <path d="M24 24L40 24L40 40L24 40L24 24Z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M28 28L36 28" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 32L36 32" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 36L36 36" stroke="#1e4a52" strokeWidth="2" />
          <path d="M32 24V16" stroke="#1e4a52" strokeWidth="2" />
          <path d="M20 40L16 44" stroke="#1e4a52" strokeWidth="2" />
          <path d="M44 40L48 44" stroke="#1e4a52" strokeWidth="2" />
          <circle cx="32" cy="20" r="2" fill="#1e4a52" />
        </svg>
      )
    },
    {
      title: "Property Onboarding",
      description: "Add properties, tenants, and lease details to start comprehensive management",
      icon: (
        <svg className="w-10 h-10 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="32" className="fill-[#285E67]" />
          <path d="M24 24L40 24L40 40L24 40L24 24Z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M28 28L36 28" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 32L36 32" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 36L36 36" stroke="#1e4a52" strokeWidth="2" />
          <path d="M32 24V16" stroke="#1e4a52" strokeWidth="2" />
          <path d="M20 40L16 44" stroke="#1e4a52" strokeWidth="2" />
          <path d="M44 40L48 44" stroke="#1e4a52" strokeWidth="2" />
          <circle cx="32" cy="20" r="2" fill="#1e4a52" />
        </svg>
      )
    },
    {
      title: "Property Onboarding",
      description: "Add properties, tenants, and lease details to start comprehensive management",
      icon: (
        <svg className="w-10 h-10 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="32" className="fill-[#285E67]" />
          <path d="M24 24L40 24L40 40L24 40L24 24Z" stroke="white" strokeWidth="2" fill="none" />
          <path d="M28 28L36 28" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 32L36 32" stroke="#1e4a52" strokeWidth="2" />
          <path d="M28 36L36 36" stroke="#1e4a52" strokeWidth="2" />
          <path d="M32 24V16" stroke="#1e4a52" strokeWidth="2" />
          <path d="M20 40L16 44" stroke="#1e4a52" strokeWidth="2" />
          <path d="M44 40L48 44" stroke="#1e4a52" strokeWidth="2" />
          <circle cx="32" cy="20" r="2" fill="#1e4a52" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative">
      {/* <div className="absolute inset-0  bg-gray-100 pointer-events-none" aria-hidden="true"></div> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">About The System Feature</h2>
          
          </motion.div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
             {featureCards.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col items-center p-6 h-48  duration-300"
                // whileHover={{ y: -5 }}
              >
                <div className='flex flex-row items-center'>
                {feature.icon}
                <h4 className="text-lg font-bold leading-snug tracking-tight mb-1 text-gray-900 text-center">
                  {feature.title}
                </h4>
                </div>
              
                <p className="text-gray-600 text-center text-sm ">
                  {feature.description}
                </p>
              </motion.div>
            ))}


          </div>

 
        </div>
      </div>
    </section>
  );
};

export default AboutTheSystem;