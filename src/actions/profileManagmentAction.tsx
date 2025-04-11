'use server'

import { cookies } from 'next/headers'

import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"
export async function getUserProfileInfo() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    if (!accessToken) {
     
      return null;
    }
  
  try {
    const response = await fetch(`${endPoint}/get_user_profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: accessToken
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}


export async function createUserProfilePic(formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  try {
    const profileData = await getUserProfileInfo();
    const user_id = profileData?.user_id;

    const imageFile = formData.get('profile_picture') as File;

    if (!imageFile || !user_id) {
      throw new Error('Missing file or user_id');
    }

    const uploadData = new FormData();
    uploadData.append('profile_picture', imageFile);


    const response = await fetch(`${endPoint}/update_user/${user_id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: uploadData,
    });
 
    if (!response.ok) {
      throw new Error('Failed to upload profile picture');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
}