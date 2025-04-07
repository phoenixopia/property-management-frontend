"use client";
import React, { useRef, useState } from 'react';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { z } from 'zod';
import toast from 'react-hot-toast';
import { updateProperty, fetchOwners, fetchManagers } from '@/actions/propertyManagmentAction';

const propertySchema = z.object({
  property_type: z.string().min(1, "Property type is required"),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  price: z.number().min(0, "Price must be positive"),
  rent: z.number().min(0, "Rent must be positive"),
  bed_rooms: z.number().min(0, "Bedrooms must be positive").optional(),
  bath_rooms: z.number().min(0, "Bathrooms must be positive").optional(),
  status: z.string().min(1, "Status is required"),
  owner_id: z.number().optional().nullable(),
  manager_id: z.number().optional().nullable(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface EditPropertyFormProps {
  property: PropertyFormData;
  onSuccess: () => void;
}

const EditPropertyForm = ({ property, onSuccess }: any) => {
  const t = useTranslations("full");
  const queryClient = useQueryClient();
  const inputRef =useRef(null);
  const [propertyForm,setPropertyForm]=useState(true);
  const [propertyGallaryForm,setpropertyGallaryForm]=useState(false);

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      ...property,
    }
  });

 
  const ownerData = useQuery({
    queryKey: ['owners'],
    queryFn: fetchOwners,
  });

  const managerData = useQuery({
    queryKey: ['managers'],
    queryFn: fetchManagers,
  
  });

  // Mutation for updating property
  const updatePropertyMutation = useMutation({
    mutationFn: (data: any) => updateProperty(property.id, {
      ...data,
      owner_id: data.owner_id || null,
      manager_id: data.manager_id || null,
    }),
    onSuccess: () => {
      toast.success("Property updated successfully");
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to update property");
    }
  });

  const setPropertyFormActive=()=>{
               setPropertyForm(true)
               setpropertyGallaryForm(false)
  }

  const setpropertyGallaryFormActive=()=>{
    setPropertyForm(false);
    setpropertyGallaryForm(true);
  }
 const selectedImage =inputRef?.current;
 console.log(selectedImage,'gallary Image selected')
  const onSubmit: SubmitHandler<PropertyFormData> = (data) => {

    const payload: PropertyFormData = {
      ...data,
      owner_id: data.owner_id === 0 ? null : data.owner_id,
      manager_id: data.manager_id === 0 ? null : data.manager_id,
    };
    updatePropertyMutation.mutate(payload);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className='flex flex-row rounded-lg my-2 font-bold text-sm text-white'>
      <div onClick={()=>setPropertyFormActive()} className={`flex ${propertyForm? `bg-gray-800 text-gray-100 `:`bg-gray-200 text-gray-800 `} cursor-pointer  flex-row w-full justify-evenly p-4 rounded-l-lg`}>
      <span >Property-Data</span>
      </div>
      <div onClick={()=>setpropertyGallaryFormActive()}  className={`flex ${propertyGallaryForm? `bg-gray-800 text-gray-100 `:`bg-gray-200 text-gray-800 `} cursor-pointer  flex-row w-full justify-evenly p-4 rounded-r-lg`}>
      <span >Gallary</span>
      </div>
      </div>
  

  { propertyForm &&  <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
          
          {/* Property Type */}
          <div className="col-span-2">
            <label className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Property-type
            </label>
            <select
              {...register("property_type")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">select-property-type</option>
              <option value="land">land</option>
              <option value="house">house</option>
              <option value="apartment">apartment</option>
            </select>
            {errors.property_type && (
              <p className="mt-1 text-sm text-red-600">{errors.property_type.message}</p>
            )}
          </div>

          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('owner')}
            </label>
            {ownerData?.isLoading ?<p className='text-black  dark:text-gray-100'>loading...</p> :ownerData?.isError?<p className='text-black dark:text-gray-100'>something went wrong!</p>:  
            <select

            {...register("owner_id", {
              setValueAs: v => v === "" ? null : Number(v)
            })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">no-owner</option>
              {ownerData?.data.map((owner: any) => (
                <option key={owner.id} value={owner.id} className="text-black">
                  {owner.full_name.trim()}
                </option>
              ))}
            </select>}
          </div>
          
          {/* Manager Selection */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              manager
            </label>
            {managerData?.isLoading ?<p className='text-black  dark:text-gray-100'>loading...</p> :managerData?.isError?<p className='text-black dark:text-gray-100'>something went wrong!</p>:  
            <select
            {...register("manager_id", {
              setValueAs: v => v === "" ? null : Number(v)
            })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">no-manager</option>
              {managerData?.data.map((manager: any) => (
                <option key={manager.id} value={manager.id}>
                  {manager.full_name.trim()}
                </option>
              ))}
            </select>}
          </div>

          {/* Property Name */}
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              property-name
            </label>
            <input
              {...register("name")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('address')} *
            </label>
            <input
              {...register("address")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="address"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          {/* City */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('city')} *
            </label>
            <input
              {...register("city")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              state
            </label>
            <input
              {...register("state")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="state"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              zip-code
            </label>
            <input
              {...register("zip_code")}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="..."
            />
            {errors.zip_code && (
              <p className="mt-1 text-sm text-red-600">{errors.zip_code.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('price')} *
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="price"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Rent */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              rent
            </label>
            <input
              {...register("rent", { valueAsNumber: true })}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="rent"
            />
            {errors.rent && (
              <p className="mt-1 text-sm text-red-600">{errors.rent.message}</p>
            )}
          </div>

          {/* Bedrooms */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('bedrooms')}
            </label>
            <input
              {...register("bed_rooms", { valueAsNumber: true })}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>

          {/* Bathrooms */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('bathrooms')}
            </label>
            <input
              {...register("bath_rooms", { valueAsNumber: true })}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>

          {/* Status */}
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              status
            </label>
            <select
              {...register("status")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="available">available</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updatePropertyMutation.isPending}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {updatePropertyMutation.isPending ? (
              <>
                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                Updating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 8a1 1 0 011-1h1V6a1 1 0 012 0v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                Update Property
              </>
            )}
          </button>
        </div>
      </form> }
      {propertyGallaryForm && 
      <div className='flex flex-col text-sm font-semibold'>
        <p className='py-2'>Manage Property Images</p>
           <div className='py-2'>
           <input ref={inputRef} className='bg-[#464646] text-gray-50 text-sm w-full text-center p-4 rounded-lg' type="file" accept="image/*"/>
          </div>
      </div>
      }
     
    </div>
  );
};

export default EditPropertyForm;