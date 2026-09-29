"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  LockKey,
  EnvelopeSimple,
  User,
  Hash,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { WORKSPACE_CONFIG } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [mode, setMode] = React.useState<"login" | "register">("login");
  const [email, setEmail] = React.useState("sajidul.cse26@aust.edu");
  const [password, setPassword] = React.useState("••••••••••");
  const [rememberMe, setRememberMe] = React.useState(true);

  // Register state
  const [regName, setRegName] = React.useState("");
  const [regEmail, setRegEmail] = React.useState("");
  const [regRoll, setRegRoll] = React.useState("");
  const [regSection, setRegSection] = React.useState("A");
  const [regPassword, setRegPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Authenticated Successfully",
      description: "Welcome back, Sajidul Islam (CSE Fall 2026)",
      type: "success",
    });
    router.push("/");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regRoll) {
      toast({
        title: "Required Fields",
        description: "Please complete all registration fields.",
        type: "error",
      });
      return;
    }
    toast({
      title: "Registration Submitted",
      description: `Welcome to CSE Fall 2026, ${regName}! Logged in as student.`,
      type: "success",
    });
    router.push("/");
  };

  const handleQuickLogin = () => {
    setEmail("sajidul.cse26@aust.edu");
    setPassword("password123");
    toast({
      title: "Authenticated as Sajidul Islam",
      description: "Signing into CSE Fall 2026 academic portal...",
      type: "success",
    });
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  return (
    <div className="w-full max-w-md space-y-6 animate-in fade-in-50 duration-300">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="size-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto shadow-md">
          <GraduationCap className="size-7" weight="fill" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {WORKSPACE_CONFIG.name}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {WORKSPACE_CONFIG.department} · {WORKSPACE_CONFIG.session}
          </p>
          <p className="text-[11px] text-muted-foreground/80">
            {WORKSPACE_CONFIG.university}
          </p>
        </div>
      </div>

      {/* Main Auth Card */}
      <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-card shadow-sm space-y-5">
        {/* Toggle Mode Pills */}
        <div className="grid grid-cols-2 p-1 bg-muted/60 rounded-xl border border-border/60">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "login"
                ? "bg-background text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Student Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mode === "register"
                ? "bg-background text-foreground shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Register Student
          </button>
        </div>

        {mode === "login" ? (
          /* Sign In Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Institutional Email
              </label>
              <div className="relative">
                <EnvelopeSimple className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="roll.cse26@aust.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 h-10 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    toast({
                      title: "Password Reset Notice",
                      description:
                        "Please contact CSE Dept System Administrator for password reset.",
                      type: "info",
                    })
                  }
                  className="text-[11px] text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <LockKey className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-9 h-10 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
              />
              <label
                htmlFor="remember"
                className="text-xs text-muted-foreground cursor-pointer select-none"
              >
                Remember this device for 30 days
              </label>
            </div>

            <Button type="submit" className="w-full h-10 text-xs font-semibold gap-2 mt-2">
              <span>Sign In to Academic Workspace</span>
              <ArrowRight className="size-4" />
            </Button>

            {/* Quick Demo Sign-in Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickLogin}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-xs font-medium text-primary transition-colors"
              >
                <CheckCircle className="size-4" weight="fill" />
                <span>Instant Demo: Sign in as Sajidul Islam (CR)</span>
              </button>
            </div>
          </form>
        ) : (
          /* Registration Form */
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. Sajidul Islam"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Student Roll #
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="260104018"
                    value={regRoll}
                    onChange={(e) => setRegRoll(e.target.value)}
                    required
                    className="pl-9 h-9 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Section
                </label>
                <select
                  value={regSection}
                  onChange={(e) => setRegSection(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Institutional Email
              </label>
              <div className="relative">
                <EnvelopeSimple className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="name.cse26@aust.edu"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Create Password
              </label>
              <div className="relative">
                <LockKey className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="At least 8 characters"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-muted/40 border border-border text-[11px] text-muted-foreground">
              Department: <strong>CSE</strong> · Session: <strong>Fall 2026</strong> (Fixed Batch)
            </div>

            <Button type="submit" className="w-full h-9 text-xs font-semibold gap-2 mt-1">
              <span>Complete Registration</span>
              <ArrowRight className="size-4" />
            </Button>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-muted-foreground">
        <span>Protected university academic intranet.</span>{" "}
        <Link href="/" className="text-primary hover:underline font-medium">
          Enter as Guest Viewer
        </Link>
      </div>
    </div>
  );
}
