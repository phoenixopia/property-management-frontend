'use server'
import { z} from 'zod'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signInSchema,forgotPasswordSchema, resetPasswordSchema } from '@/lib/zodTypes'
import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"

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



export const getRoleWithPermissions = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_groups?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  console.log(responseJson, 'json data of role with permission');
  return responseJson;
};


export async function addRoleWithPermissions(roleName:string, selectedPermissions:string[]) {
  try {
      // Step 1: Create Role
      console.log(roleName,'string name')
      console.log(selectedPermissions,'array per name')
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('_s_t')?.value;
      const roleResponse = await fetch(`${endPoint}/post_group`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
               "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({ name: roleName }),
      });
      console.log(roleResponse,'rrrrrrrrrrrrrr')
      if (!roleResponse.ok) {
       
          throw new Error('Failed to create role');
      }

      const roleData = await roleResponse.json();
      const groupId = roleData.id; 
        console.log(groupId,'ggggggggggggggggggggggggggggg')
      const permissionResponse = await fetch(`${endPoint}/set_group_permissions`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
               "Authorization": `Bearer ${accessToken}`
          },
          body: JSON.stringify({
              group_id: groupId,
              permissions: selectedPermissions,
          }),
      });

      if (!permissionResponse.ok) {
          throw new Error('Failed to assign permissions');
      }

      // Revalidate cache
      revalidatePath('/role-managment');
      return { success: true, message: 'Role and permissions assigned successfully' };
  } catch (error) {
      return { success: false, message:'something went wrong' };
  }
}



export async function fetchPermissions() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  try {
    const res = await fetch('https://sasconerp.com/pms/api/get_permissions?page=1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
        // Adjust authentication as needed
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch permissions');
    }

    const data = await res.json();
    return data.data.map((perm:any) => ({ id: perm.codename, label: perm.name }));
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return [];
  }
}

export async function updateRole(id: number, name: string, permissions: string[]) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  try {
    const response = await fetch(`https://sasconerp.com/pms/api/update_group/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: name,
        permissions: permissions,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update the role');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating role:', error);
    throw new Error('An error occurred while updating the role.');
  }
}