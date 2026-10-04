"use client";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import { ResourceType } from "@/types/resource";
import {
  ArrowSquareOut,
  BookBookmark,
  BookmarkSimple,
  FilePdf,
  FileText,
  Globe,
  PlayCircle,
  VideoCamera,
} from "@phosphor-icons/react";
import Link from "next/link";

export function getResourceIcon(type: ResourceType) {
  switch (type) {
    case "video":
      return <VideoCamera className="size-4 text-rose-500" />;
    case "playlist":
      return <PlayCircle className="size-4 text-purple-500" />;
    case "website":
      return <Globe className="size-4 text-blue-500" />;
    case "book":
      return <BookBookmark className="size-4 text-amber-500" />;
    case "pdf":
      return <FilePdf className="size-4 text-emerald-500" />;
    case "document":
    default:
      return <FileText className="size-4 text-indigo-500" />;
  }
}

export function RecentResources() {
  const { resources, subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();
  const recentResources = resources.slice(0, 3);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Curated Resources</h2>
          <p className="text-xs text-muted-foreground">Recommended courses, textbooks & tools</p>
        </div>
        <Link
          href="/resources"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>All Resources</span>
          <span>→</span>
        </Link>
      </div>

      <div className="space-y-2.5">
        {recentResources.map((res) => {
          const subject = subjects.find((s) => s.id === res.subjectId);
          const bookmarked = isBookmarked(res.id);

          return (
            <div
              key={res.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50">
                  {getResourceIcon(res.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{subject?.code}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {res.type}
                    </Badge>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-foreground truncate mt-0.5 block hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <span className="truncate">{res.title}</span>
                    <ArrowSquareOut className="size-3 shrink-0 opacity-60" />
                  </a>

                  <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                    {res.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pl-2">
                <button
                  onClick={() => {
                    const next = toggleBookmark(res.id, "resource");
                    toast({
                      title: next ? "Bookmarked resource" : "Removed bookmark",
                      type: "info",
                    });
                  }}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label="Bookmark resource"
                >
                  <BookmarkSimple className="size-4" weight={bookmarked ? "fill" : "regular"} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
