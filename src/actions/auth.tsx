'use server'
import { z} from 'zod'
import { cookies } from 'next/headers'

import { signInSchema,forgotPasswordSchema, resetPasswordSchema } from '@/lib/zodTypes'
let endPoint ="https://sasconerp.com/pms/api"
import { useRouter } from 'next/router'
type LoginData = z.infer<typeof signInSchema>
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
type ResetPasswordData =z.infer<typeof resetPasswordSchema>& {
    token: string; 
  };


export const singIn =async (loginData:LoginData)=>{
  
    const res = await fetch(`${endPoint}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:loginData.email,password:loginData.password}),
      });


      const resJson =await res.json();
    

      if(res?.status ===200){
        const cookieStore = await cookies();
        cookieStore.set("_s_t", resJson.access, { httpOnly: true, secure: true, sameSite: "strict", path: "/" });
        cookieStore.set("_s_r", resJson.refresh, { httpOnly: true, secure: true, sameSite: "strict", path: "/" });
        cookieStore.set("_s_ap", JSON.stringify(resJson.permissions), { httpOnly: true, secure: true, sameSite: "strict", path: "/" });
        cookieStore.set("_s_ag", JSON.stringify(resJson.groups), { httpOnly: true, secure: true, sameSite: "strict", path: "/" });
    
        return { status: res.status, message: "Logged in successfully" };
      }else{
        return resJson
      }
      
}

export const forgotPassword =async (forgotData:ForgotPasswordData)=>{
  

        const res = await fetch(`${endPoint}/send_password_reset_email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:forgotData.email}),
      });


      const resJson =res.json();
    

      if(res?.status===200){
        return {
            status: res?.status,
            data: resJson,
          };
      }else{
        return resJson
      }
      
}

export const resetPassword =async (resetData:ResetPasswordData)=>{


    const tokenData =resetData?.token

    const res = await fetch(`${endPoint}/reset_password/${tokenData}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({password:resetData?.password}),
  });

  const resJson =res.json();

  if(res?.status===200){
    return {
        status: res?.status,
        data: resJson,
      };
  }else{
    return resJson
  }
  
}