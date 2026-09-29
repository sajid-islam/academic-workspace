"use client";

import * as React from "react";
import {
  BookOpenText,
  DownloadSimple,
  BookmarkSimple,
  CheckCircle,
  CalendarBlank,
  User,
  FilePdf,
  ShareNetwork,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { Note } from "@/types/note";

interface NoteViewerDialogProps {
  note: Note | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NoteViewerDialog({ note, open, onOpenChange }: NoteViewerDialogProps) {
  const { subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();

  if (!note) return null;

  const subject = subjects.find((s) => s.id === note.subjectId);
  const bookmarked = isBookmarked(note.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-border bg-card">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-primary">
                {subject?.code}
              </span>
              <Badge variant="secondary" className="text-[10px]">
                {note.type}
              </Badge>
              <Badge variant="outline" className="text-[10px]">
                {note.format}
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
            >
              <BookmarkSimple
                className="size-5"
                weight={bookmarked ? "fill" : "regular"}
              />
            </button>
          </div>

          <DialogTitle className="text-base sm:text-lg font-bold text-foreground mt-2 leading-snug">
            {note.title}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground mt-0.5">
            Topic: {note.topic} · {subject?.name}
          </DialogDescription>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/60">
            <span className="flex items-center gap-1.5">
              <User className="size-3.5 text-muted-foreground/70" />
              <span>{note.author} ({note.authorRoll})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarBlank className="size-3.5 text-muted-foreground/70" />
              <span>{note.date}</span>
            </span>
            <span>{note.pages} Pages</span>
            <span>{note.fileSize}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Summary Box */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Overview & Scope
            </h4>
            <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed bg-muted/40 p-3.5 rounded-lg border border-border/60">
              {note.summary}
            </p>
          </div>

          {/* Key Topics & Takeaways */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Key Concepts & Syllabus Takeaways
            </h4>
            <div className="space-y-1.5">
              {note.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2 rounded-md bg-card border border-border/50 text-xs text-foreground"
                >
                  <CheckCircle className="size-4 text-emerald-500 shrink-0 mt-0.5" weight="fill" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter className="p-4 border-t border-border bg-card flex items-center justify-between sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              toast({
                title: "Link Copied",
                description: "Link copied to clipboard",
                type: "info",
              });
            }}
            className="text-xs gap-1.5"
          >
            <ShareNetwork className="size-4" />
            <span>Share Link</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                toast({
                  title: "Downloading Document",
                  description: `Downloading "${note.title}" (${note.fileSize})`,
                  type: "success",
                });
              }}
              className="text-xs gap-1.5"
            >
              <DownloadSimple className="size-4" />
              <span>Download {note.format}</span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
