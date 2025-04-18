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


export async function fetchProperties(
  params: {
    min?: number | string;
    max?: number | string;
    search?: string;
    page?: number | string;
    page_size?: number | string;
  } = {}
): Promise<PropertyResponse> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;


  const min = params.min ? Number(params.min) : 0
  const max = params.max ? Number(params.max) : 120000000000;
  const search = params.search || '';
  const page = params.page ? Number(params.page) : 1;
  const page_size = params.page_size ? Number(params.page_size) : 10;

  const url = new URL(`${endPoint}/get_properties`);
  url.searchParams.append('min', min.toString());
  url.searchParams.append('max', max.toString());
  if (search) url.searchParams.append('search', search);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('page_size', page_size.toString());

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    
  
    
    if (!response.ok) {
      throw new Error(`Failed to fetch properties: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties. Please try again later.');
  }
}

export async function createProperty(propertyData: any) {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  const endpoint = 'https://sasconerp.com/pms/api/post_property';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        property_type: propertyData.property_type,
        name: propertyData.name,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        zip_code: propertyData.zip_code,
        price: Number(propertyData.price),
        rent: Number(propertyData.rent),
        bed_rooms: propertyData.bed_rooms ? Number(propertyData.bed_rooms) : 0,
        bath_rooms: propertyData.bath_rooms ? Number(propertyData.bath_rooms) : 0,
        status: propertyData.status,
        owner_id: propertyData.owner_id || null,
        manager_id: propertyData.manager_id || null
      })
    });
 
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return { 
        success: false, 
        message: errorData.message || 'Failed to create property' 
      };
    }

    const data = await response.json();
    revalidatePath('/property-management');
    
    return { 
      success: true, 
      message: 'Property created successfully',
      data 
    };

  } catch (error) {
    console.error('Network Error:', error);
    return { 
      success: false, 
      message: 'Network error occurred while creating property' 
    };
  }
}

export async function fetchOwners() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  try {
    const response = await fetch('https://sasconerp.com/pms/api/get_owners', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch owners');
    }

    const data = await response.json();

    return data?.owners

  } catch (error) {
    console.error('Error fetching owners:', error);
    throw new Error('Failed to fetch owners');
  }
}

export async function fetchManagers() {
  const cookieStore =await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;

  try {
    const response = await fetch('https://sasconerp.com/pms/api/get_managers', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch managers');
    }

    const data = await response.json();

    return data?.managers

  } catch (error) {
    console.error('Error fetching managers:', error);
    throw new Error('Failed to fetch managers');
  }
}


export async function deleteProperty(id:number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
 
  try {
    const response = await fetch(`${endPoint}/delete_property/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    });

 

    if (!response.ok) {
      throw new Error('Failed to update the role');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating role:', error);
    throw new Error('An error occurred while updating the role.');
  }
  
}


export const updateProperty = async (id: number, data: any) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('_s_t')?.value;
    const response = await fetch(`${endPoint}/update_property/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });


    if (!response.ok) {
      throw new Error('Failed to update property');
    }

    const result = await response.json();
  
    return result;
  } catch (error) {
    console.error('Error updating property:', error);
    throw error;
  }
};


export const postPropertyPicture = async (formData: FormData) => {

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  try {
    const response = await fetch(`${endPoint}/post_property_picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


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

