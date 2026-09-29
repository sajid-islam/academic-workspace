"use client";

import * as React from "react";
import {
  BellRinging,
  PushPin,
  CalendarBlank,
  User,
  Paperclip,
  MagnifyingGlass,
  ArrowSquareOut,
  DownloadSimple,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { Notice, NoticePriority } from "@/types/notice";

export default function NoticesPage() {
  const { notices } = useWorkspace();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedPriority, setSelectedPriority] = React.useState<string>("all");
  const [selectedNotice, setSelectedNotice] = React.useState<Notice | null>(null);

  const filteredNotices = React.useMemo(() => {
    return notices.filter((n) => {
      const matchesPriority =
        selectedPriority === "all" || n.priority === selectedPriority;
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        n.title.toLowerCase().includes(query) ||
        n.content.toLowerCase().includes(query) ||
        n.author.toLowerCase().includes(query) ||
        n.category.toLowerCase().includes(query);

      return matchesPriority && matchesQuery;
    });
  }, [notices, searchQuery, selectedPriority]);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Department Circulars
            </span>
            <Badge variant="destructive" className="text-[10px]">
              Active Broadcast
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Department Notices & Circulars
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Official announcements, exam seat plans, lab maintenance schedules, and faculty notices.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search notices by title, keyword, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {["all", "Urgent", "Important", "Normal"].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPriority(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedPriority === p
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "all" ? "All Priorities" : p}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Stream */}
      <div className="space-y-3.5">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => setSelectedNotice(notice)}
            className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5 min-w-0">
                <div
                  className={`size-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    notice.priority === "Urgent"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                      : notice.priority === "Important"
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <BellRinging className="size-4" weight="fill" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={
                        notice.priority === "Urgent"
                          ? "destructive"
                          : notice.priority === "Important"
                          ? "warning"
                          : "secondary"
                      }
                      className="text-[10px]"
                    >
                      {notice.priority}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {notice.category}
                    </Badge>
                    {notice.isPinned && (
                      <span className="flex items-center gap-1 text-[11px] text-primary font-medium">
                        <PushPin className="size-3" weight="fill" />
                        Pinned
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mt-2">
                    {notice.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                    {notice.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-muted-foreground/80 mt-3 pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>{notice.author} ({notice.authorRole})</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarBlank className="size-3" />
                      <span>{notice.date}</span>
                    </span>
                    {notice.attachments && notice.attachments.length > 0 && (
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <Paperclip className="size-3" />
                        <span>{notice.attachments.length} attachment(s)</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 pt-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read full →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notice Detail Dialog */}
      <Dialog
        open={Boolean(selectedNotice)}
        onOpenChange={(open) => !open && setSelectedNotice(null)}
      >
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          {selectedNotice && (
            <>
              <DialogHeader className="p-6 pb-4 border-b border-border bg-card">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      selectedNotice.priority === "Urgent"
                        ? "destructive"
                        : selectedNotice.priority === "Important"
                        ? "warning"
                        : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {selectedNotice.priority}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {selectedNotice.category}
                  </Badge>
                </div>
                <DialogTitle className="text-base sm:text-lg font-bold text-foreground mt-2 leading-snug">
                  {selectedNotice.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  Published by {selectedNotice.author} · {selectedNotice.authorRole}
                </DialogDescription>
              </DialogHeader>

              <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed whitespace-pre-line bg-muted/30 p-4 rounded-xl border border-border/60">
                  {selectedNotice.content}
                </p>

                {selectedNotice.attachments && selectedNotice.attachments.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                      Attached Circular Files
                    </span>
                    <div className="space-y-1.5">
                      {selectedNotice.attachments.map((att, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card text-xs"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Paperclip className="size-4 text-primary shrink-0" />
                            <span className="truncate font-medium">{att.name}</span>
                            <span className="text-[10px] text-muted-foreground">
                              ({att.size})
                            </span>
                          </div>
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Downloading Attachment",
                                description: `Downloaded ${att.name}`,
                                type: "success",
                              });
                            }}
                            className="gap-1 shrink-0"
                          >
                            <DownloadSimple className="size-3" />
                            <span>Download</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="p-4 border-t border-border bg-card">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedNotice(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
