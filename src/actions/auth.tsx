'use server'
import { z} from 'zod'
import { signInSchema } from '@/lib/zodTypes'
let endPoint ="http://192.168.0.101:8000/api/token"
type LoginData = z.infer<typeof signInSchema>

export const singIn =async (loginData:LoginData)=>{
  
    const res = await fetch("http://192.168.0.101:8000/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:loginData.email,password:loginData.password}),
      });


      const resJson =res.json();
    

      if(res?.status ===200){
        return {
            status: res?.status,
            data: resJson,
          };
      }else{
        return resJson
      }
      
}
