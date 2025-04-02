'use server'
import { z} from 'zod'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signInSchema,forgotPasswordSchema, resetPasswordSchema } from '@/lib/zodTypes'
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"
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

export const logOut =async () =>{
              const cookieStore = await cookies()
               try{
               cookieStore.set("_s_t", "", { expires: new Date(0), path: "/" });
               cookieStore.set("_s_r", "", { expires: new Date(0), path: "/" });
               cookieStore.set("_s_ap", "", { expires: new Date(0), path: "/" });
               cookieStore.set("_s_ag", "", { expires: new Date(0), path: "/" });

             
               }catch(error){
                console.error("Failed to logout:", error);
                throw new Error("Failed to logout");
               }finally {
                redirect('/');
               
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

export const getProfile =async (resetData:ResetPasswordData)=>{


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