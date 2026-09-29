"use client";

import * as React from "react";
import Link from "next/link";
import {
  Student,
  Books,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  BellRinging,
  ShieldCheck,
  ArrowRight,
  Plus,
  CheckCircle,
  Clock,
  ArrowSquareOut,
  Sparkle,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";

export default function AdminDashboardPage() {
  const { students, subjects, questionPapers, notes, resources, notices } =
    useWorkspace();

  const statCards = [
    {
      title: "Students",
      count: students.length,
      label: "Enrolled in Fall 2026",
      href: "/admin/students",
      icon: Student,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Course Subjects",
      count: subjects.length,
      label: "Active credit courses",
      href: "/admin/subjects",
      icon: Books,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Question Papers",
      count: questionPapers.length,
      label: "Archived image papers",
      href: "/admin/question-papers",
      icon: FileImage,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Class Notes",
      count: notes.length,
      label: "Handwritten & PDF notes",
      href: "/admin/notes",
      icon: BookOpenText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Learning Resources",
      count: resources.length,
      label: "Videos, books & tools",
      href: "/admin/resources",
      icon: FolderSimpleStar,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500/10",
    },
    {
      title: "Department Notices",
      count: notices.length,
      label: "Published announcements",
      href: "/admin/notices",
      icon: BellRinging,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500/10",
    },
  ];

  // Recent system activity audit log
  const recentActivities = [
    {
      action: "New Question Paper Uploaded",
      detail: "CSE 1101 Class Test 2 — Pointers and Dynamic Allocation (1 image)",
      actor: "Sajidul Islam (260104018)",
      time: "2 hours ago",
      icon: FileImage,
      badge: "Question Paper",
    },
    {
      action: "Official Circular Published",
      detail: "Midterm Examination Schedule Announcement — Fall 2026",
      actor: "Controller of Examinations",
      time: "Yesterday",
      icon: BellRinging,
      badge: "Urgent Notice",
    },
    {
      action: "New Class Notes Contributed",
      detail: "Complete Dynamic Memory & Double Pointers Guide (14 pages)",
      actor: "Sajidul Islam (260104018)",
      time: "2 days ago",
      icon: BookOpenText,
      badge: "Notes",
    },
    {
      action: "Curated Resource Added",
      detail: "CS50: Introduction to Computer Science — Memory & C",
      actor: "Md. Rahim Hasan (260104001)",
      time: "3 days ago",
      icon: FolderSimpleStar,
      badge: "Resource",
    },
    {
      action: "New Student Enrolled",
      detail: "Zubair Rahman (Roll: 260104050, Section B)",
      actor: "Academic Registrar",
      time: "Sep 20, 2026",
      icon: Student,
      badge: "Student",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Department Admin
            </span>
            <Badge variant="warning" className="text-[10px]">
              Administrative Workspace
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Admin Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage students, curriculum subjects, archived question papers, class schedules, and notices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="text-xs gap-1.5">
            <Link href="/">
              <span>Exit Admin</span>
              <ArrowSquareOut className="size-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" className="text-xs gap-1.5">
            <Link href="/admin/notices">
              <Plus className="size-3.5" />
              <span>Publish Notice</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* 6 Core Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs group flex items-start justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </span>
                <span className="text-3xl font-extrabold text-foreground block leading-none">
                  {stat.count}
                </span>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>

              <div
                className={`size-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
              >
                <Icon className="size-6" weight="fill" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Navigation Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Management Shortcuts */}
        <div className="p-5 rounded-2xl border border-border/80 bg-card space-y-4">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            <span>Management Modules</span>
          </h2>
          <div className="space-y-1.5">
            {[
              { label: "Manage Student Roster", href: "/admin/students", count: `${students.length} students` },
              { label: "Course Curriculum & Faculty", href: "/admin/subjects", count: `${subjects.length} courses` },
              { label: "Archived Question Papers", href: "/admin/question-papers", count: `${questionPapers.length} papers` },
              { label: "Class Notes Library", href: "/admin/notes", count: `${notes.length} notes` },
              { label: "Recommended Resources", href: "/admin/resources", count: `${resources.length} links` },
              { label: "Weekly Class Routine Slots", href: "/admin/routine", count: "Timetable grid" },
              { label: "Examination Schedules", href: "/admin/exams", count: "Midterm dates" },
              { label: "Department Announcements", href: "/admin/notices", count: `${notices.length} notices` },
            ].map((m) => (
              <Link
                key={m.label}
                href={m.href}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/50 hover:bg-muted/60 transition-colors text-xs text-foreground group"
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {m.label}
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {m.count} →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Department Audit & Activity Log */}
        <div className="lg:col-span-2 p-5 rounded-2xl border border-border/80 bg-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Clock className="size-4 text-primary" />
              <span>Recent System Activity & Submissions</span>
            </h2>
            <Badge variant="subtle" className="text-[10px]">
              Live Audit Log
            </Badge>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act, i) => {
              const Icon = act.icon;

              return (
                <div
                  key={i}
                  className="flex items-start justify-between p-3 rounded-xl border border-border/60 bg-muted/20 text-xs"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground truncate">
                          {act.action}
                        </span>
                        <Badge variant="outline" className="text-[10px]">
                          {act.badge}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mt-0.5 truncate">
                        {act.detail}
                      </p>
                      <span className="text-[10px] text-muted-foreground/80 block mt-1">
                        By {act.actor} · {act.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
