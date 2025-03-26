"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";  
import { useTranslations } from 'next-intl'; 
export default function Language() {

   const t=useTranslations("full")

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname(); 

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;

    const nextPath = pathname.replace(`/${localActive}`, `/${nextLocale}`);

    startTransition(() => {
      router.replace(nextPath); 
    });
  };

  return (
    <div>
      <select
        value={localActive} // Use value instead of defaultValue
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="" disabled>{t("choose-language")}</option>
        <option value="en">{t("english")}</option>
        <option value="amh">{t("amharic")}</option>
      </select>
    </div>
  );
}
