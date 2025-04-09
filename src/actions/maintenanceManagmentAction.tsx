'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { log } from 'console';

type Property = {
  id: number;
  property_type: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  price: number;
  bed_rooms: number;
  bath_rooms: number;
  rent: number;
  status: string;
  created_at: string;
  updated_at: string;
  owner_id: number | null;
  manager_id: number | null;
};

type PropertyResponse = {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  page_size: number;
  data: Property[];
};

const endPoint = "https://sasconerp.com/pms/api";


export async function getUserProfile(accessToken: string) {
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

export async function createMaintenanceRequest(requestData: any) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
  
    if (!accessToken) {
      throw new Error('Authentication required');
    }
  
    try {
    
      const userProfile = await getUserProfile(accessToken);
      const userId = userProfile?.user_id;
    
      const response = await fetch(`${endPoint}/post_maintenance_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          user_id: userId,
          property_id: requestData.property_id,
          description: requestData.description
        })
      });
      console.log(response,'response when it created')
      if (!response.ok) {
        const errorData = await response.json();
      
        return { 
          success: false, 
          message: errorData?.error || 'Failed to create maintenance request' 
        };
      }
  
      const data = await response.json();
     
      
      return { 
        success: true, 
        message: 'Maintenance request created successfully',
        data 
      };
  
    } catch (error) {
      console.error('Network Error:', error);
      return { 
        success: false, 
        message: 'Network error occurred while creating maintenance request' 
      };
    }
  }


  export const getAllMaintenance = async (
    page = 1,
    search = "",
    startDate = "",
    endDate = ""
  ) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
  
    let url = `${endPoint}/get_maintenance_requests?page=${page}`;
  
    // Include startDate and/or endDate conditionally
    if (startDate) {
      url += `&start_date=${startDate}`;
    }
    if (endDate) {
      url += `&end_date=${endDate}`;
    }
  
   
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const responseJson = await response.json();
    return responseJson;
  };


export async function resolveMaintenance(id:number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
 console.log(id);
  try {
    const response = await fetch(`${endPoint}/resolve_maintenance_request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
         id: id,
      })
    });
    const result = await response.json();

    console.log(response,'data after resolve')

    if (!response.ok) {
      throw new Error('Failed to update the maintenance status');
    }

    return result;
  } catch (error) {
    console.error('Error updating role:', error);
    throw new Error('An error occurred while updating the maintenance status.');
  }
  
}

  