"use client";

import React, { useState,useEffect,useTransition } from "react";
import { getUserProfileInfo } from "@/actions/profileManagmentAction";
import { useQuery } from "@tanstack/react-query";
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
  faBuilding,faUsersRays,
  faBuildingUser
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
  translationKey: string;
  requiredRoles: string[];
  requiredPermissions: string[];
}

const SideBar = () => {
  // State management
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  // Hooks
  const locale = useLocale();  
  const t = useTranslations('Dashboard'); 
  const t2 = useTranslations('full'); 

  const pathname = usePathname();
  const { hasRole, hasPermission, user, refreshAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);


    // Navigation configuration
    const NAV_ITEMS: NavItem[] = [
      {
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faHouse} />,
        label: "dashboardTitle",
        translationKey: "Dashboard",
        requiredRoles: ["system-admin", "group 2"],
        requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
      },
      {
        path: "/user-managment",
        icon: <FontAwesomeIcon icon={faUser} />,
        label: "user-managment",
        translationKey: "Dashboard",
        requiredRoles: ["system-admin", "group 2"],
        requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
      },
      {
        path: "/property-management",
        icon: <FontAwesomeIcon icon={faBuilding} />,
        label: "property-management",
        translationKey: "full",
        requiredRoles: ["system-admin", "group 2"],
        requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
      },
      {
        path: "/rent-management",
        icon: <FontAwesomeIcon icon={faBuildingUser} />,
        label: "rent-management",
        translationKey: "full",
        requiredRoles: ["system-admin", "group 2"],
        requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
      },
      {
        path: "/tenant-management",
        icon: <FontAwesomeIcon icon={faUsersRays} />,
        label: "tenant-management",
        translationKey: "full",
        requiredRoles: ["system-admin", "group 2"],
        requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
      },
      {
        path: "/maintenance",
        icon: <FontAwesomeIcon icon={faScrewdriverWrench} />,
        label: "maintenance-requests",
        translationKey: "full",
        requiredRoles: ["maintenance", "system-admin"],
        requiredPermissions: ["pms.view_maintenancerequest"]
      },
      {
        path: "/role-managment",
        icon: <FontAwesomeIcon icon={faUsersGear} />,
        label: "role-managment",
        translationKey: "full",
        requiredRoles: ["system-admin", "group 2"],
        requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
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
  const validRoutes = NAV_ITEMS.map(item => `/${locale}${item.path}`);
  const shouldShowSidebar = validRoutes.includes(pathname);

  useEffect(() => {
    if (!shouldShowSidebar) return;
    refreshAuth();
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [shouldShowSidebar]);

  useEffect(() => {
    if (!shouldShowSidebar) return;
    if (user) {
      setIsLoading(false);
    }
  }, [user, shouldShowSidebar]);

 


  // Derived values


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
        ? "text-white bg-gray-900 dark:bg-gray-700 ml-2 " 
        : "text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 hover:ml-2"
    ].join(" ");
  };
  const handleLogout = () => {
    startTransition(() => {
      logOut();
    });
  };
  const profileData = useQuery({ queryKey: ['todos'], queryFn: getUserProfileInfo })

  const getIconClasses = (path: string) => 
    pathname === `/${locale}${path}`
      ? "w-5 h-5 text-black dark:text-white"
      : "w-5 h-5 text-black dark:text-white";

      if (!shouldShowSidebar) return null;


      console.log(profileData,'dsads')

  return (
    <>
    
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
        className={`fixed top-0 left-0 z-50 w-60 h-screen transition-transform bg-gray-100 dark:bg-[#212327] ${
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
         
          <div className="relative flex flex-col items-center w-full mx-4 px-7 py-2 border-1 border-gray-50 shadow-2xs dark:bg-[#292b30] dark:border-gray-800 gap-2">
              {profileData?.isPending ? (
                <p>Loading...</p>
              ) : profileData?.isError ? (
                <p>Failed to load the profile</p>
              ) : profileData?.data.profile_image ? (
                <img
                  src={profileData.data.profile_image}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-5xl text-gray-800 dark:text-gray-300"
                />
              )}

              <button
                onClick={() => setEditUserOpen(true)}
                className="absolute right-22 cursor-pointer top-2 size-6 rounded-full bg-white flex items-center justify-center"
                aria-label="Edit profile"
              >
                <FontAwesomeIcon icon={faPen} className="text-[0.7rem] text-gray-800 dark:text-gray-800" />
              </button>

              <div className="flex flex-col items-center dark:text-gray-100 text-gray-700 text-sm truncate">
                {profileData?.isPending ? (
                  <p>Loading...</p>
                ) : profileData?.isError ? (
                  <p>Failed to load the profile</p>
                ) : (
                  <p>{profileData.data.email}</p>
                )}
              </div>
            </div>

        </div>
        {isLoading && (
                <div className="fixed top-0 left-0 w-64 h-screen bg-gray-100 dark:bg-[#212327] flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
            
                  </div>
                </div>
              )}
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

          
            <li  >
              <button 
                onClick={handleLogout}
                disabled={isPending}
                className="w-full text-left flex items-center"
                aria-label="Sign out"
              >
                <FontAwesomeIcon 
                  icon={faRightFromBracket} 
                  className={`${
                    isPending ? 'w-5 h-5 text-black dark:text-white cursor-not-allowed' : 'w-5 h-5 text-black dark:text-white cursor-pointer'
                  } `}
      
                />
              <div className={`flex items-center hover:bg-gray-300 dark:hover:bg-gray-600 w-full hover:ml-2 p-2 rounded-l-lg text-black dark:text-white ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                
                
                <span className="ms-3">{isPending ? 'Logging out...' : `${t('sign-out')}`}  </span>
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