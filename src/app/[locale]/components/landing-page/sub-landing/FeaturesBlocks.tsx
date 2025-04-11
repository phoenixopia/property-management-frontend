"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

const FeaturesBlocks = () => {
  // Animation variants
    const t = useTranslations("full");
  
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
      title: t("Secure Owner Portal"),
      description:t("Access your dedicated property management dashboard with provider-issued credentials"),
      icon: (
        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
      title: t("Portfolio Configuration"),
      description: t("Set up property groups, management teams, and customized reporting views"),
      icon: (
        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
      title: t("Property Onboarding"),
      description: t("Add properties, tenants, and lease details to start comprehensive management"),
      icon: (
        <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-50 pointer-events-none" aria-hidden="true"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("Streamline Your Property Management")}</h2>
            <p className="text-xl text-gray-600">{t("Get started in just three simple steps")}</p>
          </motion.div>

          <motion.div 
            className="max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {featureCards.map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="relative flex flex-col items-center p-6 h-48 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                {feature.icon}
                <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-gray-900 text-center">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-center text-sm md:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-500 text-sm">
            {t("Already have an account")}?{' '}
              <a href="/login" className="text-[#285E67] hover:text-[#1e4a52] font-medium transition-colors">
                {t("Sign in to your dashboard")}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesBlocks;