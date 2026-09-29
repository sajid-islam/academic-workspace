"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileImage,
  BookmarkSimple,
  ArrowRight,
  Eye,
  Images,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";

export function RecentQuestionPapers() {
  const { questionPapers, subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();
  const recentPapers = questionPapers.slice(0, 4);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">
            Recent Question Papers
          </h2>
          <p className="text-xs text-muted-foreground">
            Image-only archived exam papers shared by your session
          </p>
        </div>
        <Link
          href="/question-papers"
          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
        >
          <span>View All Papers</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {recentPapers.map((paper) => {
          const subject = subjects.find((s) => s.id === paper.subjectId);
          const bookmarked = isBookmarked(paper.id);

          return (
            <div
              key={paper.id}
              className="group flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              {/* Actual Image Thumbnail Container */}
              <Link
                href={`/question-papers/${paper.id}`}
                className="relative block aspect-[4/3] bg-muted/50 overflow-hidden border-b border-border/60"
              >
                {/* Visual Image Render */}
                <img
                  src={paper.images[0]}
                  alt={`${subject?.code} ${paper.examType} ${paper.year} Question Paper page`}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <Badge variant="default" className="text-[10px] bg-black/75 text-white backdrop-blur-xs border-0">
                    {paper.examType} · {paper.year}
                  </Badge>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-medium backdrop-blur-xs">
                  <Images className="size-3" />
                  <span>{paper.pagesCount} {paper.pagesCount > 1 ? "pages" : "page"}</span>
                </div>
              </Link>

              {/* Details & Metadata */}
              <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[11px] font-mono font-bold text-primary">
                      {subject?.code}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const next = toggleBookmark(paper.id, "paper");
                        toast({
                          title: next ? "Bookmarked paper" : "Removed bookmark",
                          type: "info",
                        });
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors p-0.5 rounded"
                      aria-label="Bookmark question paper"
                    >
                      <BookmarkSimple
                        className="size-4"
                        weight={bookmarked ? "fill" : "regular"}
                      />
                    </button>
                  </div>

                  <Link
                    href={`/question-papers/${paper.id}`}
                    className="text-xs font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors mt-0.5 block"
                  >
                    {paper.title || `${subject?.name} ${paper.examType}`}
                  </Link>

                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Uploaded by {paper.uploadedBy}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{paper.uploadedAt}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="size-3" />
                    {paper.views} views
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
