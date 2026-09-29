"use client";

import * as React from "react";
import Link from "next/link";
import {
  User,
  GraduationCap,
  CalendarBlank,
  EnvelopeSimple,
  Phone,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  GearSix,
  CheckCircle,
  ShieldCheck,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWorkspace } from "@/context/workspace-context";

export default function ProfilePage() {
  const { student, questionPapers, notes, resources } = useWorkspace();

  const userPapers = questionPapers.filter(
    (p) => p.uploadedByRoll === student.roll || p.uploadedBy === student.name
  );
  const userNotes = notes.filter(
    (n) => n.authorRoll === student.roll || n.author === student.name
  );
  const userResources = resources.filter(
    (r) => r.addedByRoll === student.roll || r.addedBy === student.name
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Student ID #{student.roll}
            </span>
            <Badge variant="success" className="text-[10px]">
              {student.status}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Student Profile
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Your university identity, department session records, and shared academic contributions.
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs shrink-0">
          <Link href="/settings">
            <GearSix className="size-4" />
            <span>Edit Settings</span>
          </Link>
        </Button>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          <Avatar className="size-24 border-2 border-primary/20 shrink-0">
            <AvatarImage src={student.avatarUrl} alt={student.name} />
            <AvatarFallback className="text-2xl font-bold">
              {student.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
              <Badge variant="default" className="text-xs">
                Class Representative
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground font-mono">
              Roll: {student.roll} · Section {student.section}
            </p>

            <p className="text-xs text-foreground/90 leading-relaxed max-w-xl pt-1">
              {student.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="size-4 text-primary" />
                <span>{student.department}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarBlank className="size-4 text-primary" />
                <span>{student.session} (Joined {student.joinedDate})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-border/60 text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 border border-border/50">
            <EnvelopeSimple className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-muted-foreground block">
                Official Student Email
              </span>
              <span className="font-semibold text-foreground truncate block">
                {student.email}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/30 border border-border/50">
            <Phone className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-[11px] text-muted-foreground block">
                Contact Number
              </span>
              <span className="font-semibold text-foreground truncate block">
                {student.phone}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Statistics */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Academic Contributions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border/80 bg-card flex items-center gap-4">
            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileImage className="size-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground block leading-tight">
                {userPapers.length}
              </span>
              <span className="text-xs text-muted-foreground block">
                Question Papers Shared
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-card flex items-center gap-4">
            <div className="size-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <BookOpenText className="size-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground block leading-tight">
                {userNotes.length}
              </span>
              <span className="text-xs text-muted-foreground block">
                Class Notes Contributed
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-border/80 bg-card flex items-center gap-4">
            <div className="size-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <FolderSimpleStar className="size-6" />
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground block leading-tight">
                {userResources.length}
              </span>
              <span className="text-xs text-muted-foreground block">
                Learning Resources Added
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Uploads List */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Recent Personal Uploads
        </h3>

        <div className="space-y-2">
          {userPapers.map((paper) => (
            <div
              key={paper.id}
              className="p-3.5 rounded-xl border border-border/70 bg-card flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <FileImage className="size-4 text-primary shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">
                    {paper.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground block">
                    {paper.examType} · {paper.year} · {paper.pagesCount} images
                  </span>
                </div>
              </div>
              <Button asChild size="xs" variant="outline">
                <Link href={`/question-papers/${paper.id}`}>View</Link>
              </Button>
            </div>
          ))}

          {userNotes.map((note) => (
            <div
              key={note.id}
              className="p-3.5 rounded-xl border border-border/70 bg-card flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <BookOpenText className="size-4 text-blue-600 shrink-0" />
                <div>
                  <span className="font-semibold text-foreground">
                    {note.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground block">
                    {note.topic} · {note.type} · {note.fileSize}
                  </span>
                </div>
              </div>
              <Button asChild size="xs" variant="outline">
                <Link href="/notes">View Notes</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
