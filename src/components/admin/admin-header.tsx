import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AdminHeaderProps {
  title: string;
  description: string;
  badge?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AdminHeader({
  title,
  description,
  badge = "Management",
  actionLabel,
  onAction,
}: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ArrowLeft className="size-3" />
            <span>Admin</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <Badge variant="subtle" className="text-[10px]">
            {badge}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" className="gap-1.5 text-xs shrink-0">
          <Plus className="size-4" />
          <span>{actionLabel}</span>
        </Button>
      )}
    </div>
  );
}
