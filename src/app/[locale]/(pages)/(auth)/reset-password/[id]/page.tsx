import ResetPassword from '@/app/[locale]/components/auth/ResetPassword'

import { useTranslations } from 'next-intl'; 

export default async function page({params}:{params:Promise<{id:string}>}){
  // const t = useTranslations('Dashboard'); 

  const token = ((await params).id).toString()

  return (
    <div><ResetPassword token={token}/></div>
  )
}

