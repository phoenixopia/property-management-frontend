'use server'

import { cookies } from 'next/headers'

import { revalidatePath } from 'next/cache';
// let endPoint ="https://sasconerp.com/pms/api"
let endPoint ="http://192.168.0.179:8000/api"


export const getAllProperty = async (page = 1, search = "") => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_properties?page=${page}&search=${search}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};
