"use client";

import * as React from "react";
import Link from "next/link";
import {
  Books,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  User,
  EnvelopeSimple,
  MapPin,
  Clock,
  ArrowLeft,
  UploadSimple,
  Plus,
  Images,
  BookmarkSimple,
  Eye,
  DownloadSimple,
  ArrowSquareOut,
  CheckCircle,
} from "@phosphor-icons/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { AddPaperDialog } from "@/components/question-papers/add-paper-dialog";
import { AddNoteDialog } from "@/components/notes/add-note-dialog";
import { AddResourceDialog } from "@/components/resources/add-resource-dialog";
import { NoteViewerDialog } from "@/components/notes/note-viewer-dialog";
import { getResourceIcon } from "@/components/dashboard/recent-resources";
import { Note } from "@/types/note";

interface SubjectDetailViewProps {
  subjectId: string;
}

export function SubjectDetailView({ subjectId }: SubjectDetailViewProps) {
  const { subjects, questionPapers, notes, resources, isBookmarked, toggleBookmark } =
    useWorkspace();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = React.useState("overview");
  const [isAddPaperOpen, setIsAddPaperOpen] = React.useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = React.useState(false);
  const [isAddResourceOpen, setIsAddResourceOpen] = React.useState(false);

  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [isNoteViewerOpen, setIsNoteViewerOpen] = React.useState(false);

  const subject = subjects.find((s) => s.id === subjectId) || subjects[0];

  if (!subject) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-base font-semibold">Subject not found</h2>
        <Button asChild className="mt-4" size="sm">
          <Link href="/subjects">Back to Subjects</Link>
        </Button>
      </div>
    );
  }

  // Filtered collections for this subject
  const subjectPapers = questionPapers.filter((p) => p.subjectId === subject.id);
  const subjectNotes = notes.filter((n) => n.subjectId === subject.id);
  const subjectResources = resources.filter((r) => r.subjectId === subject.id);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Button asChild variant="ghost" size="xs" className="gap-1 -ml-1">
            <Link href="/subjects">
              <ArrowLeft className="size-3.5" />
              <span>All Subjects</span>
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                {subject.code}
              </span>
              <Badge variant="outline" className="text-[10px]">
                {subject.type}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {subject.credit.toFixed(1)} Credit Hours
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
              {subject.name}
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              {subject.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={() => setIsAddPaperOpen(true)}
              className="gap-1.5 text-xs"
            >
              <UploadSimple className="size-3.5" />
              <span>Upload Paper</span>
            </Button>
          </div>
        </div>

        {/* Quick Teacher & Schedule Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-border/60 text-xs">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <User className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-foreground block truncate">
                {subject.teacher.name}
              </span>
              <span className="text-[11px] truncate block">
                {subject.teacher.designation}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-muted-foreground">
            <MapPin className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-foreground block truncate">
                {subject.room}
              </span>
              <span className="text-[11px] truncate block">
                Office: {subject.teacher.officeRoom}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Clock className="size-4 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-foreground block truncate">
                {subject.scheduleSummary}
              </span>
              <span className="text-[11px] truncate block">Class Routine</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 h-10">
          <TabsTrigger value="overview" className="text-xs">
            Overview
          </TabsTrigger>
          <TabsTrigger value="papers" className="text-xs gap-1.5">
            <span>Papers</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {subjectPapers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs gap-1.5">
            <span>Notes</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {subjectNotes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs gap-1.5">
            <span>Resources</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {subjectResources.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview & Syllabus */}
        <TabsContent value="overview" className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Syllabus Modules */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Course Syllabus Modules
              </h3>
              <div className="space-y-3">
                {subject.syllabus.map((mod, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-border/80 bg-card space-y-2.5"
                  >
                    <h4 className="text-sm font-semibold text-foreground">
                      {mod.title}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mod.topics.map((t, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle className="size-3.5 text-primary shrink-0" weight="fill" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor Details Card */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Faculty Instructor
              </h3>
              <div className="p-4 rounded-xl border border-border/80 bg-card space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {subject.teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {subject.teacher.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {subject.teacher.designation}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <EnvelopeSimple className="size-4 text-primary" />
                    <span className="truncate">{subject.teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    <span>{subject.teacher.officeRoom}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    window.location.href = `mailto:${subject.teacher.email}`;
                  }}
                >
                  Send Email Inquiry
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Question Papers */}
        <TabsContent value="papers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Previous Question Papers for {subject.code}
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddPaperOpen(true)}
              className="text-xs gap-1"
            >
              <UploadSimple className="size-3.5" />
              <span>Add Paper</span>
            </Button>
          </div>

          {subjectPapers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="group rounded-xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 transition-colors shadow-2xs"
                >
                  <Link
                    href={`/question-papers/${paper.id}`}
                    className="relative block aspect-[4/3] bg-muted/60 overflow-hidden"
                  >
                    <img
                      src={paper.images[0]}
                      alt={paper.title}
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="default" className="text-[10px] bg-black/75 text-white border-0">
                        {paper.examType} · {paper.year}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[10px]">
                      <Images className="size-3" />
                      <span>{paper.pagesCount}p</span>
                    </div>
                  </Link>

                  <div className="p-3">
                    <Link
                      href={`/question-papers/${paper.id}`}
                      className="text-xs font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {paper.title || `${paper.examType} Exam`}
                    </Link>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Uploaded by {paper.uploadedBy} · {paper.uploadedAt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-border bg-card/40">
              <p className="text-xs text-muted-foreground">
                No question papers uploaded for this subject yet.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 text-xs"
                onClick={() => setIsAddPaperOpen(true)}
              >
                Upload First Paper
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Tab 3: Notes */}
        <TabsContent value="notes" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Class Notes for {subject.code}
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddNoteOpen(true)}
              className="text-xs gap-1"
            >
              <Plus className="size-3.5" />
              <span>Share Notes</span>
            </Button>
          </div>

          {subjectNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        {note.type}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {note.pages} pages ({note.fileSize})
                      </span>
                    </div>
                    <h4
                      onClick={() => {
                        setSelectedNote(note);
                        setIsNoteViewerOpen(true);
                      }}
                      className="text-sm font-semibold text-foreground hover:text-primary cursor-pointer transition-colors mt-2"
                    >
                      {note.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {note.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>By {note.author}</span>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => {
                        setSelectedNote(note);
                        setIsNoteViewerOpen(true);
                      }}
                    >
                      Read Note →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-border bg-card/40">
              <p className="text-xs text-muted-foreground">
                No notes uploaded for this course yet.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 text-xs"
                onClick={() => setIsAddNoteOpen(true)}
              >
                Share First Note
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Tab 4: Resources */}
        <TabsContent value="resources" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Learning Resources for {subject.code}
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddResourceOpen(true)}
              className="text-xs gap-1"
            >
              <Plus className="size-3.5" />
              <span>Add Resource</span>
            </Button>
          </div>

          {subjectResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectResources.map((res) => (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded bg-muted flex items-center justify-center">
                          {getResourceIcon(res.type)}
                        </div>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {res.type}
                        </Badge>
                      </div>

                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <span>Open</span>
                        <ArrowSquareOut className="size-3.5" />
                      </a>
                    </div>

                    <h4 className="text-sm font-semibold text-foreground mt-2.5">
                      {res.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border/60 text-[11px] text-muted-foreground">
                    <span>Added by {res.addedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-border bg-card/40">
              <p className="text-xs text-muted-foreground">
                No external resources added for this course yet.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 text-xs"
                onClick={() => setIsAddResourceOpen(true)}
              >
                Add Resource Link
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddPaperDialog open={isAddPaperOpen} onOpenChange={setIsAddPaperOpen} />
      <AddNoteDialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen} />
      <AddResourceDialog open={isAddResourceOpen} onOpenChange={setIsAddResourceOpen} />
      <NoteViewerDialog
        note={selectedNote}
        open={isNoteViewerOpen}
        onOpenChange={setIsNoteViewerOpen}
      />
    </div>
  );
}
