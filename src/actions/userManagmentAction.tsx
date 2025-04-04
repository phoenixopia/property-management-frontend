'use server'

import { cookies } from 'next/headers'

import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"

export const getAllUsers = async (page = 1, search = "") => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_users?page=${page}&search=${search}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};

export async function createUserWithGroups(
  userData: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    password: string;
    email: string;
  },
  selectedGroups: string[]
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;

    // First, create the user
    const userResponse = await fetch(`${endPoint}/post_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(userData),
    });

    if (!userResponse.ok) {
      if (userResponse?.status === 400) {
        return { success: false, message: 'User with this email already exists!' };
      }
      throw new Error('Failed to create user');
    }

    const userDataResponse = await userResponse.json();
    const userId = userDataResponse.id;

    // Then assign groups to the user
    const groupResponse = await fetch(`${endPoint}/set_user_groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        user_id: userId,
        groups: selectedGroups,
      }),
    });

    if (!groupResponse.ok) {
      throw new Error('Failed to assign groups to user');
    }

    // Revalidate cache
    revalidatePath('/user-management');
    return { success: true, message: 'User created and groups assigned successfully' };
  } catch (error) {
    return { success: false, message: 'Something went wrong' };
  }
}


export const getAllGroups = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_groups?page_size=1000000`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};

export async function updateUser(userId: string, data: any) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
    console.log(data,'data from the user to update')
  try {
    const res = await fetch(`${endPoint}/update_user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Failed to update user');
    return await res.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}


export async function deactivateUser(id:number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
 console.log(id,'id for banning')
  try {
    const response = await fetch(`${endPoint}/deactivate_user/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

 

    if (!response.ok) {
      throw new Error('Failed to deactivate the user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating deactivate user:', error);
    throw new Error('An error occurred while deactivating the user.');
  }
  
}


export async function activateUser(id:number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
 
  try {
    const response = await fetch(`${endPoint}/activate_user/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

 

    if (!response.ok) {
      throw new Error('Failed to activate the user');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error activating role:', error);
    throw new Error('An error occurred while updating the activating the user.');
  }
  
}