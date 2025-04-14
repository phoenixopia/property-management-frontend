"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from "next-intl";

const GetInTouch = () => {
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
      title: t("phone"),
      description: ["+251968999955","+251968999900"],
      icon: (
        <svg className="w-15 h-15 p-1 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
               
                    <path d="M24.6094 0C35.8682 0 45 9.13183 45 20.3906C45 21.5596 44.0596 22.5 42.8906 22.5C41.7217 22.5 40.7812 21.5596 40.7812 20.3906C40.7812 11.4609 33.5391 4.21875 24.6094 4.21875C23.4404 4.21875 22.5 3.27832 22.5 2.10938C22.5 0.94043 23.4404 0 24.6094 0ZM25.3125 16.875C26.0584 16.875 26.7738 17.1713 27.3012 17.6988C27.8287 18.2262 28.125 18.9416 28.125 19.6875C28.125 20.4334 27.8287 21.1488 27.3012 21.6762C26.7738 22.2037 26.0584 22.5 25.3125 22.5C24.5666 22.5 23.8512 22.2037 23.3238 21.6762C22.7963 21.1488 22.5 20.4334 22.5 19.6875C22.5 18.9416 22.7963 18.2262 23.3238 17.6988C23.8512 17.1713 24.5666 16.875 25.3125 16.875ZM22.5 10.5469C22.5 9.37793 23.4404 8.4375 24.6094 8.4375C31.21 8.4375 36.5625 13.79 36.5625 20.3906C36.5625 21.5596 35.6221 22.5 34.4531 22.5C33.2842 22.5 32.3438 21.5596 32.3438 20.3906C32.3438 16.1191 28.8809 12.6562 24.6094 12.6562C23.4404 12.6562 22.5 11.7158 22.5 10.5469ZM28.916 25.1982C29.9092 23.9854 31.5791 23.5723 33.0205 24.1963L42.8643 28.415C44.4111 29.0742 45.2725 30.7441 44.9209 32.3789L42.8115 42.2227C42.46 43.8398 41.0273 45 39.375 45C38.8389 45 38.3027 44.9912 37.7754 44.9648H37.7666C36.8877 44.9297 36.0264 44.8682 35.165 44.7715C15.3984 42.6797 0 25.9453 0 5.625C0 3.96387 1.16016 2.53125 2.77734 2.18848L12.6211 
                    0.0791016C14.2646 -0.272461 15.9258 0.588867 16.585 2.13574L20.8037 11.9795C21.4189 13.4209 21.0146 15.0908 19.8018 16.084L16.2334 19.002C18.5801 23.0449 21.9551 26.4199 25.998 28.7666L28.916 25.1982ZM40.6758 32.0625L31.8516 28.2832L29.2676 31.4297C27.958 33.0293 25.6816 33.4424 23.8887 32.4053C19.2041 29.6895 15.3018 25.7871 12.5859 21.1025C11.5488 19.3096 11.9619 17.0332 13.5615 15.7236L16.7168 13.1396L12.9375 4.31543L4.22754 6.19629C4.52637 25.1543 19.8457 40.4736 38.8037 40.7812L40.6758 32.0625Z" fill="#285E67"/>
        </svg>
      )
    },
    {
      title: t("email"),
      description: ["info@phoenixopia.com"],
      icon: (
        <svg className="w-15 h-15 p-1 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
               
                    <g clipPath="url(#clip0_0_165)">
                    <path d="M34.4531 4.21875H10.5469C10.1602 4.21875 9.84375 4.53516 9.84375 4.92188V19.793L6.08203 16.708C5.93262 16.585 5.7832 16.4795 5.625 16.374V4.92188C5.625 2.20605 7.83105 0 10.5469 0H34.4531C37.1689 0 39.375 2.20605 39.375 4.92188V16.3652C39.2168 16.4707 39.0674 16.585 38.918 16.6992L35.1562 19.793V4.92188C35.1562 4.53516 34.8398 4.21875 34.4531 4.21875ZM14.0625 10.5469C14.0625 9.37793 15.0029 8.4375 16.1719 8.4375H28.8281C29.9971 8.4375 30.9375 9.37793 30.9375 10.5469C30.9375 11.7158 29.9971 12.6562 28.8281 12.6562H16.1719C15.0029 12.6562 14.0625 11.7158 14.0625 10.5469ZM14.0625 17.5781C14.0625 16.4092 15.0029 15.4688 16.1719 15.4688H28.8281C29.9971 15.4688 30.9375 16.4092 30.9375 17.5781C30.9375 18.7471 29.9971 19.6875 28.8281 19.6875H16.1719C15.0029 19.6875 14.0625 18.7471 14.0625 17.5781ZM4.21875 24.2754V40.0781C4.21875 40.4648 4.53516 40.7812 4.92188 40.7812H40.0781C40.4648 40.7812 40.7812 40.4648 40.7812 40.0781V24.2754L28.3008 34.5234C24.9258 37.292 20.0654 37.292 16.6992 34.5234L4.21875 24.2754ZM0 20.9092C0 19.459 1.17773 18.2812 2.62793 18.2812C3.23438 18.2812 3.82324 18.4922 4.29785 18.8789L19.3799 31.2715C21.1992 32.7656 23.8096 32.7656 25.6289 31.2715L40.7109 18.8789C41.1768 18.4922 41.7744 18.2812 42.3809 18.2812C43.8311 18.2812 45.0088 19.459 45.0088 20.9092L45 40.0781C45 42.7939 42.7939 45 40.0781 45H4.92188C2.20605 45 0 42.7939 0 40.0781V20.9092Z" fill="#285E67"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_0_165">
                    <rect width="45" height="45" fill="white"/>
                    </clipPath>
                    </defs>
          

        </svg>
      )
    },
    {
      title: t("address"),
      description: ["2R92+G3, Megenagna, Wereda 05, Bole subcity, Addis Ababa, Ethiopia"],
      icon: (
        <svg className="w-15 h-15 p-1 " viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 16.875C35 9.8877 28.2812 4.21875 20 4.21875C11.7188 4.21875 5 9.8877 5 16.875C5 17.9648 5.46875 19.6523 6.59375 21.9023C7.6875 24.082 9.23958 26.4902 11.0208 28.9248C13.9896 32.9854 17.4271 36.9053 20 39.7002C22.5833 36.9053 26.0208 32.9854 28.9792 28.9248C30.7604 26.4902 32.3125 24.082 33.4062 21.9023C34.5312 19.6523 35 17.9648 35 16.875ZM40 16.875C40 24.5566 27.8125 38.2324 22.4688 43.875C21.1875 45.2197 18.8125 45.2197 17.5312 43.875C12.1875 38.2324 0 24.5566 0 16.875C0 7.55859 8.95833 0 20 0C31.0417 0 40 7.55859 40 16.875ZM23.3333 16.875C23.3333 16.1291 22.9821 15.4137 22.357 14.8863C21.7319 14.3588 20.8841 14.0625 20 14.0625C19.1159 14.0625 18.2681 14.3588 17.643 14.8863C17.0179 15.4137 16.6667 16.1291 16.6667 16.875C16.6667 17.6209 17.0179 18.3363 17.643 18.8637C18.2681 19.3912 19.1159 19.6875 20 19.6875C20.8841 19.6875 21.7319 19.3912 22.357 18.8637C22.9821 18.3363 23.3333 17.6209 23.3333 16.875ZM11.6667 16.875C11.6667 15.0102 12.5446 13.2218 14.1074 11.9032C15.6702 10.5845 17.7899 9.84375 20 9.84375C22.2101 9.84375 24.3298 10.5845 25.8926 11.9032C27.4554 13.2218 28.3333 15.0102 28.3333 16.875C28.3333 18.7398 27.4554 20.5282 25.8926 21.8468C24.3298 23.1655 22.2101 23.9062 20 23.9062C17.7899 23.9062 15.6702 23.1655 14.1074 21.8468C12.5446 20.5282 11.6667 18.7398 11.6667 16.875Z" fill="#285E67"/>

        </svg>
     
        
      )
    }
  ];

  return (
    <section className="relative">
       <div className="absolute  inset-0 2xl:top-1/10 2xl:bottom-1/10  bg-[url(/tech-back.jpg)] bg-no-repeat bg-cover " aria-hidden="true"></div>
          <div className="absolute  inset-0 2xl:top-1/10 2xl:bottom-1/10 bg-white/80 bg-no-repeat bg-cover " aria-hidden="true"></div>


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <motion.div 
            className="max-w-3xl mx-auto text-center pb-12 md:pb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
       
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{t("Get In Touch")}</h2>
          
          </motion.div>

          <motion.div      initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
       
            transition={{ duration: 0.6 }} className='flex w-full items-center justify-center text-black '>
            <p>{t("Our support team is available Monday to Friday, 9 AM to 6 PM (GMT); We're here to help you manage your properties with ease!")}</p>
           </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 gap-24'>
             {featureCards.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-row items-center p-4 justify-center bg-gray-50   duration-300 shadow-xl"
                // whileHover={{ y: -5 }}
              >
                <div className='flex mt-4 flex-col items-center justify-center'>

                {feature.icon}

                </div>
                <div className='flex flex-col items-center justify-center'>
                <p className="text-lg font-bold leading-snug tracking-tight  text-gray-900 text-center">
                  {feature.title}
                </p>
                
               

                  {feature.description.map((desc)=>(
                  <p key={desc} className="text-gray-600 text-center text-sm ">{desc}</p>
                  ))}
              
                </div>
              
              </motion.div>
            ))}


          </div>

        </div>
      </div>


    </section>
  );
};

export default GetInTouch;