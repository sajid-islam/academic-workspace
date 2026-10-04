"use client";

import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { MapPin, User } from "@phosphor-icons/react";
import Link from "next/link";

export function TodayClasses() {
  const { routine, subjects } = useWorkspace();

  // For demonstration, show Monday classes as "Today"
  const todayClasses = routine.filter((r) => r.day === "Monday");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Today&apos;s Classes</h2>
          <p className="text-xs text-muted-foreground">Monday schedule · 3 theory sessions</p>
        </div>
        <Link
          href="/routine"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>Full Routine</span>
          <span>→</span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {todayClasses.map((item, index) => {
          const subject = subjects.find((s) => s.id === item.subjectId);
          // Realistic statuses for the 3 slots
          const status =
            index === 0
              ? { label: "Completed", variant: "subtle" as const }
              : index === 1
                ? { label: "Live Now", variant: "success" as const }
                : { label: "11:30 AM", variant: "warning" as const };

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex flex-col items-center justify-center size-10 rounded-lg bg-muted border border-border/60 shrink-0 text-[11px] font-bold">
                  <span>{item.startTime.split(" ")[0]}</span>
                  <span className="text-[9px] text-muted-foreground">
                    {item.startTime.split(" ")[1]}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{subject?.code}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      · {subject?.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="size-3 text-muted-foreground/70" />
                      {item.room}
                    </span>
                    <span className="hidden sm:flex items-center gap-1 truncate">
                      <User className="size-3 text-muted-foreground/70" />
                      {item.teacher}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 pl-2">
                <Badge variant={status.variant} className="text-[11px]">
                  {status.label}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
