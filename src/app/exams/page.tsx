"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import { CheckCircle, ClockAfternoon, DownloadSimple, MapPin, Timer } from "@phosphor-icons/react";
import * as React from "react";

export default function ExamsPage() {
  const { exams, subjects } = useWorkspace();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = React.useState<"upcoming" | "all" | "past">("upcoming");

  const upcomingExams = exams.filter((e) => !e.isPast);
  const pastExams = exams.filter((e) => e.isPast);

  const displayedExams =
    activeTab === "upcoming" ? upcomingExams : activeTab === "past" ? pastExams : exams;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Examination Cell
            </span>
            <Badge variant="warning" className="text-[10px]">
              Midterm Approaching
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Exam Routine & Schedule
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Official departmental examination timetable, seat halls, and syllabus scope.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Exam Routine Downloaded",
              description: "PDF copy of Midterm routine saved to device",
              type: "success",
            });
          }}
          className="gap-2 shrink-0 text-xs"
        >
          <DownloadSimple className="size-4" />
          <span>Download PDF Routine</span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as any)}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 max-w-sm">
          <TabsTrigger value="upcoming" className="text-xs gap-1.5">
            <span>Upcoming</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {upcomingExams.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs gap-1.5">
            <span>All</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {exams.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="text-xs gap-1.5">
            <span>Past</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {pastExams.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="space-y-3">
            {displayedExams.map((exam, idx) => {
              const subject = subjects.find((s) => s.id === exam.subjectId);
              const daysDiff = Math.ceil(
                (new Date(exam.date).getTime() - new Date("2026-09-29").getTime()) /
                  (1000 * 60 * 60 * 24),
              );

              return (
                <div
                  key={exam.id}
                  className={`p-5 rounded-xl border bg-card transition-all duration-200 ${
                    !exam.isPast
                      ? "border-border/80 hover:border-primary/50 shadow-2xs"
                      : "border-border/50 opacity-80"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Date pill + Subject details */}
                    <div className="flex items-start gap-4">
                      {/* Date Block */}
                      <div
                        className={`flex flex-col items-center justify-center size-14 rounded-xl border shrink-0 font-bold ${
                          !exam.isPast
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-wider font-semibold">
                          {new Date(exam.date).toLocaleString("en-US", { month: "short" })}
                        </span>
                        <span className="text-xl leading-none mt-0.5">
                          {new Date(exam.date).getDate()}
                        </span>
                        <span className="text-[9px] text-muted-foreground">
                          {new Date(exam.date).getFullYear()}
                        </span>
                      </div>

                      {/* Subject and exam info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-primary">{subject?.code}</span>
                          <Badge
                            variant={
                              exam.examType === "Final"
                                ? "destructive"
                                : exam.examType === "Midterm"
                                  ? "warning"
                                  : "secondary"
                            }
                            className="text-[10px]"
                          >
                            {exam.examType}
                          </Badge>
                          <span className="text-xs font-medium text-muted-foreground">
                            {exam.totalMarks} Marks
                          </span>
                        </div>

                        <h2 className="text-base font-bold text-foreground mt-1">
                          {subject?.name}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <ClockAfternoon className="size-3.5 text-muted-foreground/70" />
                            {exam.startTime} – {exam.endTime} ({exam.duration})
                          </span>
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="size-3.5 text-muted-foreground/70" />
                            {exam.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Countdown badge / status */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-3 lg:pt-0 border-border/60">
                      {!exam.isPast ? (
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 font-semibold text-xs border border-amber-500/30">
                            <Timer className="size-3.5" />
                            <span>In {daysDiff} days</span>
                          </div>
                          <span className="block text-[11px] text-muted-foreground mt-1">
                            Admit card available Oct 5
                          </span>
                        </div>
                      ) : (
                        <div className="text-right">
                          <Badge variant="subtle" className="text-xs gap-1">
                            <CheckCircle className="size-3.5 text-emerald-500" />
                            <span>Exam Concluded</span>
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Syllabus Scope */}
                  {exam.syllabusTopics && exam.syllabusTopics.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/60">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                        Syllabus Highlights:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {exam.syllabusTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/50"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
