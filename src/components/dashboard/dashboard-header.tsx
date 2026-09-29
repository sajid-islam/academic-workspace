"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkle,
  Plus,
  UploadSimple,
  CalendarCheck,
  FileImage,
  BookOpenText,
  Clock,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";

export function DashboardHeader({ onUploadPaper }: { onUploadPaper: () => void }) {
  const { student, questionPapers, exams, routine } = useWorkspace();

  // Get current hour for greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Today's classes count
  const todayClassesCount = routine.filter((r) => r.day === "Monday").length;
  const nextExam = exams.find((e) => !e.isPast);

  return (
    <div className="flex flex-col gap-5 border-b border-border/70 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {student.department} · {student.session}
            </span>
            <Badge variant="subtle" className="text-[10px] font-mono">
              Sec {student.section}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
            {greeting}, {student.name.split(" ")[0]}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Here is your academic overview for today. 3 classes scheduled and midterm season approaching.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={onUploadPaper}
            className="text-xs gap-1.5 shadow-xs"
          >
            <UploadSimple className="size-4" />
            <span>Upload Paper</span>
          </Button>

          <Button
            asChild
            variant="outline"
            className="text-xs gap-1.5"
          >
            <Link href="/notes">
              <Plus className="size-4" />
              <span>Share Notes</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card/60">
          <div className="size-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <CalendarCheck className="size-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-bold text-foreground block leading-tight">
              {todayClassesCount} Classes
            </span>
            <span className="text-[11px] text-muted-foreground truncate block">
              Scheduled Today
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card/60">
          <div className="size-9 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Clock className="size-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-bold text-foreground block leading-tight">
              Oct 12
            </span>
            <span className="text-[11px] text-muted-foreground truncate block">
              Midterm Begins
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card/60">
          <div className="size-9 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <FileImage className="size-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-bold text-foreground block leading-tight">
              {questionPapers.length} Papers
            </span>
            <span className="text-[11px] text-muted-foreground truncate block">
              Archive Total
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg border border-border/60 bg-card/60">
          <div className="size-9 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <BookOpenText className="size-5" />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-bold text-foreground block leading-tight">
              6 Subjects
            </span>
            <span className="text-[11px] text-muted-foreground truncate block">
              Current Semester
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
