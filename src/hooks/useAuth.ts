import { useEffect, useState } from "react";
import { getUserAuthData } from "@/actions/authCookies";

export function useAuth() {
  const [user, setUser] = useState<{ permissions: string[]; groups: string[] } | null>(null);
  const [authChanged, setAuthChanged] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserAuthData();
      setUser({ permissions: data.permissions, groups: data.groups });
    }

    fetchUser();
  }, [authChanged]); // 🔄 Re-fetch when auth state changes

  const refreshAuth = () => setAuthChanged((prev) => !prev); 

  const hasPermission = (permission: string) => user?.permissions.includes(permission) ?? false;
  const hasRole = (role: string) => user?.groups.includes(role) ?? false;

  return { user, hasPermission, hasRole, refreshAuth };
}
