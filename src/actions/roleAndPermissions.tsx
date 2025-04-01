'use server'
import { z} from 'zod'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signInSchema,forgotPasswordSchema, resetPasswordSchema } from '@/lib/zodTypes'
// let endPoint ="https://sasconerp.com/pms/api"
let endPoint ="http://192.168.0.179:8000/api"

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


export const getRoleWithPermissions = async ()=>{

    const response = await fetch(`${endPoint}/get_groups` ,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
         
        }

      }
)

       const responseJson = await response.json();
    console.log(responseJson,'json data of role with permission')
       return responseJson;
}