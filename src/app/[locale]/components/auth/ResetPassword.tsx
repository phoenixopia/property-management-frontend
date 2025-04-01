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
import { resetPasswordSchema, signInSchema } from '../../../../lib/zodTypes'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPassword, singIn } from '@/actions/auth'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
type ResetData = z.infer<typeof resetPasswordSchema> 
interface ResetProps {
    token:string
}
export default function ResetPassword({token}:ResetProps) {


  const router = useRouter()
 
      const t = useTranslations('full'); 
;

const {
  register,
  handleSubmit,
  watch,
  formState: { errors },
} = useForm<ResetData>({
  resolver: zodResolver(resetPasswordSchema),
});

 const reset = async(data:ResetData)=>{


     const result = await resetPassword({...data,token:token});

 
     return result;
 }
 const resetMutation = useMutation({
  mutationFn: reset,
  onSuccess: (response) => {
 
    if (response?.status === 200) {
      toast.success('You changed your password Successfully!');
      router.push('/');
   
    } else {
   

      toast.error(typeof response.non_field_errors[0] === 'string' ? response?.non_field_errors[0] : 'An unexpected error occurred.');
    }
  },
  onError: (error: any) => {

    toast.error('Something went wrong. Please try again.');
  },
});

const onSubmit: SubmitHandler<ResetData> = (data) => {

  resetMutation.mutate(data);
};


  return (
    <div className='relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center' style={{ backgroundImage: "url('/loginBack.png')" }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
      <div className='absolute end-0 top-0 p-15'>
            <div className=' relative flex items-center gap-2 z-100 shadow-2xl'>
                    <Language/>
                </div>
      </div>
      <div className="relative z-10 bg-white/80 w-full max-w-[25rem] p-8 rounded-2xl shadow-2xl text-white ">

        <h2 className="text-center text-2xl mb-6 text-gray-700">{t("change-your-password")}</h2>

        <p className='text-center text-sm font-light mb-6 text-gray-700'>{t("enter-new-password-below-to-change-password")}</p>
      
        <form   onSubmit={handleSubmit(onSubmit)}
         className="flex flex-col gap-5" >
            <div className="relative">
            <input
              type="password"
              placeholder={t("password")}
              {...register('password')}
              
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
            {errors.password && (
          <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
        )}
          </div>

    

       
            <div className="flex items-center w-full justify-center">
            <button
                        type="submit"
                        className="flex p-[0.7rem] w-full items-center justify-center  bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        disabled={resetMutation.isPending}
                     >
                     
                        {resetMutation.isPending ? 
                        <div className="h-6 w-6 items-center justify-center animate-spin rounded-full border-b-2 border-current" />
                        :    t("reset-password")}
                     </button>
            </div>
        
        </form>
      </div>
    </div>
  );
}