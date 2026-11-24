"use client";

import { adminNavigation, studentNavigation } from "@/config/navigation";
import { WORKSPACE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useGetMeQuery } from "@/redux/apis/user/user.slice";
import { GraduationCapIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const { data: user } = useGetMeQuery();
  const navGroups = isAdmin ? adminNavigation : studentNavigation;

  return (
    <aside className="hidden lg:flex w-60 flex-col shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground h-screen sticky top-0 select-none">
      {/* Workspace Brand Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs shrink-0">
          <GraduationCapIcon className="size-5" weight="fill" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm tracking-tight text-foreground truncate">
              {WORKSPACE_CONFIG.departmentShort} Workspace
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-primary/10 text-primary font-medium shrink-0">
              {isAdmin ? "Admin" : "Fall '26"}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground truncate">
            {WORKSPACE_CONFIG.university}
          </span>
        </div>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            <p className="px-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors group relative",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground",
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={cn(
                          "size-4 shrink-0 transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                        weight={isActive ? "fill" : "regular"}
                      />
                      <span className="truncate">{item.title}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded font-medium",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mode Switcher / Admin Quick Switch */}
      <div className="p-3 border-t border-sidebar-border bg-sidebar/50">
        {/* User Card Pill */}
        <div className=" flex items-center gap-2.5 px-2 pb-1.5 rounded-md bg-muted/30">
          <button
            className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="User profile menu"
          >
            <Avatar className="size-8 rounded-sm">
              <AvatarImage src={user?.user_image} alt={user?.name} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium truncate text-foreground">{user?.name}</span>
            <span className="text-[10px] text-muted-foreground truncate">
              ID: {user?.student_id} · Roll {user?.roll}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
