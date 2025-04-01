import React from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addRoleWithPermissions, fetchPermissions } from "@/actions/roleAndPermissions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { roleFormSchema } from "@/lib/zodTypes";


type RoleFormValues = z.infer<typeof roleFormSchema>;

const AddRoleForm = () => {
  const t = useTranslations("full");
  
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
      console.log(response, 'response after success mutation');
      reset();
      alert("Role created successfully!");
    },
    onError: (error: any) => {
      console.error("Error creating role:", error);
      alert(error.message || "Failed to create role");
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

          <hr className="w-full col-span-2 bg-gray-50 border-1 dark:bg-gray-700" />

          <div className="grid col-span-2 grid-cols-3 gap-4">
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
          {mutation.isPending ? (
            <svg
              className="animate-spin w-5 h-5 me-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          ) : (
            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {mutation.isPending ? "Saving..." : t("add-role")}
        </button>
      </form>
    </div>
  );
};

export default AddRoleForm;