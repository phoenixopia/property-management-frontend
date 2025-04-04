import React from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery ,useQueryClient} from "@tanstack/react-query";
import { addRoleWithPermissions, fetchPermissions } from "@/actions/roleAndPermissions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { roleFormSchema } from "@/lib/zodTypes";
import toast from "react-hot-toast";


type RoleFormValues = z.infer<typeof roleFormSchema>;

const AddRoleForm = () => {
  const t = useTranslations("full");
   const queryClient =useQueryClient();
  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RoleFormValues>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleName: "",
      permissions: [],
    },
  });

  // Use React Query to fetch permissions
  const { data: permissionList, isLoading, isError } = useQuery({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
  });

  const mutation = useMutation({
    mutationFn: async (data: RoleFormValues) => {
      return addRoleWithPermissions(data.roleName, data.permissions);
    },
    onSuccess: (response) => {
   
      if(response?.success ===true){
        queryClient.invalidateQueries({ queryKey: ['getRoleWithPermission'] });

        reset();
        toast.success("Role created successfully!");
  
      }else{

        toast.error(response?.message !==''?response?.message: "Failed to create role!");
      }
    
    },
    onError: (error: any) => {
      console.error("Error creating role:", error);
      toast.error( "Failed to create role");
    },
  });

  const handleCheckboxChange = (id: string) => {
    const currentPermissions = watch("permissions");
    const newPermissions = currentPermissions.includes(id)
      ? currentPermissions.filter((perm) => perm !== id)
      : [...currentPermissions, id];
    
    setValue("permissions", newPermissions);
  };

  const onSubmit = (data: RoleFormValues) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading permissions...</div>;
  }

  if (isError) {
    return <div>Error loading permissions.</div>;
  }

  return (
    <div>
      <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <input
              type="text"
              id="roleName"
              className="bg-gray-100 text-gray-600 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
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

          <hr className="w-full col-span-2 bg-gray-50 border-1 dark:bg-gray-500" />

          <div className="grid col-span-2 grid-cols-3 gap-4 max-h-[12rem] overflow-y-auto">
            {permissionList?.map((perm: any) => (
              <div key={perm.id} className="flex items-center w-full">
                <input
                  type="checkbox"
                  id={perm.id}
                  checked={watch("permissions").includes(perm.id)}
                  onChange={() => handleCheckboxChange(perm.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                />
                <label
                  htmlFor={perm.id}
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
          className="cursor-pointer text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={mutation.isPending}
        >
      
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          
          {mutation.isPending ? <div>
            <>
                 <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                   <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                 </svg>
                 processing...
               </>
          </div>: t("add-role")}
        </button>
      </form>
    </div>
  );
};

export default AddRoleForm;