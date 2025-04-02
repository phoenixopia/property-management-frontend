import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { updateRole, fetchPermissions } from '@/actions/roleAndPermissions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
interface Permission {
  id: string;
  label: string;
}

interface EditRoleFormProps {
  roleId: number;
  currentName: string;
  currentPermissions: string[];
}

// Define Zod schema for form validation
const editRoleSchema = z.object({
  roleName: z.string().min(1, "Role name is required"),
  permissions: z.array(z.string()).min(1, "At least one permission is required"),
});

type EditRoleFormValues = z.infer<typeof editRoleSchema>;

const EditRoleForm = ({ roleId, currentName, currentPermissions }: EditRoleFormProps) => {

   const [permLoading,setPermLoading]=useState(true);
  const queryClient = useQueryClient();

  const t = useTranslations("full");
  const [permissions, setPermissions] = React.useState<Permission[]>([]);

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EditRoleFormValues>({
    resolver: zodResolver(editRoleSchema),
    defaultValues: {
      roleName: currentName,
      permissions: currentPermissions,
    },
  });

  useEffect(() => {
    const fetchPermissionsData = async () => {
      const perms = await fetchPermissions();
      if(perms.length>0){
        setPermLoading(false);
      }
  
      setPermissions(perms);
    };
    fetchPermissionsData();
  }, []);


  useEffect(() => {
    reset({
      roleName: currentName,
      permissions: currentPermissions,
    });
  }, [currentName, currentPermissions, reset]);

  // Mutation for updating the role
  const mutation = useMutation({
    mutationFn: (data: EditRoleFormValues) => updateRole(roleId, data.roleName, data.permissions),
    onSuccess: (response) => {

     
          if(response?.success ===true){
             queryClient.invalidateQueries({ queryKey: ['getRoleWithPermission'] });
     
      
            
             toast.success("Role successfully updated!");
       
           }else{
     
             toast.error(response?.message !==''?response?.message: "Failed to update the role!");
           }
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      toast.error("Error updating role!");

    },
  });

  // Handle checkbox change
  const handleCheckboxChange = (permId: string) => {
    const currentPermissions = watch("permissions");
    const newPermissions = currentPermissions.includes(permId)
      ? currentPermissions.filter((id) => id !== permId)
      : [...currentPermissions, permId];
    
    setValue("permissions", newPermissions);
  };

  // Handle form submit
  const onSubmit = (data: EditRoleFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <input
              type="text"
              id="roleName"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder={t("role-name")}
              {...register("roleName")}
            />
            {errors.roleName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                {errors.roleName.message}
              </p>
            )}
          </div>

          <div className="flex col-span-2 items-center justify-center">
            <span className="text-gray-600 capitalize dark:text-gray-400 font-bold">
              {t("permissions")}
            </span>
          </div>

          <hr className="w-full col-span-2 bg-gray-50 text-gray-200 dark:text-gray-500 border-1 dark:bg-gray-700" />
          {permLoading && 
            <div>Loading permissions ...</div>}
          <div className="grid col-span-2 grid-cols-3 gap-4 max-h-[12rem] overflow-y-auto">
            {permissions.map((perm) => (
              <div key={perm.id} className="flex items-center w-full">
                <input
                  id={`checkbox-${perm.id}`}
                  type="checkbox"
                  checked={watch("permissions").includes(perm.id)}
                  onChange={() => handleCheckboxChange(perm.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={`checkbox-${perm.id}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {perm.label}
                </label>
              </div>
            ))}
          </div>
          {errors.permissions && (
            <p className="col-span-2 mt-1 text-sm text-red-600 dark:text-red-500">
              {errors.permissions.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={mutation.isPending}
        >
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          {mutation.isPending ? 
          <div>
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          </div> : t("edit-role")}
        </button>
      </form>
    </div>
  );
};

export default EditRoleForm;