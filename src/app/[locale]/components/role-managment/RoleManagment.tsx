"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faEye,
  faUsersGear,
} from "@fortawesome/free-solid-svg-icons";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import AddRoleForm from "../forms/roleManagment/AddRoleForm";
import EditRoleForm from "../forms/roleManagment/EditRoleForm";
import { getRoleWithPermissions } from "@/actions/roleAndPermissions";
import { count } from "console";
interface Role {
  id: number;
  name: string;
}

type RoleEdit = {
  id: number;
  name: string;
  permissions: string[];
};

const RoleManagement = () => {
  const [addRole, setAddRole] = useState(false);
  const [editRole, setEditRole] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentRole, setCurrentRole] = useState<RoleEdit | null>(null);
  const locale = useLocale();
  const t = useTranslations("full");

  const roleData = useQuery({
    queryKey: ["getRoleWithPermission", currentPage],
    queryFn: () => getRoleWithPermissions(currentPage),
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
  };

  const { data: roles, total_pages, previous, next ,count} = roleData?.data;
  console.log(currentRole,'rolesCCCCCCCCCCCCCCCC')

  
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
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-dark dark:text-gray-200 text-sm cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-dark dark:text-gray-200 text-sm cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex w-full justify-between my-2 p-4 flex-col xl:flex-row items-center gap-3 xl:gap-0 shadow-sm dark:bg-[#333538]">
          <div>
            <p className="text-gray-600 dark:text-gray-200">
              Showing {roles.length} of {count} entries
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
          <div className="relative bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl">
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
          <div className="relative bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl">
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
    </div>
  );
};

export default RoleManagement;
