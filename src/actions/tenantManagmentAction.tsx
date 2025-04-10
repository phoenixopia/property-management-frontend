'use server'

import { cookies } from 'next/headers'

import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"

export const getAllTenants = async (page = 1, search = "") => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_tenants?page=${page}&search=${search}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};



export const exportAllTenants = async (page = 1, search = "") => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_tenants?page_size=999999999999999999&search=${search}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
      }
  });


  const responseJson = await response.json();
  if(response?.status ===200){
    return {
      status: 200,
      success: "Users retrieved successfully!",
      clients: responseJson,
    }
  }else{
    return {
      status: 500,
      error: "Failed to load users. Please try again.",
    };
  }

};
