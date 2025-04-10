"use client"
import {useEffect,useState} from 'react'
import ThemeToggle from '@/app/[locale]/components/theme/theme-toggle'
import Language from '@/app/[locale]/components/language/Language'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@tanstack/react-query'
import { faLanguage,faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons'
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import Link from 'next/link'
import { forgotPasswordSchema } from '../../../../lib/zodTypes'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { forgotPassword, singIn } from '@/actions/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
type ForgotData = z.infer<typeof forgotPasswordSchema>
export default function ForgotPassword() {

  const router = useRouter()
 
      const t = useTranslations('full'); 
;

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm<ForgotData>({
  resolver: zodResolver(forgotPasswordSchema),
});

 const forgotPasscode = async(data:ForgotData)=>{


     const result = await forgotPassword({...data})

 
     return result;
 }
 const forgotPasscodeMutation = useMutation({
  mutationFn: forgotPasscode,
  onSuccess: (response) => {


    if (response?.status === 200) {
  
   
      toast.success(typeof response?.data?.message === 'string' ? response?.data.message :"Check your email");
      // router.push('/dashboard');
    } else {
   

      toast.error(typeof response.error === 'string' ? response?.error : 'An unexpected error occurred.');
    }
  },
  onError: (error: any) => {

    toast.error(error?.message || 'Failed to forgotPasscode. Please try again.');
  },
});

const onSubmit: SubmitHandler<ForgotData> = (data) => {

  forgotPasscodeMutation.mutate(data);
};


  return (
 <div className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: "url('/tech-back.jpg')" }}>
      {/* <div className="absolute inset-0 bg-black/800 backdrop-blur-xs"></div> */}
      <div className="absolute start-0 top-0 p-15">
        <div className="relative flex items-center gap-2 z-100 ">
          <Language />
        </div>
      </div>
    
      <div className="relative z-10 bg-white/80 w-full max-w-[25rem] p-8 rounded-2xl shadow-2xl text-white ">

        <h2 className="text-center text-2xl mb-6 text-gray-700">{t("reset-your-password")}</h2>

        <p className='text-center text-sm font-light mb-6 text-gray-700'>{t("enter-the-email-associated-with-your-account-and-we-will-send-you-password-reset-instructions")}</p>
      
        <form   onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col gap-5" >
          <div className="relative">
            <input
              type="email"
              placeholder={t("email")}
               {...register('email')}
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
            {errors.email && (
          <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
        )}
          </div>

    

       
            <div className="flex items-center w-full justify-center">
            <button
                        type="submit"
                        className="flex p-[0.7rem] w-full items-center justify-center  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        disabled={forgotPasscodeMutation.isPending}
                     >
                     
                        {forgotPasscodeMutation.isPending ? 
                        <div className="h-6 w-6 items-center justify-center animate-spin rounded-full border-b-2 border-current" />
                        :    t("forgot-password")}
                     </button>
            </div>
        
        </form>
      </div>
    </div>
  );
}