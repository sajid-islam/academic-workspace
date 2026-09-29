"use client";

import * as React from "react";
import {
  CalendarDots,
  Clock,
  MapPin,
  User,
  Funnel,
  ChalkboardTeacher,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/context/workspace-context";
import { DayOfWeek } from "@/types/routine";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];

export default function RoutinePage() {
  const { routine, subjects } = useWorkspace();
  const [selectedDay, setSelectedDay] = React.useState<DayOfWeek | "all">("all");
  const [viewMode, setViewMode] = React.useState<"grid" | "day">("grid");

  // Today is simulated as Monday for this active session
  const currentDay = "Monday";

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Academic Schedule
            </span>
            <Badge variant="subtle" className="text-[10px]">
              Fall 2026 Timetable
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Class Routine
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Weekly class schedules, room allocations, and faculty instructor sessions.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-border p-1 bg-muted/40">
            <button
              onClick={() => {
                setViewMode("grid");
                setSelectedDay("all");
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Week View
            </button>
            <button
              onClick={() => {
                setViewMode("day");
                if (selectedDay === "all") setSelectedDay("Monday");
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                viewMode === "day"
                  ? "bg-background text-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Day View
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {viewMode === "grid" && (
          <button
            onClick={() => setSelectedDay("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedDay === "all"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All Days
          </button>
        )}

        {DAYS.map((day) => {
          const isToday = day === currentDay;
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              onClick={() => {
                setSelectedDay(day);
                if (viewMode === "grid") setViewMode("day");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{day}</span>
              {isToday && (
                <span
                  className={`size-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-emerald-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Week Grid Layout */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DAYS.map((day) => {
            const slots = routine.filter((r) => r.day === day);
            const isToday = day === currentDay;

            return (
              <div
                key={day}
                className={`rounded-2xl border p-4 flex flex-col justify-between transition-colors ${
                  isToday
                    ? "border-primary/40 bg-card shadow-xs ring-1 ring-primary/20"
                    : "border-border/80 bg-card/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-foreground">{day}</h2>
                      {isToday && (
                        <Badge variant="success" className="text-[10px]">
                          Today
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {slots.length} {slots.length === 1 ? "Class" : "Classes"}
                    </span>
                  </div>

                  <div className="space-y-3 mt-3">
                    {slots.map((slot) => {
                      const subject = subjects.find((s) => s.id === slot.subjectId);

                      return (
                        <div
                          key={slot.id}
                          className="p-3 rounded-xl border border-border/60 bg-muted/30 hover:border-primary/40 transition-colors"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-mono font-bold text-primary">
                              {subject?.code}
                            </span>
                            <Badge
                              variant={slot.type === "Lab" ? "secondary" : "outline"}
                              className="text-[10px]"
                            >
                              {slot.type}
                            </Badge>
                          </div>

                          <h3 className="text-xs font-semibold text-foreground mt-1 line-clamp-1">
                            {subject?.name}
                          </h3>

                          <div className="space-y-1 mt-2 text-[11px] text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <Clock className="size-3 text-muted-foreground/70 shrink-0" />
                              <span>{slot.startTime} – {slot.endTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5 truncate">
                              <MapPin className="size-3 text-muted-foreground/70 shrink-0" />
                              <span className="truncate">{slot.room}</span>
                            </div>
                            <div className="flex items-center gap-1.5 truncate">
                              <User className="size-3 text-muted-foreground/70 shrink-0" />
                              <span className="truncate">{slot.teacher}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Day View */
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="p-4 rounded-xl border border-border/80 bg-card flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                {selectedDay} Schedule
              </h2>
              <p className="text-xs text-muted-foreground">
                Detailed timeline for {selectedDay}
              </p>
            </div>
            {selectedDay === currentDay && (
              <Badge variant="success" className="text-xs">
                Active Day (Today)
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            {routine
              .filter((r) => r.day === selectedDay)
              .map((slot, idx) => {
                const subject = subjects.find((s) => s.id === slot.subjectId);

                return (
                  <div
                    key={slot.id}
                    className="p-5 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center justify-center size-12 rounded-xl bg-primary/10 text-primary font-mono font-bold text-xs shrink-0">
                        <span>{slot.startTime.split(" ")[0]}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {slot.startTime.split(" ")[1]}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-primary">
                            {subject?.code}
                          </span>
                          <Badge
                            variant={slot.type === "Lab" ? "secondary" : "outline"}
                            className="text-[10px]"
                          >
                            {slot.type}
                          </Badge>
                        </div>

                        <h3 className="text-sm font-bold text-foreground mt-0.5">
                          {subject?.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {slot.startTime} – {slot.endTime}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5" />
                            {slot.room}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 sm:pt-0 sm:border-l sm:pl-4 border-border/60 text-xs text-muted-foreground sm:text-right">
                      <span className="block font-medium text-foreground">
                        {slot.teacher}
                      </span>
                      <span className="text-[11px] block mt-0.5">
                        Course Instructor
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
