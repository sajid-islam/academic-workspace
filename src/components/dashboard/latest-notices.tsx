"use client";

import * as React from "react";
import Link from "next/link";
import {
  BellRinging,
  PushPin,
  CalendarBlank,
  Paperclip,
  ArrowRight,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";

export function LatestNotices() {
  const { notices } = useWorkspace();
  const latestNotices = notices.slice(0, 3);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Department Notices
          </h2>
          <p className="text-xs text-muted-foreground">
            Official announcements & exam circulars
          </p>
        </div>
        <Link
          href="/notices"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>All Notices</span>
          <span>→</span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {latestNotices.map((notice) => (
          <Link
            key={notice.id}
            href="/notices"
            className="flex items-start justify-between p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-colors group block"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  notice.priority === "Urgent"
                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    : notice.priority === "Important"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <BellRinging className="size-4" weight="fill" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      notice.priority === "Urgent"
                        ? "destructive"
                        : notice.priority === "Important"
                        ? "warning"
                        : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {notice.priority}
                  </Badge>
                  {notice.isPinned && (
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <PushPin className="size-3 text-primary" weight="fill" />
                      Pinned
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors mt-1 line-clamp-1">
                  {notice.title}
                </h3>

                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">
                  {notice.content}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-muted-foreground/80 mt-1.5">
                  <span>{notice.author}</span>
                  <span>·</span>
                  <span>{notice.date}</span>
                  {notice.attachments && notice.attachments.length > 0 && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-primary">
                        <Paperclip className="size-3" />
                        {notice.attachments.length} attachment
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
