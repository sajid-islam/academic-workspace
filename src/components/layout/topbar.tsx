"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MagnifyingGlass,
  Bell,
  Sun,
  Moon,
  Laptop,
  SignOut,
  User,
  GearSix,
  ShieldCheck,
  CheckCircle,
  WarningCircle,
  List,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";

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

export function Topbar({ onOpenMobileNav }: { onOpenMobileNav?: () => void }) {
  const pathname = usePathname();
  const { theme, setTheme, setIsSearchOpen, student, notices } = useWorkspace();
  const { toast } = useToast();

  const currentRouteMeta = pathTitles[pathname] || {
    title: pathname.split("/").pop()?.replace(/-/g, " ") || "Overview",
    category: pathname.startsWith("/admin") ? "Administration" : "Workspace",
  };

  const urgentNotices = notices.filter((n) => n.priority === "Urgent" || n.isPinned);

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
        {/* Global Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-2.5 sm:px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <MagnifyingGlass className="size-4 shrink-0" />
          <span className="hidden md:inline">Search anything...</span>
          <kbd className="hidden sm:inline-flex h-4 items-center gap-0.5 rounded border border-border bg-background px-1 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Popover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="relative rounded-lg text-muted-foreground hover:text-foreground"
              aria-label="View notifications"
            >
              <Bell className="size-4" />
              {urgentNotices.length > 0 && (
                <span className="absolute top-1 right-1 size-2 rounded-full bg-rose-500 ring-2 ring-background" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2">
            <div className="flex items-center justify-between px-2 py-1.5">
              <DropdownMenuLabel className="p-0 text-xs font-semibold">
                Department Notices
              </DropdownMenuLabel>
              <Badge variant="subtle" className="text-[10px]">
                {notices.length} updates
              </Badge>
            </div>
            <DropdownMenuSeparator />
            <div className="space-y-1.5 py-1">
              {notices.slice(0, 3).map((notice) => (
                <Link
                  key={notice.id}
                  href="/notices"
                  className="block p-2 rounded-md hover:bg-muted/70 transition-colors text-left"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-medium text-foreground truncate">
                      {notice.title}
                    </span>
                    <Badge
                      variant={notice.priority === "Urgent" ? "destructive" : "secondary"}
                      className="text-[10px] shrink-0"
                    >
                      {notice.priority}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                    {notice.content}
                  </p>
                  <span className="text-[10px] text-muted-foreground/80 mt-1 block">
                    {notice.date} · {notice.author}
                  </span>
                </Link>
              ))}
            </div>
            <DropdownMenuSeparator />
            <Link
              href="/notices"
              className="block w-full py-1.5 text-center text-xs font-medium text-primary hover:underline"
            >
              View all department notices →
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-lg text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "light" && <Sun className="size-4" />}
              {theme === "dark" && <Moon className="size-4" />}
              {theme === "system" && <Laptop className="size-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuLabel className="text-xs">Theme</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                setTheme("light");
                toast({ title: "Light mode enabled", type: "info" });
              }}
              className="gap-2 text-xs"
            >
              <Sun className="size-4 text-amber-500" />
              <span>Light</span>
              {theme === "light" && <span className="ml-auto text-[10px]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark");
                toast({ title: "Dark mode enabled", type: "info" });
              }}
              className="gap-2 text-xs"
            >
              <Moon className="size-4 text-indigo-400" />
              <span>Dark</span>
              {theme === "dark" && <span className="ml-auto text-[10px]">✓</span>}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("system");
                toast({ title: "System theme synced", type: "info" });
              }}
              className="gap-2 text-xs"
            >
              <Laptop className="size-4 text-muted-foreground" />
              <span>System</span>
              {theme === "system" && <span className="ml-auto text-[10px]">✓</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
                <span className="text-[11px] text-muted-foreground font-mono truncate">
                  Roll: {student.roll}
                </span>
                <span className="text-[10px] text-primary truncate">
                  CSE · Fall 2026
                </span>
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
