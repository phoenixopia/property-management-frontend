"use server";

import { cookies } from "next/headers";

export async function getUserAuthData() {
  "use server";
  const cookieStore = await cookies();
  
  const permissions = cookieStore.get("_s_ap")?.value;
  const groups = cookieStore.get("_s_ag")?.value;
  const accessToken = cookieStore.get('_s_t')?.value

  return {
    permissions: permissions ? JSON.parse(permissions) : [],
    groups: groups ? JSON.parse(groups) : [],
    accessToken: accessToken || "",
  };
}
