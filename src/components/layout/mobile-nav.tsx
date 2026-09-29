"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  DotsThreeCircle,
  Books,
  CalendarDots,
  ClockAfternoon,
  BellRinging,
  BookmarkSimple,
  UserCircle,
  GearSix,
  ShieldCheck,
  X,
  GraduationCap,
} from "@phosphor-icons/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { WORKSPACE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isMoreOpen: boolean;
  setIsMoreOpen: (open: boolean) => void;
}

export function MobileNav({ isMoreOpen, setIsMoreOpen }: MobileNavProps) {
  const pathname = usePathname();

  const primaryMobileTabs = [
    { label: "Home", href: "/", icon: House, exact: true },
    { label: "Papers", href: "/question-papers", icon: FileImage },
    { label: "Notes", href: "/notes", icon: BookOpenText },
    { label: "Resources", href: "/resources", icon: FolderSimpleStar },
  ];

  const secondaryLinks = [
    { label: "Subjects", href: "/subjects", icon: Books },
    { label: "Class Routine", href: "/routine", icon: CalendarDots },
    { label: "Exam Routine", href: "/exams", icon: ClockAfternoon },
    { label: "Notices", href: "/notices", icon: BellRinging },
    { label: "Bookmarks", href: "/bookmarks", icon: BookmarkSimple },
    { label: "Student Profile", href: "/profile", icon: UserCircle },
    { label: "Settings", href: "/settings", icon: GearSix },
    { label: "Admin Portal", href: "/admin", icon: ShieldCheck },
  ];

  return (
    <>
      {/* Bottom Fixed Navigation Bar (Mobile only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-border bg-background/95 backdrop-blur-md flex items-center justify-around px-2 pb-safe">
        {primaryMobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn("size-5 mb-0.5", isActive ? "text-primary" : "")}
                weight={isActive ? "fill" : "regular"}
              />
              <span>{tab.label}</span>
            </Link>
          );
        })}

        {/* 'More' Button */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 text-[11px] font-medium transition-colors",
            isMoreOpen
              ? "text-primary font-semibold"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Open more menu"
        >
          <DotsThreeCircle
            className={cn("size-5 mb-0.5", isMoreOpen ? "text-primary" : "")}
            weight={isMoreOpen ? "fill" : "regular"}
          />
          <span>More</span>
        </button>
      </nav>

      {/* "More" Drawer Sheet */}
      <Sheet open={isMoreOpen} onOpenChange={setIsMoreOpen}>
        <SheetContent side="bottom" className="rounded-t-2xl max-h-[85vh] p-0 overflow-hidden">
          <SheetHeader className="p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <GraduationCap className="size-4" weight="fill" />
              </div>
              <div>
                <SheetTitle className="text-sm font-semibold text-left">
                  {WORKSPACE_CONFIG.name} · {WORKSPACE_CONFIG.session}
                </SheetTitle>
                <p className="text-xs text-muted-foreground text-left">
                  {WORKSPACE_CONFIG.department}
                </p>
              </div>
            </div>
          </SheetHeader>

          <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2">
              Workspace Navigation
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {secondaryLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 p-2.5 rounded-lg border text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 border-primary/30 text-primary font-semibold"
                        : "border-border/60 hover:bg-muted text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0 text-primary" weight={isActive ? "fill" : "regular"} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
