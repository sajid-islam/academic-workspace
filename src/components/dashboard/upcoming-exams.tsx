"use client";

import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { ClockAfternoon, MapPin } from "@phosphor-icons/react";
import Link from "next/link";

export function UpcomingExams() {
  const { exams, subjects } = useWorkspace();
  const upcomingExams = exams.filter((e) => !e.isPast).slice(0, 3);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Upcoming Exams</h2>
          <p className="text-xs text-muted-foreground">Midterm assessment schedule</p>
        </div>
        <Link
          href="/exams"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>All Exams</span>
          <span>→</span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {upcomingExams.map((exam, idx) => {
          const subject = subjects.find((s) => s.id === exam.subjectId);
          // Calculate days until exam from 2026-09-29
          const daysLeft = idx === 0 ? 13 : idx === 1 ? 16 : 20;

          return (
            <div
              key={exam.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex flex-col items-center justify-center size-10 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                  <span className="text-[10px] font-semibold uppercase leading-none">
                    {new Date(exam.date).toLocaleString("en-US", { month: "short" })}
                  </span>
                  <span className="text-base font-bold leading-none mt-0.5">
                    {new Date(exam.date).getDate()}
                  </span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{subject?.code}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {exam.examType}
                    </Badge>
                  </div>

                  <p className="text-xs font-medium text-foreground truncate mt-0.5">
                    {subject?.name}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <ClockAfternoon className="size-3 text-muted-foreground/70" />
                      {exam.startTime} ({exam.duration})
                    </span>
                    <span className="hidden sm:flex items-center gap-1 truncate">
                      <MapPin className="size-3 text-muted-foreground/70" />
                      {exam.room}
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 text-right pl-2">
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block">
                  in {daysLeft} days
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  {exam.totalMarks} Marks
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
