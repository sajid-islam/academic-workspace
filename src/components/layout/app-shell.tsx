"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  // If on /login, render without app shell chrome
  const isAuthPage = pathname === "/login";

  if (isAuthPage) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center  bg-background">
        {children}
      </main>
    );
  }

  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <Sidebar isAdmin={isAdmin} />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Topbar onOpenMobileNav={() => setIsMobileNavOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Mobile Navigation & Drawer */}
      <MobileNav isMoreOpen={isMobileNavOpen} setIsMoreOpen={setIsMobileNavOpen} />
    </div>
  );
}
