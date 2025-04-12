'use server'

import { cookies } from 'next/headers'

import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"

export const getAllNotifications = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_notifications?id=-1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};

export const getUnreadNotifications = async (page = 1) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
  
    const response = await fetch(`${endPoint}/api/get_unread_notifications?id=-1&page_size=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
    });
  
    const responseJson = await response.json();
    return responseJson;
  };