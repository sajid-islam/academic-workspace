"use client";

import { AddNoteDialog } from "@/components/notes/add-note-dialog";
import { NoteViewerDialog } from "@/components/notes/note-viewer-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import { Note } from "@/types/note";
import {
  BookmarkSimple,
  BookOpenText,
  DownloadSimple,
  Eye,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import * as React from "react";

export default function NotesPage() {
  const { notes, subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState<string>("all");
  const [selectedType, setSelectedType] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"newest" | "title" | "downloads">("newest");

  const filteredNotes = React.useMemo(() => {
    return notes
      .filter((note) => {
        const matchesSubject = selectedSubject === "all" || note.subjectId === selectedSubject;
        const matchesType = selectedType === "all" || note.type === selectedType;

        const subject = subjects.find((s) => s.id === note.subjectId);
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          note.title.toLowerCase().includes(query) ||
          note.topic.toLowerCase().includes(query) ||
          note.author.toLowerCase().includes(query) ||
          note.summary.toLowerCase().includes(query) ||
          subject?.code.toLowerCase().includes(query) ||
          subject?.name.toLowerCase().includes(query);

        return matchesSubject && matchesType && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (sortBy === "downloads") {
          return b.downloadsCount - a.downloadsCount;
        }
        if (sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [notes, subjects, searchQuery, selectedSubject, selectedType, sortBy]);

  const handleOpenNote = (note: Note) => {
    setSelectedNote(note);
    setIsViewerOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Study Material
            </span>
            <Badge variant="subtle" className="text-[10px]">
              {notes.length} Documents
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Class Notes & Summaries
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            High-yield lecture summaries, handwritten cheat sheets, and lab guides contributed by
            students.
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="gap-2 shrink-0">
          <Plus className="size-4" />
          <span>Add Note</span>
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search notes by title, topic, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code} ({sub.counts.notes})
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Note Types</option>
            <option value="Lecture Notes">Lecture Notes</option>
            <option value="Summary">Summary</option>
            <option value="Formula Sheet">Formula Sheet</option>
            <option value="Lab Report">Lab Report</option>
            <option value="Handwritten">Handwritten</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="newest">Sort: Recently Added</option>
            <option value="downloads">Sort: Most Downloaded</option>
            <option value="title">Sort: Title Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => {
            const subject = subjects.find((s) => s.id === note.subjectId);
            const bookmarked = isBookmarked(note.id);

            return (
              <div
                key={note.id}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-primary">{subject?.code}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {note.type}
                      </Badge>
                    </div>

                    <button
                      onClick={() => {
                        const next = toggleBookmark(note.id, "note");
                        toast({
                          title: next ? "Bookmarked note" : "Removed bookmark",
                          type: "info",
                        });
                      }}
                      className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Bookmark note"
                    >
                      <BookmarkSimple className="size-4" weight={bookmarked ? "fill" : "regular"} />
                    </button>
                  </div>

                  <h3
                    onClick={() => handleOpenNote(note)}
                    className="text-sm font-semibold text-foreground cursor-pointer group-hover:text-primary transition-colors mt-2 line-clamp-2"
                  >
                    {note.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                    {note.summary}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <div className="min-w-0">
                    <span className="font-medium text-foreground block truncate">
                      {note.author}
                    </span>
                    <span className="text-muted-foreground/80 block">
                      {note.date} · {note.pages} pages ({note.fileSize})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleOpenNote(note)}
                      title="Read Note"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon-xs"
                      onClick={() => {
                        toast({
                          title: "Downloading Document",
                          description: `Downloading "${note.title}" (${note.fileSize})`,
                          type: "success",
                        });
                      }}
                      title="Download Note"
                    >
                      <DownloadSimple className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-card/40 my-8">
          <div className="size-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground mb-3">
            <BookOpenText className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No notes found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">
            Try adjusting your search query, clearing filters, or contribute the first note for this
            subject.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("all");
                setSelectedType("all");
              }}
            >
              Clear Filters
            </Button>
            <Button size="sm" onClick={() => setIsAddOpen(true)}>
              Share Notes
            </Button>
          </div>
        </div>
      )}

      {/* Add Note Dialog */}
      <AddNoteDialog open={isAddOpen} onOpenChange={setIsAddOpen} />

      {/* Note Reading Modal */}
      <NoteViewerDialog note={selectedNote} open={isViewerOpen} onOpenChange={setIsViewerOpen} />
    </div>
  );
}
