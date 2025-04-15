'use server'

import { cookies } from 'next/headers'

import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"


export const getAllLogs = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_logs?ordering=-id&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};
