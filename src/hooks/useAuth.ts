"use client";

import { useEffect, useState } from "react";
import { getUserAuthData } from "@/actions/authCookies";

export function useAuth() {
  const [user, setUser] = useState<{ permissions: string[]; groups: string[] } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const data = await getUserAuthData();
      setUser({ permissions: data.permissions, groups: data.groups });
    }

    fetchUser();
  }, []);
  
  const hasPermission = (permission: string) => user?.permissions.includes(permission) ?? false;
  const hasRole = (role: string) => user?.groups.includes(role) ?? false;

  return { user, hasPermission, hasRole };
}
