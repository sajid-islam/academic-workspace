"use client";

import { LoginFormPanel } from "./components/login-form-panel";
import { LoginShowcasePanel } from "./components/login-showcase-panel";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      <LoginShowcasePanel />
      <LoginFormPanel />
    </div>
  );
}
