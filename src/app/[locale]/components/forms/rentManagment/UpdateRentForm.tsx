"use client";
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from 'zod';
import toast from 'react-hot-toast';
import { update_rent, search_tenants, search_properties } from "@/actions/rentManagmentAction";
import { debounce } from 'lodash';
import { format } from "date-fns";


const rentSchema = z.object({
  user_id: z.coerce.number().min(1, "Tenant is required"),
  property_id: z.coerce.number().min(1, "Property is required"),
  rent_type: z.string().min(1, "Rent type is required"),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  payment_cycle: z.string().min(1, "Payment cycle is required"),
  rent_amount: z.coerce.number().min(0.01, "Rent amount must be positive"),
  deposit_amount: z.coerce.number().min(0, "Deposit amount must be positive"),
  status: z.string().min(1, "Status is required"),
});

type RentFormData = z.infer<typeof rentSchema>;

type UpdateRentFormProps = {
  onSuccess: () => void;
  rent:any;
};
 
const UpdateRentForm = ({ onSuccess, rent }: UpdateRentFormProps) => {
  const t = useTranslations("full");
  const queryClient = useQueryClient();
  
  // Property search state
  const [propertySearchTerm, setPropertySearchTerm] = useState(rent.property_id.name);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<any>(rent.property_id);
  
  // Tenant search state
  const [tenantSearchTerm, setTenantSearchTerm] = useState(rent.user_id.email);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(rent.user_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<RentFormData>({
    resolver: zodResolver(rentSchema),
    defaultValues:rent ?{

      ...rent,
      start_date: rent?.end_date ? format(new Date(rent?.end_date),"yyyy-MM-dd"):undefined,
      end_date: rent?.end_date ? format(new Date(rent?.end_date),"yyyy-MM-dd"):undefined,
      user_id:rent?.user_id?.id ? rent?.user_id?.id:undefined,
      property_id:rent?.property_id?.id?rent.property_id?.id:undefined

      



    }: {
      user_id: rent.user_id.id,
      property_id: rent.property_id.id,
      rent_type: rent.rent_type,
      start_date: rent.start_date,
      end_date: rent.end_date,
      payment_cycle: rent.payment_cycle,
      rent_amount: rent.rent_amount,
      deposit_amount: rent.deposit_amount,
      status: rent.status,
    }
  });

  // Search properties with debounce
  const propertiesData = useQuery({
    queryKey: ['properties', propertySearchTerm],
    queryFn: () => search_properties(propertySearchTerm),
    enabled: propertySearchTerm.length > 2, // Only search when user has typed at least 3 characters
  });

  // Search tenants with debounce
  const tenantsData = useQuery({
    queryKey: ['tenants', tenantSearchTerm],
    queryFn: () => search_tenants(tenantSearchTerm),
    enabled: tenantSearchTerm.length > 2, // Only search when user has typed at least 3 characters
  });

  // Mutation for updating rent
  const updateRentMutation = useMutation({
    mutationFn: (data: RentFormData) => update_rent(data, rent.id),
    onSuccess: (response) => {
      if(response?.error){
        toast.error(response?.error || "Updating rent failed!");
      } else {
        toast.success("Rent updated successfully");
        queryClient.invalidateQueries({ queryKey: ['rents'] });
        onSuccess();
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Updating rent failed!");
    }
  });

  const onSubmit: SubmitHandler<RentFormData> = (data) => {
    updateRentMutation.mutate(data);
  };

  // Debounced search functions
  const debouncedPropertySearch = debounce((term: string) => {
    setPropertySearchTerm(term);
  }, 300);

  const debouncedTenantSearch = debounce((term: string) => {
    setTenantSearchTerm(term);
  }, 300);

  const handlePropertySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedPropertySearch(e.target.value);
    setShowPropertyDropdown(true);
  };

  const handleTenantSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedTenantSearch(e.target.value);
    setShowTenantDropdown(true);
  };

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
    setValue("property_id", property.id);
    setValue("rent_amount", property.rent || 0);
    setShowPropertyDropdown(false);
    setPropertySearchTerm(property.name);
  };

  const handleTenantSelect = (tenant: any) => {
    setSelectedTenant(tenant);
    setValue("user_id", tenant.id);
    setShowTenantDropdown(false);
    setTenantSearchTerm(tenant.email);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowPropertyDropdown(false);
      setShowTenantDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-1 md:grid-cols-2">
          
          {/* Tenant Selection - Searchable */}
          <div className="col-span-2 md:col-span-1 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('tenant')} *
            </label>
            <input
              type="text"
              value={tenantSearchTerm}
              onChange={handleTenantSearch}
              onClick={(e) => {
                e.stopPropagation();
                setShowTenantDropdown(true);
              }}
              placeholder="Search tenants..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="hidden"
              {...register("user_id", { valueAsNumber: true })}
            />
            {errors.user_id && (
              <p className="mt-1 text-sm text-red-600">{errors.user_id.message}</p>
            )}
            
            {/* Tenant dropdown */}
            {showTenantDropdown && (
              <div 
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg dark:bg-gray-700 max-h-60 overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {tenantsData.isLoading ? (
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200">Searching...</div>
                ) : tenantsData.isError ? (
                  <div className="px-4 py-2 text-red-600 dark:text-red-400">Error loading tenants</div>
                ) : tenantsData.data?.data?.length === 0 ? (
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200">No tenants found</div>
                ) : (
                  tenantsData.data?.data?.map((tenant: any) => (
                    <div
                      key={tenant.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => handleTenantSelect(tenant)}
                    >
                      {tenant.email}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Property Selection - Searchable */}
          <div className="col-span-2 md:col-span-1 relative">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('property')} *
            </label>
            <input
              type="text"
              value={propertySearchTerm}
              onChange={handlePropertySearch}
              onClick={(e) => {
                e.stopPropagation();
                setShowPropertyDropdown(true);
              }}
              placeholder="Search properties..."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <input
              type="hidden"
              {...register("property_id", { valueAsNumber: true })}
            />
            {errors.property_id && (
              <p className="mt-1 text-sm text-red-600">{errors.property_id.message}</p>
            )}
            
            {/* Property dropdown */}
            {showPropertyDropdown && (
              <div 
                className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg dark:bg-gray-700 max-h-60 overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {propertiesData.isLoading ? (
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200">Searching...</div>
                ) : propertiesData.isError ? (
                  <div className="px-4 py-2 text-red-600 dark:text-red-400">Error loading properties</div>
                ) : propertiesData.data?.data?.length === 0 ? (
                  <div className="px-4 py-2 text-gray-700 dark:text-gray-200">No properties found</div>
                ) : (
                  propertiesData.data?.data?.map((property: any) => (
                    <div
                      key={property.id}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => handlePropertySelect(property)}
                    >
                      {property.name}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

      
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('rent-type')} *
            </label>
            <select
              {...register("rent_type")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select rent type</option>
              <option value="lease">lease</option>
              <option value="house_rent">house rent</option>
              <option value="vehicle_rent">vehicle rent</option>
              <option value="other">other</option>
            </select>
            {errors.rent_type && (
              <p className="mt-1 text-sm text-red-600">{errors.rent_type.message}</p>
            )}
          </div>

          {/* Payment Cycle */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('payment-cycle')} *
            </label>
            <select
              {...register("payment_cycle")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select payment cycle</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            {errors.payment_cycle && (
              <p className="mt-1 text-sm text-red-600">{errors.payment_cycle.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('start-date')} *
            </label>
            <input
              {...register("start_date", { valueAsDate: true })}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.start_date && (
              <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>
            )}
          </div>

          {/* End Date */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('end-date')} *
            </label>
            <input
              {...register("end_date", { valueAsDate: true })}
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            {errors.end_date && (
              <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>
            )}
          </div>

          {/* Rent Amount */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('rent-amount')} *
            </label>
            <input
              {...register("rent_amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.00"
            />
            {errors.rent_amount && (
              <p className="mt-1 text-sm text-red-600">{errors.rent_amount.message}</p>
            )}
          </div>

          {/* Deposit Amount */}
          <div className="col-span-2 md:col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('deposit-amount')} *
            </label>
            <input
              {...register("deposit_amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.00"
            />
            {errors.deposit_amount && (
              <p className="mt-1 text-sm text-red-600">{errors.deposit_amount.message}</p>
            )}
          </div>

          {/* Status */}
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {t('status')} *
            </label>
            <select
              {...register("status")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="terminated">Terminated</option>
              <option value="completed">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateRentMutation.isPending}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {updateRentMutation.isPending ? (
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
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
                Update Rent
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRentForm;