"use server"
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
let endPoint ="https://sasconerp.com/pms/api"
// let endPoint ="http://192.168.0.179:8000/api"

interface RentData {
  user_id: number;
  property_id: number;
  rent_type: string;
  start_date: Date;
  end_date: Date;
  payment_cycle: string;
  rent_amount: number;
  deposit_amount: number;
  status: string;
}
interface RentFilters {
    search?: string;
    status?: string;
    start_date_min?: string;
    start_date_max?: string;
    end_date_min?: string;
    end_date_max?: string;
    page?: string;
  }
  
export const getAllPayments = async (page = 1) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  const response = await fetch(`${endPoint}/get_payments?page=${page}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
      }
  });

  const responseJson = await response.json();
  return responseJson;
};


export async function post_rent(data: RentData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  console.log(data,'resss')
  
  try {
    const response = await fetch(`${endPoint}/post_rent`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        ...data,
        start_date: data.start_date.toISOString().split('T')[0],
        end_date: data.end_date.toISOString().split('T')[0]
      })
    });
    const result = await response.json();
    console.log(result,'resss')

 
    return result;
  } catch (error) {

  
    return { error: 'Failed to create rent' };
  }
}

async function handleApiResponse(response: Response) {
 
  if (!response.ok) {
    const errorData = await response.json();


    return {
        status: 404,
        error:errorData?.error || "Failed to create rent",
      };
  }
  return await response.json();
}

export async function get_properties() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  
  try {
    const response = await fetch(`${endPoint}/get_properties`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return await handleApiResponse(response);
  } catch (error) {
    return { error: 'Failed to fetch properties' };
  }
}

export async function get_tenants() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  
  try {
    const response = await fetch(`${endPoint}/get_tenants`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return await handleApiResponse(response);
  } catch (error) {
    return { error: 'Failed to fetch tenants' };
  }
}

export async function search_properties(searchTerm: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    
    try {
      const response = await fetch(`${endPoint}/get_properties?search=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return await handleApiResponse(response);
    } catch (error) {
      return { error: 'Failed to fetch properties' };
    }
  }

  export async function search_tenants(searchTerm: string) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    
    try {
      const response = await fetch(`${endPoint}/get_tenants?search=${encodeURIComponent(searchTerm)}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      return await handleApiResponse(response);
    } catch (error) {
      return { error: 'Failed to fetch tenants' };
    }
  }

 

  export async function deleteRent(id: number) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    
    try {
      const response = await fetch(`${endPoint}/delete_rent/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      const result = await handleApiResponse(response);
      revalidatePath('/rents');
      return result;
    } catch (error) {
      return { error: 'Failed to delete rent' };
    }
  }

  export async function update_rent(data:any,id:number) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    const response = await fetch(`${endPoint}/update_rent/`+id,{
        "method":"PATCH",
        "headers":{
                "content-type":"application/json",
                "Authorization":`Bearer ${accessToken}`,
            },
            "body":JSON.stringify(data)
        
    });

    return await response.json()

}
  
