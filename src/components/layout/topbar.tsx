"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";
import {
  GearSix,
  List,
  ShieldCheck,
  SignOut,
  SpeakerHighIcon,
  SpeakerSlashIcon,
  User,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeSwitcher from "../common/theme-switcher";

const pathTitles: Record<string, { title: string; category?: string }> = {
  "/": { title: "Dashboard", category: "Workspace" },
  "/question-papers": { title: "Question Papers", category: "Academic Archives" },
  "/notes": { title: "Class Notes", category: "Study Material" },
  "/resources": { title: "Learning Resources", category: "Reference" },
  "/subjects": { title: "Course Subjects", category: "Curriculum" },
  "/routine": { title: "Class Routine", category: "Schedule" },
  "/exams": { title: "Exam Schedule", category: "Assessments" },
  "/notices": { title: "Department Notices", category: "Announcements" },
  "/bookmarks": { title: "Saved Bookmarks", category: "Personal" },
  "/profile": { title: "Student Profile", category: "Account" },
  "/settings": { title: "Settings", category: "Preferences" },
  "/admin": { title: "Admin Overview", category: "Administration" },
  "/admin/students": { title: "Manage Students", category: "Admin" },
  "/admin/subjects": { title: "Manage Subjects", category: "Admin" },
  "/admin/question-papers": { title: "Manage Papers", category: "Admin" },
  "/admin/notes": { title: "Manage Notes", category: "Admin" },
  "/admin/resources": { title: "Manage Resources", category: "Admin" },
  "/admin/routine": { title: "Manage Routine", category: "Admin" },
  "/admin/exams": { title: "Manage Exams", category: "Admin" },
  "/admin/notices": { title: "Publish Notices", category: "Admin" },
};

const setInitialSoundStateValue = () => {
  return localStorage.getItem("sound") === "true";
};

export function Topbar({ onOpenMobileNav }: { onOpenMobileNav?: () => void }) {
  const pathname = usePathname();
  const { student } = useWorkspace();
  const [soundOn, setSoundOn] = useState<boolean>(setInitialSoundStateValue);

  const currentRouteMeta = pathTitles[pathname] || {
    title: pathname.split("/").pop()?.replace(/-/g, " ") || "Overview",
    category: pathname.startsWith("/admin") ? "Administration" : "Workspace",
  };

  const handleSoundOn = () => {
    setSoundOn((prev) => {
      const newValue = !prev;
      localStorage.setItem("sound", String(newValue));

      window.dispatchEvent(
        new CustomEvent("sound-change", {
          detail: newValue,
        }),
      );
      return newValue;
    });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Menu Trigger + Breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden shrink-0"
          onClick={onOpenMobileNav}
          aria-label="Open mobile navigation"
        >
          <List className="size-5" />
        </Button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="truncate">{currentRouteMeta.category}</span>
            <span>/</span>
            <span className="font-semibold text-foreground truncate capitalize">
              {currentRouteMeta.title}
            </span>
          </div>
          <h1 className="text-sm font-semibold tracking-tight text-foreground sm:text-base truncate capitalize">
            {currentRouteMeta.title}
          </h1>
        </div>
      </div>

      {/* Right: Search + Notifications + Theme + User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Popover */}
        <button onClick={handleSoundOn} className="text-muted-foreground hover:text-foreground">
          {soundOn ? (
            <SpeakerHighIcon className="size-4" />
          ) : (
            <SpeakerSlashIcon className="size-4" />
          )}
        </button>

        {/* Theme Toggle Dropdown */}
        <ThemeSwitcher />

        {/* User Profile Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label="User profile menu"
            >
              <Avatar className="size-8">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-1.5">
            <div className="flex items-center gap-2.5 p-2">
              <Avatar className="size-9">
                <AvatarImage src={student.avatarUrl} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-foreground truncate">
                  {student.name}
                </span>
                <span className="text-[11px] text-muted-foreground truncate">
                  Roll: {student.roll}
                </span>
                <span className="text-[10px] text-primary truncate">CSE · Fall 2026</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="gap-2 text-xs cursor-pointer">
                  <User className="size-4 text-muted-foreground" />
                  <span>Student Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="gap-2 text-xs cursor-pointer">
                  <GearSix className="size-4 text-muted-foreground" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin" className="gap-2 text-xs cursor-pointer">
                  <ShieldCheck className="size-4 text-amber-600" />
                  <span>Admin Portal</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="gap-2 text-xs text-rose-600 cursor-pointer">
                <SignOut className="size-4" />
                <span>Switch / Sign Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
