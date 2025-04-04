"use client";

import React, { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGear, 
  faHouse, 
  faUser, 
  faBell, 
  faCircleUser, 
  faRightFromBracket, 
  faUsersGear, 
  faPen, 
  faScrewdriverWrench, 
  faBuilding,faUsersRays
} from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import EditProfileForm from "./forms/profileManagment/EditProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { logOut } from "@/actions/auth";

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  translationKey: 'Dashboard' | 'full';
  requiredRoles: string[];
  requiredPermissions: string[];
}

const SideBar = () => {
  // State management
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Hooks
  const locale = useLocale();  
  const t = useTranslations('Dashboard'); 
  const t2 = useTranslations('full'); 

  const pathname = usePathname();
  const { hasRole, hasPermission, user, refreshAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refreshAuth();
    const timer = setTimeout(() => setIsLoading(false), 500); // Fallback in case auth takes too long
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

 
  // Navigation configuration
  const NAV_ITEMS: NavItem[] = [
    {
      path: "/dashboard",
      icon: <FontAwesomeIcon icon={faHouse} />,
      label: "dashboardTitle",
      translationKey: "Dashboard",
      requiredRoles: ["new group 3", "group 2"],
      requiredPermissions: ["pms.view_notification", "admin.change_logentry"]
    },
    {
      path: "/user-managment",
      icon: <FontAwesomeIcon icon={faUser} />,
      label: "user-managment",
      translationKey: "Dashboard",
      requiredRoles: [],
      requiredPermissions: []
    },
    {
      path: "/property-management",
      icon: <FontAwesomeIcon icon={faBuilding} />,
      label: "property-management",
      translationKey: "full",
      requiredRoles: [],
      requiredPermissions: []
    },
    {
      path: "/tenant-management",
      icon: <FontAwesomeIcon icon={faUsersRays} />,
      label: "tenant-management",
      translationKey: "full",
      requiredRoles: [],
      requiredPermissions: []
    },
    {
      path: "/maintenance",
      icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
      label: "maintenance-requests",
      translationKey: "full",
      requiredRoles: [],
      requiredPermissions: []
    },
    {
      path: "/role-managment",
      icon: <FontAwesomeIcon icon={faUsersGear} />,
      label: "role-managment",
      translationKey: "full",
      requiredRoles: [],
      requiredPermissions: []
    },
    {
      path: `/settings`,
      icon: <FontAwesomeIcon icon={faGear} />,
      label: "setting",
      translationKey: "Dashboard",
      requiredRoles: [],
      requiredPermissions: []
    }
  ];

  // Derived values
  const validRoutes = NAV_ITEMS.map(item => `/${locale}${item.path}`);
  const shouldShowSidebar = validRoutes.includes(pathname);

  // Helper functions
  const checkAccess = (roles: string[], permissions: string[]) => {
    const roleCheck = roles.length === 0 || roles.some(role => hasRole(role));
    const permissionCheck = permissions.length === 0 || 
                          permissions.some(perm => hasPermission(perm));
    return roleCheck && permissionCheck;
  };

  const getLinkClasses = (path: string) => {
    const isActive = pathname === `/${locale}${path}`;
    return [
      "flex items-center w-full p-2 rounded-l-lg group",
      isActive 
        ? "text-white bg-gray-900 dark:bg-gray-700 ml-2" 
        : "text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 hover:ml-2"
    ].join(" ");
  };

  const getIconClasses = (path: string) => 
    pathname === `/${locale}${path}`
      ? "w-5 h-5 text-black dark:text-white"
      : "w-5 h-5 text-black dark:text-white";

  
      if (!shouldShowSidebar || isLoading) return (
      <div></div>
      
      // <div className={`fixed items-center top-0 left-0 z-50 w-64 h-screen transition-transform bg-gray-100 dark:bg-[#212327] ${
      //   sidebarOpen ? "translate-x-0" : "-translate-x-full"
      // } md:translate-x-0`}>
      //        <>
      //            <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      //              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
      //              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
      //            </svg>
      //            processing...
      //          </>
      // </div>
      )

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden absolute p-2 mt-2 text-sm z-40 text-black dark:text-gray-100 rounded-lg"
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform bg-gray-100 dark:bg-[#212327] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-2 py-6">
          <div className="flex w-full justify-end px-4">
            <FontAwesomeIcon 
              icon={faBell} 
              className="text-2xl text-black dark:text-white cursor-pointer"
              aria-label="Notifications"
            />
          </div>
          
          <div className="relative flex flex-col items-center w-full mx-4 px-7 py-2 border-1 border-gray-50 shadow-2xs dark:bg-gray-600 dark:border-gray-800 gap-2">
            <FontAwesomeIcon 
              icon={faCircleUser} 
              className="text-5xl text-gray-800 dark:text-gray-400"
            />
            <button
              onClick={() => setEditUserOpen(true)}
              className="absolute right-4 top-4 size-6 rounded-full bg-white flex items-center justify-center"
              aria-label="Edit profile"
            >
              <FontAwesomeIcon icon={faPen} className="text-[0.7rem] text-gray-800 dark:text-gray-800" />
            </button>
            <div className="flex flex-col items-center">
              <span className="font-bold text-black dark:text-white">AdminName</span>
              <span className="text-[0.68rem] text-gray-400 dark:text-white">
                AdminName@gmail.com
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="h-full pl-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium text-sm">
            {NAV_ITEMS.map((item) => (
              checkAccess(item.requiredRoles, item.requiredPermissions) && (
                <li key={item.path}>
                  <Link href={item.path} passHref>
                    <div className="flex items-center w-full">
                      <span className={getIconClasses(item.path)}>
                        {item.icon}
                      </span>
                      <div className={getLinkClasses(item.path)}>
                        <span className="ms-3">
                          {item.translationKey === "Dashboard" 
                            ? t(item.label)
                            : t2(item.label)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              )
            ))}

            {/* Logout Button */}
            <li>
              <button 
                onClick={logOut}
                className="w-full text-left flex items-center"
                aria-label="Sign out"
              >
                <FontAwesomeIcon 
                  icon={faRightFromBracket} 
                  className="w-5 h-5 text-black dark:text-white"
                />
                <div className="flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 w-full hover:ml-2 p-2 rounded-l-lg text-black dark:text-white">
                  <span className="ms-3">{t('sign-out')}</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Edit Profile Modal - Kept exactly as original */}
      {editUserOpen && (
        <div className='fixed inset-0 bg-gray-800/90 h-screen flex justify-center items-center z-80'>
          <div className='relative bg-white dark:bg-gray-700 shadow-xl p-3 rounded-lg w-full max-w-xl'>
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {t2("edit-profile")}
              </h3>
              <button 
                onClick={() => setEditUserOpen(false)} 
                type="button" 
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
           
            <EditProfileForm />
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;