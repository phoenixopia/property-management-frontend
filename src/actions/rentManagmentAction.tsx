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

export async function post_rent(data: RentData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  
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
    
    const result = await handleApiResponse(response);
 
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

  interface RentFilters {
    search?: string;
    status?: string;
    start_date_min?: string;
    start_date_max?: string;
    end_date_min?: string;
    end_date_max?: string;
    page?: string;
  }
  
  export async function fetchRents(filters: RentFilters) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams();
      
      
      if (filters.status) queryParams.append('search', filters.status);
      if (filters.start_date_min) queryParams.append('start_date_min', filters.start_date_min);
      if (filters.start_date_max) queryParams.append('start_date_max', filters.start_date_max);
      if (filters.end_date_min) queryParams.append('end_date_min', filters.end_date_min);
      if (filters.end_date_max) queryParams.append('end_date_max', filters.end_date_max);
      if (filters.page) queryParams.append('page', filters.page);
  
      const response = await fetch(`${endPoint}/get_rents?${queryParams.toString()}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      
      return await handleApiResponse(response);
    } catch (error) {
        throw new Error('Failed to fetch rent. Please try again later.');
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
    const response = await fetch("https://sasconerp.com/pms/api/update_rent/"+id,{
        "method":"PATCH",
        "headers":{
                "content-type":"application/json",
                "Authorization":`Bearer ${accessToken}`,
            },
            "body":JSON.stringify(data)
        
    });

    return await response.json()

}
  
