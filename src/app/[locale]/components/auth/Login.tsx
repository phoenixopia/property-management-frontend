"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { getUserAuthData } from "@/actions/authCookies";
import { singIn } from "@/actions/auth";
import { signInSchema } from "../../../../lib/zodTypes";
import { z } from "zod";
import Link from "next/link";
import Language from "@/app/[locale]/components/language/Language";
import { useTranslations } from "next-intl";

type LoginData = z.infer<typeof signInSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("full");
  const queryClient =useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(signInSchema),
  });

  const logIn = async (data: LoginData) => {
    return await singIn({ ...data });
  };

  const loginMutation = useMutation({
    mutationFn: logIn,
    onSuccess: async (response) => {
      if (response?.status === 200) {
      
        const authData = await getUserAuthData();
      

        if (authData.groups.length > 0 && authData.permissions.length > 0) {

          if (authData.groups.includes("maintenance")) {
            router.push("/maintenance");
          }else if(authData.groups.includes("tenant")){
            router.push("/tenant/rents");
          } else {
            router.push("/dashboard");
          }
           toast.success("Successfully signed in!");

           queryClient.invalidateQueries({ queryKey: ['profileData'] });

        } else {
          toast.error("Access denied: No permissions assigned.");
        }
      } else {
        toast.error(response?.detail|| "An unexpected error occurred.");
      }
    },
    onError: () => {
      toast.error("Failed to log in. Please try again.");
    },
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authData = await getUserAuthData();
      if (authData.groups.length > 0 && authData.permissions.length > 0) {
        if (authData.groups.includes("maintenance")) {
          router.push("/maintenance");
        } else {
          router.push("/dashboard");
        }
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);


  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center" style={{ backgroundImage: "url('/tech-back.jpg')" }}>
      {/* <div className="absolute inset-0 bg-black/800 backdrop-blur-xs"></div> */}
      <div className="absolute start-0 top-0 p-15">
        <div className="relative flex items-center gap-2 z-100 ">
          <Language />
        </div>
      </div>
      <div className="relative z-10 bg-white/80 w-full max-w-[25rem] p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-center text-2xl mb-6 text-gray-700">{t("welcome")}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="relative">
            <input
              type="email"
              placeholder={t("email")}
              {...register("email")}
              className="p-3 pl-10 w-full rounded-lg bg-gray-100 text-black focus:outline-none border border-gray-300"
              required
            />
               <div className="absolute left-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25h-15a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75-9.75-6.75"
                />
              </svg>
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder={t("password")}
              {...register("password")}
              className="p-3 pl-10 w-full rounded-lg bg-gray-100 text-black focus:outline-none border border-gray-300"
              required
            />
               <div className="absolute left-3 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V7.125A4.125 4.125 0 0012.375 3h-.75A4.125 4.125 0 007.5 7.125V10.5m-3 0h13.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5z"
                />
              </svg>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
              {t("remember-me")}
            </label>
            <Link href="/forgot-password" className="text-blue-600 hover:underline">{t("forgot-password")}?</Link>
          </div>
          <button
            type="submit"
            className="flex p-[0.7rem] w-full cursor-pointer items-center justify-center bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? (
              <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
            ) : (
              t("login")
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
