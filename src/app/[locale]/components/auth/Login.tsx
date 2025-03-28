"use client"
import React from 'react'
import ThemeToggle from '@/app/[locale]/components/theme/theme-toggle'
import Language from '@/app/[locale]/components/language/Language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faLanguage,faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import Link from 'next/link'

export default function Login() {
      const t = useTranslations('full'); 
;

  return (
    <div className='relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center' style={{ backgroundImage: "url('/loginBack.png')" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className='absolute end-0 top-0 p-15'>
            <div className=' relative flex items-center gap-2 z-100 shadow-2xl'>
                    <Language/>
                </div>
      </div>
      <div className="relative z-10 bg-white/80 w-full max-w-[25rem] p-8 rounded-2xl shadow-2xl text-white ">
        <h2 className="text-center text-2xl mb-6 text-gray-700">{t("welcome")}</h2>
        <form className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="email"
              placeholder={t("email")}
         
              className="p-3 pl-10 w-full rounded-lg bg-gray-100 text-black focus:outline-none border border-gray-300"
              required
            />
            <div className="absolute left-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75-9.75-6.75"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder={t("password")}
            
              className="p-3 pl-10 w-full rounded-lg bg-gray-100 text-black focus:outline-none border border-gray-300"
              required
            />
            <div className="absolute left-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V7.125A4.125 4.125 0 0012.375 3h-.75A4.125 4.125 0 007.5 7.125V10.5m-3 0h13.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5z"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 

                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
               {t("remember-me")}
            </label>
            <Link href="#" className="text-blue-600 hover:underline">{t("forgot-password")}?</Link>
          </div>
            <div className="flex items-center w-full justify-center">
            <button
                        type="submit"
                        className="p-[0.7rem] w-full  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                     >
                        {t("login")}
                     </button>
            </div>
        
        </form>
      </div>
    </div>
  );
}