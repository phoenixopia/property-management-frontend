"use client";

import React, { useState, useEffect, useTransition } from "react";
import { getUserProfileInfo } from "@/actions/profileManagmentAction";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow, parseISO } from 'date-fns';
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
  faBuildingUser,
  faBellConcierge,
  faLinesLeaning,
  faHandHoldingDollar,
  faGears
} from '@fortawesome/free-solid-svg-icons';
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
import EditProfileForm from "./forms/profileManagment/EditProfileForm";
import { useAuth } from "@/hooks/useAuth";
import { logOut } from "@/actions/auth";
import { getUnreadNotifications } from "@/actions/notifications";
function formatTimeAgo(isoDateString:any) {
  try {
    const date = parseISO(isoDateString);
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'some time ago';
  }
}
interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  translationKey: string;
  requiredRoles: string[];
  requiredPermissions: string[];
}

const SideBar = () => {

  const [editUserOpen, setEditUserOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient =useQueryClient();
  const locale = useLocale();  
  const t = useTranslations('Dashboard'); 
  const t2 = useTranslations('full'); 

  const pathname = usePathname();
  const { hasRole, hasPermission, user, refreshAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     title: "New maintenance request",
  //     message: "Apartment 42 reported a leaky faucet",
  //     time: "2 hours ago",
  //     read: false
  //   },
  //   {
  //     id: 2,
  //     title: "Payment received",
  //     message: "Tenant John Doe paid rent for May",
  //     time: "1 day ago",
  //     read: true
  //   },
  //   {
  //     id: 3,
  //     title: "System update",
  //     message: "New features available in property management",
  //     time: "3 days ago",
  //     read: true
  //   }
  // ]);
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
      path: "/role-managment",
      icon: <FontAwesomeIcon icon={faUsersGear} />,
      label: "role-managment",
      translationKey: "full",
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
      path: "/notifications",
      icon: <FontAwesomeIcon icon={faBellConcierge} />,
      label: "notifications",
      translationKey: "full",
      requiredRoles: ["maintenance", "system-admin"],
      requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
    },
    {
      path: "/logs",
      icon: <FontAwesomeIcon icon={faLinesLeaning} />,
      label: "logs",
      translationKey: "full",
      requiredRoles: ["system-admin", "group 2"],
      requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
    },
    {
      path: "/transactions-logs",
      icon: <FontAwesomeIcon icon={faHandHoldingDollar} />,
      label: "transactions-logs",
      translationKey: "full",
      requiredRoles: ["system-admin", "group 2"],
      requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
    },
    {
      path: "/system-settings",
      icon: <FontAwesomeIcon icon={faGears} />,
      label: "system-settings",
      translationKey: "full",
      requiredRoles: ["system-admin", "group 2"],
      requiredPermissions: ["auth.view_permission", "admin.change_logentry"]
    },
    {
      path: "/settings",
      icon: <FontAwesomeIcon icon={faGear} />,
      label: "setting",
      translationKey: "Dashboard",
      requiredRoles: [],
      requiredPermissions: []
    }
  ];
  const profileData = useQuery({ queryKey: ['profileData'], queryFn: getUserProfileInfo })
  const shortNotificationsData = useQuery({ 
    queryKey: ['shortNotificationData'], 
    queryFn: getUnreadNotifications,
    refetchInterval: 60000,
    refetchIntervalInBackground: true,
    gcTime: 5 * 60 * 1000, 
    staleTime: 30000, 
  })
  const validRoutes = NAV_ITEMS.map(item => `/${locale}${item.path}`);
  const shouldShowSidebar = validRoutes.includes(pathname);
  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    // Mark all as read when opening
    // if (!notificationsOpen) {
    //   setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
    // }
  };
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
    queryClient.invalidateQueries({ queryKey: ['profileData'] });

  }, [user, shouldShowSidebar]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (notificationsOpen && !target.closest('.notification-container')) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen]);
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
  useEffect(() => {
 
    queryClient.invalidateQueries({ queryKey: ['profileData'] });

  }, []);
  

  const getIconClasses = (path: string) => 
    pathname === `/${locale}${path}`
      ? "w-5 h-5 text-black dark:text-white"
      : "w-5 h-5 text-black dark:text-white";

  if (!shouldShowSidebar) return null;




   console.log(shortNotificationsData,'shortnotficationData')
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
        } md:translate-x-0 flex flex-col`}
      >
        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-2 py-6">
        <div className="flex w-full justify-end px-4 relative"> {/* Added relative here */}
        <div className="notification-container">
        <button 
              onClick={toggleNotifications}
              className="relative"
              aria-label="Notifications"
            >
              <FontAwesomeIcon 
                icon={faBell} 
                className="text-2xl text-black dark:text-white cursor-pointer"
              />
             
             {shortNotificationsData?.data?.count > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
            </button>
            
            {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {t('notifications')}
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {shortNotificationsData?.data?.data?.length > 0 ? (
                      shortNotificationsData.data?.data?.map((notification:any) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b border-gray-100 dark:border-gray-700`}
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 dark:text-white">
                              {notification?.notification_type}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(notification?.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-3">
                            {notification?.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        {t('no-notifications')}
                      </div>
                    )}
                  </div>
                
                  {shortNotificationsData?.data?.count > 10 && (
                        <div className="p-2 text-center border-t border-gray-200 dark:border-gray-700">
                        <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                          {t('view-all')}
                        </button>
                      </div>
                    )}
        
                 
                
                </div>
              )
              }
               </div>
               </div>
         
          <div className="relative flex flex-col items-center w-full mx-4 px-7 py-2 border-1 border-gray-50 shadow-2xs dark:bg-[#292b30] dark:border-gray-800 gap-2">
            {profileData?.isPending ? (
              <p>Loading...</p>
            ) : profileData?.isError ? (
              <p>Failed to load the profile</p>
            ) : profileData?.data?.profile_picture ? (
              <img
                src={profileData?.data?.profile_picture}
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
                <p>{profileData?.data?.email}</p>
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

      
        <div className="flex-1 overflow-y-auto mb-8">
          <div className="h-full pl-3 py-4">
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

              <li>
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
                    <span className="ms-3">{isPending ? 'Logging out...' : `${t('sign-out')}`}</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Edit Profile Modal */}
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