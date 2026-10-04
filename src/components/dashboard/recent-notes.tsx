"use client";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import { BookOpenText, BookmarkSimple, DownloadSimple } from "@phosphor-icons/react";
import Link from "next/link";

export function RecentNotes() {
  const { notes, subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();
  const recentNotes = notes.slice(0, 3);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Recent Notes</h2>
          <p className="text-xs text-muted-foreground">Class summaries & formula sheets</p>
        </div>
        <Link
          href="/notes"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>All Notes</span>
          <span>→</span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {recentNotes.map((note) => {
          const subject = subjects.find((s) => s.id === note.subjectId);
          const bookmarked = isBookmarked(note.id);

          return (
            <div
              key={note.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <BookOpenText className="size-5" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{subject?.code}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {note.type}
                    </Badge>
                  </div>

                  <Link
                    href="/notes"
                    className="text-xs font-semibold text-foreground truncate mt-0.5 block hover:text-primary transition-colors"
                  >
                    {note.title}
                  </Link>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                    <span>By {note.author}</span>
                    <span>·</span>
                    <span>
                      {note.pages} pages ({note.fileSize})
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-2">
                <button
                  onClick={() => {
                    const next = toggleBookmark(note.id, "note");
                    toast({
                      title: next ? "Bookmarked note" : "Removed bookmark",
                      type: "info",
                    });
                  }}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label="Bookmark note"
                >
                  <BookmarkSimple className="size-4" weight={bookmarked ? "fill" : "regular"} />
                </button>

                <button
                  onClick={() => {
                    toast({
                      title: "Download Started",
                      description: `Downloading "${note.title}" (${note.fileSize})`,
                      type: "success",
                    });
                  }}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label="Download note"
                >
                  <DownloadSimple className="size-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
