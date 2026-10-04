"use client";

import { getResourceIcon } from "@/components/dashboard/recent-resources";
import { NoteViewerDialog } from "@/components/notes/note-viewer-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import { Note } from "@/types/note";
import {
  ArrowSquareOut,
  BookmarkSimple,
  BookOpenText,
  FileImage,
  FolderSimpleStar,
  Images,
  Trash,
} from "@phosphor-icons/react";
import Link from "next/link";
import * as React from "react";

export default function BookmarksPage() {
  const { bookmarks, questionPapers, notes, resources, subjects, toggleBookmark } = useWorkspace();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = React.useState<"all" | "papers" | "notes" | "resources">("all");
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [isNoteViewerOpen, setIsNoteViewerOpen] = React.useState(false);

  // Resolve bookmarked items
  const bookmarkedPapers = questionPapers.filter((p) =>
    bookmarks.some((b) => b.id === p.id && b.type === "paper"),
  );
  const bookmarkedNotes = notes.filter((n) =>
    bookmarks.some((b) => b.id === n.id && b.type === "note"),
  );
  const bookmarkedResources = resources.filter((r) =>
    bookmarks.some((b) => b.id === r.id && b.type === "resource"),
  );

  const totalCount = bookmarkedPapers.length + bookmarkedNotes.length + bookmarkedResources.length;

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Personal Collection
            </span>
            <Badge variant="subtle" className="text-[10px]">
              {totalCount} Saved Items
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Saved Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Your saved question papers, lecture notes, and learning resources for quick revision.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-5">
        <TabsList className="grid grid-cols-4 max-w-md h-10">
          <TabsTrigger value="all" className="text-xs gap-1.5">
            <span>All</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {totalCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="papers" className="text-xs gap-1.5">
            <span>Papers</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {bookmarkedPapers.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-xs gap-1.5">
            <span>Notes</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {bookmarkedNotes.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resources" className="text-xs gap-1.5">
            <span>Links</span>
            <Badge variant="subtle" className="text-[10px] px-1 py-0">
              {bookmarkedResources.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: All */}
        <TabsContent value="all" className="space-y-6">
          {totalCount === 0 ? (
            <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-card/40">
              <BookmarkSimple className="size-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-sm font-semibold">No bookmarks saved yet</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Click the bookmark icon on any paper, note, or resource to save it here.
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link href="/question-papers">Browse Archives</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Papers section */}
              {bookmarkedPapers.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <FileImage className="size-4 text-primary" />
                    <span>Saved Question Papers ({bookmarkedPapers.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {bookmarkedPapers.map((paper) => {
                      const subject = subjects.find((s) => s.id === paper.subjectId);
                      return (
                        <div
                          key={paper.id}
                          className="group rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs hover:border-primary/50 transition-colors"
                        >
                          <Link
                            href={`/question-papers/${paper.id}`}
                            className="relative block aspect-[4/3] bg-muted/60 overflow-hidden"
                          >
                            <img
                              src={paper.images[0]}
                              alt={paper.title}
                              className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge
                                variant="default"
                                className="text-[10px] bg-black/80 text-white border-0"
                              >
                                {paper.examType} · {paper.year}
                              </Badge>
                            </div>
                            <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px]">
                              <Images className="size-3" />
                              <span>{paper.pagesCount}p</span>
                            </div>
                          </Link>
                          <div className="p-3 flex items-center justify-between">
                            <div className="min-w-0 pr-2">
                              <span className="text-xs font-bold text-primary block">
                                {subject?.code}
                              </span>
                              <Link
                                href={`/question-papers/${paper.id}`}
                                className="text-xs font-semibold text-foreground truncate block hover:text-primary transition-colors"
                              >
                                {paper.title || `${paper.examType} Exam`}
                              </Link>
                            </div>
                            <button
                              onClick={() => {
                                toggleBookmark(paper.id, "paper");
                                toast({ title: "Bookmark removed", type: "info" });
                              }}
                              className="p-1 rounded text-muted-foreground hover:text-rose-600 transition-colors shrink-0"
                              title="Remove bookmark"
                            >
                              <Trash className="size-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Notes section */}
              {bookmarkedNotes.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <BookOpenText className="size-4 text-blue-600 dark:text-blue-400" />
                    <span>Saved Notes ({bookmarkedNotes.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarkedNotes.map((note) => {
                      const subject = subjects.find((s) => s.id === note.subjectId);
                      return (
                        <div
                          key={note.id}
                          className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-primary">
                                {subject?.code}
                              </span>
                              <Badge variant="secondary" className="text-[10px]">
                                {note.type}
                              </Badge>
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
                            <div className="flex items-center gap-1">
                              <Button
                                size="xs"
                                variant="ghost"
                                onClick={() => {
                                  setSelectedNote(note);
                                  setIsNoteViewerOpen(true);
                                }}
                              >
                                View Note
                              </Button>
                              <button
                                onClick={() => {
                                  toggleBookmark(note.id, "note");
                                  toast({ title: "Bookmark removed", type: "info" });
                                }}
                                className="p-1 text-muted-foreground hover:text-rose-600"
                              >
                                <Trash className="size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Resources section */}
              {bookmarkedResources.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <FolderSimpleStar className="size-4 text-amber-600 dark:text-amber-400" />
                    <span>Saved Resources ({bookmarkedResources.length})</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarkedResources.map((res) => {
                      const subject = subjects.find((s) => s.id === res.subjectId);
                      return (
                        <div
                          key={res.id}
                          className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="size-6 rounded bg-muted flex items-center justify-center">
                                  {getResourceIcon(res.type)}
                                </div>
                                <span className="text-xs font-bold text-primary">
                                  {subject?.code}
                                </span>
                              </div>
                              <Badge variant="outline" className="text-[10px] capitalize">
                                {res.type}
                              </Badge>
                            </div>
                            <h4 className="text-sm font-semibold text-foreground mt-2">
                              {res.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                              {res.description}
                            </p>
                          </div>
                          <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-xs">
                            <a
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Open Resource</span>
                              <ArrowSquareOut className="size-3.5" />
                            </a>
                            <button
                              onClick={() => {
                                toggleBookmark(res.id, "resource");
                                toast({ title: "Bookmark removed", type: "info" });
                              }}
                              className="p-1 text-muted-foreground hover:text-rose-600"
                            >
                              <Trash className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Papers Only */}
        <TabsContent value="papers">
          {bookmarkedPapers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bookmarkedPapers.map((paper) => {
                const subject = subjects.find((s) => s.id === paper.subjectId);
                return (
                  <div
                    key={paper.id}
                    className="group rounded-xl border border-border/80 bg-card overflow-hidden shadow-2xs"
                  >
                    <Link
                      href={`/question-papers/${paper.id}`}
                      className="relative block aspect-[4/3] bg-muted/60 overflow-hidden"
                    >
                      <img
                        src={paper.images[0]}
                        alt={paper.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge
                          variant="default"
                          className="text-[10px] bg-black/80 text-white border-0"
                        >
                          {paper.examType} · {paper.year}
                        </Badge>
                      </div>
                    </Link>
                    <div className="p-3 flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-bold text-primary block">
                          {subject?.code}
                        </span>
                        <Link
                          href={`/question-papers/${paper.id}`}
                          className="text-xs font-semibold text-foreground truncate block hover:text-primary transition-colors"
                        >
                          {paper.title || `${paper.examType} Exam`}
                        </Link>
                      </div>
                      <button
                        onClick={() => {
                          toggleBookmark(paper.id, "paper");
                          toast({ title: "Bookmark removed", type: "info" });
                        }}
                        className="p-1 rounded text-muted-foreground hover:text-rose-600 transition-colors shrink-0"
                      >
                        <Trash className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              No question papers bookmarked.
            </p>
          )}
        </TabsContent>

        {/* Tab 3: Notes Only */}
        <TabsContent value="notes">
          {bookmarkedNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedNotes.map((note) => {
                const subject = subjects.find((s) => s.id === note.subjectId);
                return (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary">{subject?.code}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {note.type}
                        </Badge>
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
                      <div className="flex items-center gap-1">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => {
                            setSelectedNote(note);
                            setIsNoteViewerOpen(true);
                          }}
                        >
                          View Note
                        </Button>
                        <button
                          onClick={() => {
                            toggleBookmark(note.id, "note");
                            toast({ title: "Bookmark removed", type: "info" });
                          }}
                          className="p-1 text-muted-foreground hover:text-rose-600"
                        >
                          <Trash className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">No notes bookmarked.</p>
          )}
        </TabsContent>

        {/* Tab 4: Resources Only */}
        <TabsContent value="resources">
          {bookmarkedResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedResources.map((res) => {
                const subject = subjects.find((s) => s.id === res.subjectId);
                return (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl border border-border/80 bg-card hover:border-primary/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded bg-muted flex items-center justify-center">
                            {getResourceIcon(res.type)}
                          </div>
                          <span className="text-xs font-bold text-primary">{subject?.code}</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {res.type}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-foreground mt-2">{res.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {res.description}
                      </p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-xs">
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Open Resource</span>
                        <ArrowSquareOut className="size-3.5" />
                      </a>
                      <button
                        onClick={() => {
                          toggleBookmark(res.id, "resource");
                          toast({ title: "Bookmark removed", type: "info" });
                        }}
                        className="p-1 text-muted-foreground hover:text-rose-600"
                      >
                        <Trash className="size-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              No learning resources bookmarked.
            </p>
          )}
        </TabsContent>
      </Tabs>

      <NoteViewerDialog
        note={selectedNote}
        open={isNoteViewerOpen}
        onOpenChange={setIsNoteViewerOpen}
      />
    </div>
  );
}
