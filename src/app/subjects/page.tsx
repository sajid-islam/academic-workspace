"use client";

import * as React from "react";
import Link from "next/link";
import {
  Books,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  User,
  ArrowRight,
  Clock,
  MapPin,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";

export default function SubjectsPage() {
  const { subjects, questionPapers, notes, resources } = useWorkspace();

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              1st Year · 1st Semester
            </span>
            <Badge variant="subtle" className="text-[10px]">
              CSE Fall 2026
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Course Subjects
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Active departmental courses, faculty instructors, and associated study repositories.
          </p>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((subject) => {
          // Dynamic counts from live state
          const paperCount = questionPapers.filter((p) => p.subjectId === subject.id).length;
          const noteCount = notes.filter((n) => n.subjectId === subject.id).length;
          const resCount = resources.filter((r) => r.subjectId === subject.id).length;

          return (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-5 hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs block"
            >
              <div>
                {/* Top Code Badge & Credits */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary">
                      {subject.code}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {subject.type}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {subject.credit.toFixed(1)} Credits
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mt-2">
                  {subject.name}
                </h2>

                {/* Teacher Info */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                  <User className="size-3.5 text-muted-foreground/70 shrink-0" />
                  <span className="truncate">{subject.teacher.name}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <MapPin className="size-3.5 text-muted-foreground/70 shrink-0" />
                  <span className="truncate">{subject.room}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2 mt-3 leading-relaxed">
                  {subject.description}
                </p>
              </div>

              {/* Counts Strip & Action Arrow */}
              <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1" title="Question Papers">
                    <FileImage className="size-3.5 text-primary" />
                    <span>{paperCount}</span>
                  </span>
                  <span className="flex items-center gap-1" title="Class Notes">
                    <BookOpenText className="size-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{noteCount}</span>
                  </span>
                  <span className="flex items-center gap-1" title="Learning Resources">
                    <FolderSimpleStar className="size-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{resCount}</span>
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  <span>Open</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
