'use server'
import { z} from 'zod'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { signInSchema,forgotPasswordSchema, resetPasswordSchema } from '@/lib/zodTypes'
import { revalidatePath } from 'next/cache';
// let endPoint ="https://sasconerp.com/pms/api"
let endPoint ="http://192.168.0.101:8000/api"

import { useRouter } from 'next/router'
type LoginData = z.infer<typeof signInSchema>
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>
type ResetPasswordData =z.infer<typeof resetPasswordSchema>& {
    token: string; 
  };





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
  return responseJson;
};


export async function addRoleWithPermissions(roleName:string, selectedPermissions:string[]) {
  try {
 
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
    
      if (!roleResponse.ok) {
        if(roleResponse?.status ===400){
          return { success: false, message: 'Role with this name existed!' };
        }
       
          throw new Error('Failed to create role');
      }

      const roleData = await roleResponse.json();
      const groupId = roleData.id; 
    
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
    const res = await fetch(`${endPoint}/get_permissions?page_size=1000`, {
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
    const response = await fetch(`${endPoint}/update_group/${id}`, {
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
      if(response?.status ===400){
        return { success: false, message: 'Role with this name existed!' };
      }
     
      throw new Error('Failed to update the role');
    }

    return { success: true, message: 'Role updated successfully' };
  } catch (error) {
    console.error('Error updating role:', error);
    throw new Error('An error occurred while updating the role.');
  }
}


export async function deleteRole(id:number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
 
  try {
    const response = await fetch(`${endPoint}/delete_group/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
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