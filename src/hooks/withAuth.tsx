import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAuth(
  Component: React.FC,
  requiredRoles?: string[] | string,
  requiredPermissions?: string[] | string
) {
  return function ProtectedComponent(props: any) {
    const { user, hasRole, hasPermission } = useAuth();
    const router = useRouter();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      if (user === null) return; // Wait until user data is loaded

      const roleCheck =
        requiredRoles
          ? (Array.isArray(requiredRoles)
              ? requiredRoles.some((role) => hasRole(role))
              : hasRole(requiredRoles))
          : true;

      const permissionCheck =
        requiredPermissions
          ? (Array.isArray(requiredPermissions)
              ? requiredPermissions.some((perm) => hasPermission(perm))
              : hasPermission(requiredPermissions))
          : true;

      const isAuthorized = roleCheck && permissionCheck;

      if (!isAuthorized) {
        router.push("/unauthorized");
      } else {
        setIsChecking(false);
      }
    }, [user, hasRole, hasPermission, router]);

    if (isChecking) {
      return (
        <div className="fixed w-full h-full bg-gray-100 dark:bg-[#212327] flex items-center justify-center overflow-hidden">
          <div className="flex">
            <svg className="w-5 h-5 text-gray-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
     
          </div>
        </div>)
    }

    return <Component {...props} />;
  };
}
