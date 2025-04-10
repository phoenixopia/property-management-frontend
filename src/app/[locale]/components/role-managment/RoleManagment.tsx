"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from 'react-hot-toast';
import { withAuth } from "@/hooks/withAuth";
import {
  faPen,
  faTrash,
  faEye,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';
import AddRoleForm from "../forms/roleManagment/AddRoleForm";
import EditRoleForm from "../forms/roleManagment/EditRoleForm";
import { getRoleWithPermissions,deleteRole } from "@/actions/roleAndPermissions";
import { count } from "console";
import ViewRoleForm from "../forms/roleManagment/ViewRoleForm";
interface Role {
  id: number;
  name: string;
}

type RoleEdit = {
  id: number;
  name: string;
  permissions: string[];
};

type DeleteGroupId ={
  id:number
}
const RoleManagement = () => {
  const [addRole, setAddRole] = useState(false);
  const queryClient =useQueryClient()
  const [editRole, setEditRole] = useState(false);
  const [viewRole,setViewRole] =useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number ,name:string} | null>(null);
  const [currentRole, setCurrentRole] = useState<RoleEdit | null>(null);
  const locale = useLocale();
  const t = useTranslations("full");

  const roleData = useQuery({
    queryKey: ["getRoleWithPermission", currentPage],
    queryFn: () => getRoleWithPermissions(currentPage),
  });
  
  // const deleteGroupMutation =
  const deleteMutation = useMutation({
      mutationFn: ( id: number) => deleteRole(id),
      onSuccess: () => {
          toast.success("Successfully Deleted the role!");
          setConfirmDelete(null);
          queryClient.invalidateQueries({ queryKey: ['getRoleWithPermission',currentPage] });
      },
      onError: (error) => {
        console.error('Error deleting the role', error);
        toast.error("Error deleting the role!");
  
      },
    });

  if (roleData.isPending) {
    return <div className="p-4">Loading roles...</div>;
  }
  if (roleData.isError) {
    return <div className="p-4">Error Loading roles...</div>;
  }
  const handleEditClick = (role:any) => {
    setCurrentRole(role);
    setEditRole(true);
    setViewRole(false);
  };
    
  const handleViewClick = (role:any) => {
    setCurrentRole(role);
    setEditRole(false);
    setViewRole(true)

  };

  const { data: roles, total_pages, previous, next ,count} = roleData?.data;


  
  return (
    <div className="flex flex-col justify-between p-4">
      <div className="flex justify-start gap-2">
        <button
          onClick={() => setAddRole(true)}
          className="flex cursor-pointer flex-row text-sm capitalize items-center justify-center rounded-md bg-gray-900 dark:bg-gray-600 py-3 px-5 gap-2 text-white"
        >
          <FontAwesomeIcon icon={faUsersGear} />
          {t("add-role")}
        </button>
      </div>

      <div className="py-5">
        <div className="relative overflow-x-auto shadow-md rounded-sm max-h-[400px] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#444548] dark:text-gray-200">
              <tr>
                <th className="px-6 py-3">{t("id")}</th>
                <th className="px-6 py-3">{t("role")}</th>
                <th className="px-6 py-3">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {roles?.map((role:Role) => (
                <tr
                  key={role.id}
                  className="bg-white capitalize text-gray-500 dark:text-gray-200 border-b dark:bg-[#333538] dark:border-gray-700 border-gray-200"
                >
                  <td className="px-6 py-4">{role.id}</td>
                  <td className="px-6 py-4">{role?.name}</td>
                  <td className="flex flex-row px-6 py-4 space-x-4 items-center">
                    <button onClick={() => handleEditClick(role)}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="text-dark dark:text-gray-200 text-sm cursor-pointer"
                      />
                    </button>
                      <button 
                        onClick={() => setConfirmDelete({ id: role?.id,name:role?.name })} 
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-dark dark:text-gray-200 text-sm cursor-pointer"
                    />
                    </button>
                    <button onClick={() => handleViewClick(role)}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-dark dark:text-gray-200 text-sm cursor-pointer"
                    />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]">
          <div>
            <p className="text-gray-600 dark:text-gray-200">
              Showing {roles?.length?roles?.length:'-'} of {count} entries
            </p>
          </div>

          <div className="flex items-center justify-center gap-x-2">
            <button
              className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md ${
                !previous && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!previous}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              {t("previous")}
            </button>

            <p className="p-1 px-4 bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-800 rounded-md">
              {currentPage}
            </p>

            <button
              className={`p-2 cursor-pointer text-gray-600 dark:text-gray-200 rounded-b-md ${
                !next && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!next}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              {t("next")}
            </button>
          </div>
        </div>
      </div>

      {addRole && (
        <div className="fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80">
          <div className="relative max-h-[80%] bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t("create-role")}
              </h3>
              <button onClick={() => setAddRole(false)}>
                ✖
              </button>
            </div>
            <AddRoleForm />
          </div>
        </div>
      )}

      {editRole && (
        <div className="fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80">
          <div className="relative max-h-[80%] bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t("edit-role")}
              </h3>
              <button onClick={() => setEditRole(false)}>
                ✖
              </button>
            </div>
            {currentRole && (
                <EditRoleForm
                  roleId={currentRole.id}
                  currentName={currentRole.name}
                  currentPermissions={currentRole.permissions}
                />
              )}          
              </div>
        </div>
      )}


      {viewRole && (
           
           <div className="fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80">
           <div className="relative max-h-[80%] bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl">
             <div className="flex items-center justify-between p-4 border-b dark:border-gray-600 border-gray-200">
               <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                 {t("view-role")}
               </h3>
               <button onClick={() => setViewRole(false)}>
                 ✖
               </button>
             </div>
             {currentRole && (
                 <ViewRoleForm
                   roleId={currentRole.id}
                   currentName={currentRole.name}
                   currentPermissions={currentRole.permissions}
                 />
               )}          
               </div>
         </div>

      )}

          {confirmDelete && (
                  <div className='fixed inset-0 bg-gray-800/90 flex justify-center items-center z-50'>
                    <div className='bg-white shadow-xl p-3 rounded-lg w-full max-w-sm py-4'>
                    <svg className="text-gray-600 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" ></path></svg>
                    <div className="flex items-center justify-center mb-4 text-center text-gray-600 gap-1 ">
                      
                     <p>Are you sure you want to delete</p> <p className="bg-gray-200 rounded-lg p-2">{confirmDelete?.name}</p><p>role?</p>
                      
                      
                      </div>
                    
                    <div className="flex justify-center items-center space-x-4">
                        <button
                         onClick={() => deleteMutation.mutate(confirmDelete.id)}
                          className='px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600'
                          disabled={deleteMutation.isPending}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className='px-4 cursor-pointer py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
    </div>
  );
};
export default withAuth(RoleManagement, ["system-admin"], ["auth.view_permission", "ednant"]);


