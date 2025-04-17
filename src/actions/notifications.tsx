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
export const getAllNotifications = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_notifications?ordering=-id&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};


export const getSingleUserNotifications = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
     const profileData = await getUserProfileInfo();
          const user_id = profileData?.user_id;

  const response = await fetch(`${endPoint}/get_user_notifications/${user_id}?ordering=-id&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};



export const getUnreadNotifications = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
  
    const response = await fetch(`${endPoint}/get_unread_notifications?ordering=-id&page_size=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
    });
 
  
    const responseJson = await response.json();
    return responseJson;
  };

  export const readNotifications = async (id:any) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
  
    const response = await fetch(`${endPoint}/update_notification/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "is_read": true
        })
    });
  
    const responseJson = await response.json();
    return responseJson;
  };