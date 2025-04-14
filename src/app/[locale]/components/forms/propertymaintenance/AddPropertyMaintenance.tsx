"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faMapMarkerAlt, faCity, faMoneyBillWave, 
  faBed, faBath, faTag, faTools, faCheck, faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createMaintenanceRequest } from '@/actions/maintenanceManagmentAction';

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
  owner_id: number | null;
  manager_id: number | null;
};

type MaintenanceFormData = {
  property_id: number;
  description: string;
};

type PropertyMaintenanceProps = {
  property: Property;
  onSuccess?: () => void;
};

const AddPropertyMaintenance = ({ property, onSuccess }: PropertyMaintenanceProps) => {
  const locale = useLocale();  
  const t = useTranslations('full');
  const queryClient =useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MaintenanceFormData>({
    defaultValues: {
      property_id: property.id,
      description: ''
    }
  });

  const mutation = useMutation({
    mutationFn: (data: MaintenanceFormData) => createMaintenanceRequest(data),
    onSuccess: (result) => {
  
      if (result.success) {
        toast.success('maintenance-request-created');
        reset();
        queryClient.invalidateQueries({queryKey:["properties"]});
        if (onSuccess) onSuccess();
      } else {
        toast.error(result?.message);
      }
    },
    onError: (error) => {
      toast.error('network-error');
      console.error('Error creating maintenance request');
    }
  });

  const onSubmit: SubmitHandler<MaintenanceFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className='flex flex-col w-full p-4'>
    

      <div className='mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow'>
        <h3 className='text-sm text-gray-800 dark:text-white mb-4 '>
          {t('maintenance-request')}
        </h3>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('property_id')} />
          
          <div className='mb-4'>
            <textarea
              {...register('description')}
              rows={4}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              placeholder="Describe the issue.."
            />
            {errors.description && (
              <p className='mt-1 text-sm text-red-600 dark:text-red-400'>{errors.description.message}</p>
            )}
          </div>
          
          <div className='flex justify-end gap-2'>
         
            
            <button
              type='submit'
              disabled={mutation.isPending}
              className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 flex items-center gap-2'
            >
              {mutation.isPending ? (
                <>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  processing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faTools} />
                  submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyMaintenance;