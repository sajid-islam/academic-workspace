"use client";

import { Button } from "@/components/ui/button";
import { List } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { getRouteMeta } from "./route-meta";

interface TopbarBreadcrumbProps {
  onOpenMobileNav?: () => void;
}

export function TopbarBreadcrumb({ onOpenMobileNav }: TopbarBreadcrumbProps) {
  const pathname = usePathname();
  const currentRouteMeta = getRouteMeta(pathname);

  return (
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
  );
}
