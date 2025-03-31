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
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };
}
