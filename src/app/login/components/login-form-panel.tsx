"use client";

import AxiosClient from "@/axios/axios-client";
import ButtonLoader from "@/components/common/button-loader";
import FormErrorsBox from "@/components/common/form-errors.box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  GraduationCapIcon,
  LockKeyIcon,
} from "@phosphor-icons/react";
import { toast } from "@yusufceng1z/ding-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { FormValues, loginFormSchema } from "../types/form.type";

export function LoginFormPanel() {
  const router = useRouter();

  const [apiErrors, setApiErrors] = useState<string | string[]>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  // Handler
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setApiErrors("");
    setSubmitting(true);
    try {
      const res = await AxiosClient.post("/auth/login", data);
      Cookies.set("access_tknx", res.data.access_token);

      toast.success("You are logged in successfully, ENJOY!");

      router.push("/");
    } catch (error: any) {
      setApiErrors(error.response?.data.message);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-sm space-y-7 animate-in fade-in-50 duration-300">
        {/* Mobile-only Brand Header */}
        <div className="flex lg:hidden items-center gap-3">
          <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
            <GraduationCapIcon className="size-6" weight="fill" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-foreground">
              ACCO - Academic Workspace
            </h1>
            <p className="text-xs text-muted-foreground">
              Before Exam, Don&apos;t Poke CR/ACR Again
            </p>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            <span className="text-primary">Welcome</span> back
          </h2>
          <p className="text-xs text-muted-foreground">
            Sign in with your credentials to continue.
          </p>
        </div>

        <FormErrorsBox errors={apiErrors} />

        {/* Sign In Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-foreground">
              Email
            </label>
            <div className="relative">
              <EnvelopeSimpleIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="e.g. name@mail.com"
                {...register("email")}
                autoComplete="username"
                className={`${errors.email ? "ring-destructive focus-visible:ring-destructive focus-visible:border-destructive border-destructive" : ""} pl-9 h-10 text-xs`}
              />
            </div>
            {errors.email && <p className="m-2 text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-semibold text-foreground">
                Password
              </label>
            </div>
            <div className="relative">
              <LockKeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                {...register("password")}
                autoComplete="current-password"
                className={`${errors.password ? "ring-destructive focus-visible:ring-destructive focus-visible:border-destructive border-destructive" : ""} pl-9 h-10 text-xs`}
              />
            </div>
            {errors.password && (
              <p className="m-2 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-0.5">
            <Checkbox />
            <label
              htmlFor="remember"
              className="text-xs text-muted-foreground cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-10 text-xs font-semibold gap-2 mt-2 disabled:bg-primary/40"
          >
            {submitting ? (
              <ButtonLoader />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRightIcon className="size-4" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
