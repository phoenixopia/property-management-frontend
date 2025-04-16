// actions/statistics.ts
'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
let endPoint ="https://sasconerp.com/pms/api"

// Define Zod schemas
const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  phone_number: z.string().nullable(),
  date_joined: z.string(),
});

const maintenanceRequestSchema = z.object({
  id: z.number(),
  status: z.string(),
  description: z.string(),
  requested_at: z.string(),
  resolved_at: z.string().nullable(),
});

const revenueDataSchema = z.object({
  total: z.number(),
  paid: z.number(),
  unpaid: z.number(),
});

const statisticsSchema = z.object({
  users: z.array(userSchema),
  maintenance_requests: z.array(maintenanceRequestSchema),
  revenue_bar: z.record(revenueDataSchema),
  property_status: z.object({
    occupied: z.number(),
    available: z.number(),
    under_maintenance: z.number(),
  }),
  total_properties: z.number(),
  total_tenants: z.number(),
});

export const fetchStatistics = async () => {
  const cookieStore =await cookies();
  const accessToken = cookieStore.get('_s_t')?.value;
  
  try {
    const response = await fetch(`${endPoint}/get_statistics`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) throw new Error('Failed to fetch statistics');
    const data = await response.json();
    
    return data.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw error;
  }
};