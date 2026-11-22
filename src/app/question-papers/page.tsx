"use client";

import { AddPaperDialog } from "@/components/question-papers/add-paper-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@yusufceng1z/ding-react";
import { useWorkspace } from "@/context/workspace-context";
import {
  BookmarkSimple,
  Eye,
  FileImage,
  Images,
  MagnifyingGlass,
  UploadSimple,
} from "@phosphor-icons/react";
import Link from "next/link";
import * as React from "react";

export default function QuestionPapersPage() {
  const { questionPapers, subjects, isBookmarked, toggleBookmark } = useWorkspace();

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState<string>("all");
  const [selectedExamType, setSelectedExamType] = React.useState<string>("all");
  const [selectedYear, setSelectedYear] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<"newest" | "year" | "views">("newest");

  // Filtering
  const filteredPapers = React.useMemo(() => {
    return questionPapers
      .filter((paper) => {
        const matchesSubject = selectedSubject === "all" || paper.subjectId === selectedSubject;
        const matchesType = selectedExamType === "all" || paper.examType === selectedExamType;
        const matchesYear = selectedYear === "all" || paper.year.toString() === selectedYear;

        const subject = subjects.find((s) => s.id === paper.subjectId);
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          paper.title?.toLowerCase().includes(query) ||
          paper.examType.toLowerCase().includes(query) ||
          paper.year.toString().includes(query) ||
          paper.uploadedBy.toLowerCase().includes(query) ||
          subject?.code.toLowerCase().includes(query) ||
          subject?.name.toLowerCase().includes(query);

        return matchesSubject && matchesType && matchesYear && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        }
        if (sortBy === "year") {
          return b.year - a.year;
        }
        if (sortBy === "views") {
          return (b.views || 0) - (a.views || 0);
        }
        return 0;
      });
  }, [
    questionPapers,
    subjects,
    searchQuery,
    selectedSubject,
    selectedExamType,
    selectedYear,
    sortBy,
  ]);

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Archives
            </span>
            <Badge variant="default" className="text-[10px]">
              Image-Only Repository
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Question Papers
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Previous exam papers shared by your session. Every paper is preserved as high-resolution
            original images.
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="gap-2 shrink-0">
          <UploadSimple className="size-4" />
          <span>Upload Paper</span>
        </Button>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search papers by subject, year, or term..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Dropdowns */}
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
                {sub.code} ({sub.counts.questionPapers})
              </option>
            ))}
          </select>

          {/* Exam Type Filter */}
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Exam Types</option>
            <option value="Midterm">Midterm</option>
            <option value="Final">Semester Final</option>
            <option value="Quiz">Quiz</option>
            <option value="Class Test">Class Test</option>
            <option value="Assignment">Assignment</option>
          </select>

          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="newest">Sort: Recently Added</option>
            <option value="year">Sort: Exam Year</option>
            <option value="views">Sort: Most Viewed</option>
          </select>
        </div>
      </div>

      {/* Grid of Papers */}
      {filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPapers.map((paper) => {
            const subject = subjects.find((s) => s.id === paper.subjectId);
            const bookmarked = isBookmarked(paper.id);

            return (
              <div
                key={paper.id}
                className="group flex flex-col rounded-xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                {/* Real Image Thumbnail */}
                <Link
                  href={`/question-papers/${paper.id}`}
                  className="relative block aspect-[4/3] bg-muted/60 overflow-hidden border-b border-border/60"
                >
                  <img
                    src={paper.images[0]}
                    alt={`${subject?.code} ${paper.examType} ${paper.year} Question Paper`}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlaid Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <Badge
                      variant="default"
                      className="text-[10px] bg-black/80 text-white backdrop-blur-xs border-0"
                    >
                      {paper.examType} · {paper.year}
                    </Badge>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-medium backdrop-blur-xs">
                    <Images className="size-3" />
                    <span>
                      {paper.pagesCount} {paper.pagesCount > 1 ? "pages" : "page"}
                    </span>
                  </div>
                </Link>

                {/* Information Card Body */}
                <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-primary">{subject?.code}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          const next = toggleBookmark(paper.id, "paper");
                          toast.info(next ? "Bookmarked paper" : "Removed bookmark");
                        }}
                        className="text-muted-foreground hover:text-primary transition-colors p-1 rounded hover:bg-muted"
                        aria-label="Bookmark paper"
                      >
                        <BookmarkSimple
                          className="size-4"
                          weight={bookmarked ? "fill" : "regular"}
                        />
                      </button>
                    </div>

                    <Link
                      href={`/question-papers/${paper.id}`}
                      className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors mt-0.5 block"
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
                      {paper.views || 0} views
                    </span>
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
            <FileImage className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No question papers found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">
            Try adjusting your search query, clearing filters, or upload the first paper for this
            course.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("all");
                setSelectedExamType("all");
                setSelectedYear("all");
              }}
            >
              Clear Filters
            </Button>
            <Button size="sm" onClick={() => setIsAddOpen(true)}>
              Upload Question Paper
            </Button>
          </div>
        </div>
      )}

      {/* Upload Dialog */}
      <AddPaperDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
