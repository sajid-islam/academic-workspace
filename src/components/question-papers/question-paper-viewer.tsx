"use client";

import * as React from "react";
import Link from "next/link";
import {
  MagnifyingGlassPlus,
  MagnifyingGlassMinus,
  ArrowsClockwise,
  ArrowsOut,
  ArrowsIn,
  DownloadSimple,
  Archive,
  CaretLeft,
  CaretRight,
  BookmarkSimple,
  ArrowLeft,
  Images,
  Eye,
  CalendarBlank,
  User,
  Hash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface QuestionPaperViewerProps {
  paperId: string;
}

export function QuestionPaperViewer({ paperId }: QuestionPaperViewerProps) {
  const { questionPapers, subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();

  const paper = questionPapers.find((p) => p.id === paperId) || questionPapers[0];
  const subject = subjects.find((s) => s.id === paper?.subjectId);

  const [activePageIndex, setActivePageIndex] = React.useState(0);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const bookmarked = paper ? isBookmarked(paper.id) : false;

  const totalPages = paper?.images.length || 1;

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActivePageIndex((prev) => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActivePageIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalPages]);

  if (!paper) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <h2 className="text-lg font-semibold">Question Paper Not Found</h2>
        <p className="text-xs text-muted-foreground mt-1">
          This paper may have been removed or does not exist.
        </p>
        <Button asChild className="mt-4" size="sm">
          <Link href="/question-papers">Back to Question Papers</Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col space-y-4 animate-in fade-in-50 duration-300",
        isFullscreen && "bg-background p-4 h-screen fixed inset-0 z-50 overflow-hidden"
      )}
    >
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border/70 bg-card">
        <div className="flex items-center gap-3 min-w-0">
          <Button asChild variant="ghost" size="icon-sm" className="shrink-0">
            <Link href="/question-papers" aria-label="Back to papers catalog">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="text-[10px]">
                {paper.examType} · {paper.year}
              </Badge>
              <span className="text-xs font-mono font-bold text-primary">
                {subject?.code}
              </span>
              <span className="text-xs text-muted-foreground hidden md:inline truncate">
                · {subject?.name}
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-semibold text-foreground truncate mt-0.5">
              {paper.title || `${subject?.name} ${paper.examType} ${paper.year}`}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-center">
          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-muted/40 p-0.5">
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
              title="Zoom out (-)"
              disabled={zoomLevel <= 0.5}
            >
              <MagnifyingGlassMinus className="size-4" />
            </button>
            <span className="px-1.5 text-[11px] font-mono font-medium text-foreground select-none">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
              title="Zoom in (+)"
              disabled={zoomLevel >= 3}
            >
              <MagnifyingGlassPlus className="size-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-background transition-colors"
              title="Reset Zoom (0)"
            >
              <ArrowsClockwise className="size-4" />
            </button>
          </div>

          {/* Fullscreen */}
          <button
            onClick={handleToggleFullscreen}
            className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <ArrowsIn className="size-4" />
            ) : (
              <ArrowsOut className="size-4" />
            )}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => {
              const next = toggleBookmark(paper.id, "paper");
              toast({
                title: next ? "Bookmarked paper" : "Removed bookmark",
                type: "info",
              });
            }}
            className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            title="Bookmark Paper"
          >
            <BookmarkSimple
              className="size-4"
              weight={bookmarked ? "fill" : "regular"}
            />
          </button>

          {/* Download Current Page */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Trigger real download for current image
              const link = document.createElement("a");
              link.href = paper.images[activePageIndex];
              link.download = `${subject?.code}_${paper.examType}_${paper.year}_page_${activePageIndex + 1}.svg`;
              link.click();
              toast({
                title: "Page Downloaded",
                description: `Downloaded page ${activePageIndex + 1} of ${totalPages}`,
                type: "success",
              });
            }}
            className="text-xs gap-1.5 hidden md:inline-flex"
          >
            <DownloadSimple className="size-4" />
            <span>Page {activePageIndex + 1}</span>
          </Button>

          {/* Download All Pages */}
          <Button
            size="sm"
            onClick={() => {
              paper.images.forEach((img, i) => {
                const link = document.createElement("a");
                link.href = img;
                link.download = `${subject?.code}_${paper.examType}_${paper.year}_page_${i + 1}.svg`;
                link.click();
              });
              toast({
                title: "All Pages Downloaded",
                description: `Downloaded all ${totalPages} pages for ${subject?.code}`,
                type: "success",
              });
            }}
            className="text-xs gap-1.5"
          >
            <Archive className="size-4" />
            <span>Download All ({totalPages})</span>
          </Button>
        </div>
      </div>

      {/* Main Viewing Workspace */}
      <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-[600px]">
        {/* Desktop Thumbnail Sidebar */}
        <aside className="hidden lg:flex flex-col w-52 shrink-0 rounded-xl border border-border/70 bg-card p-3 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Images className="size-4 text-primary" />
              <span>Pages ({totalPages})</span>
            </span>
            <span className="text-[10px] text-muted-foreground font-mono">
              Page {activePageIndex + 1} of {totalPages}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {paper.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActivePageIndex(idx)}
                className={cn(
                  "w-full text-left rounded-lg overflow-hidden border transition-all duration-200 group relative block",
                  activePageIndex === idx
                    ? "border-primary ring-2 ring-primary/20 shadow-xs"
                    : "border-border/60 hover:border-border opacity-75 hover:opacity-100"
                )}
              >
                <div className="relative aspect-[3/4] bg-muted/50 overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={`Thumbnail page ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/75 text-white text-[10px] font-mono">
                    p. {idx + 1}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Quick Paper Metadata Sidebar Card */}
          <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground space-y-1.5">
            <div className="flex items-center justify-between">
              <span>Uploader:</span>
              <span className="font-medium text-foreground truncate max-w-[100px]">
                {paper.uploadedBy}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Date:</span>
              <span className="font-medium text-foreground">{paper.uploadedAt}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Marks:</span>
              <span className="font-medium text-foreground">{paper.totalMarks || 70}</span>
            </div>
          </div>
        </aside>

        {/* Central Stage Canvas */}
        <div className="flex-1 flex flex-col items-center justify-between rounded-xl border border-border/70 bg-muted/30 p-4 sm:p-6 overflow-hidden relative min-h-[550px]">
          {/* Previous / Next Float Buttons */}
          <button
            onClick={() => setActivePageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={activePageIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full border border-border bg-background/90 shadow-md flex items-center justify-center text-foreground hover:bg-background disabled:opacity-30 disabled:pointer-events-none transition-opacity"
            title="Previous page (Left arrow)"
          >
            <CaretLeft className="size-5" />
          </button>

          <button
            onClick={() => setActivePageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={activePageIndex === totalPages - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full border border-border bg-background/90 shadow-md flex items-center justify-center text-foreground hover:bg-background disabled:opacity-30 disabled:pointer-events-none transition-opacity"
            title="Next page (Right arrow)"
          >
            <CaretRight className="size-5" />
          </button>

          {/* Scalable Image Viewport */}
          <div className="flex-1 w-full flex items-center justify-center overflow-auto p-2">
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
                transition: "transform 0.15s ease-out",
              }}
              className="max-w-2xl w-full shadow-xl rounded-md overflow-hidden bg-white"
            >
              <img
                src={paper.images[activePageIndex]}
                alt={`${subject?.code} Examination Question Paper - Page ${activePageIndex + 1}`}
                className="w-full h-auto block select-none"
              />
            </div>
          </div>

          {/* Bottom Floating Navigation Pill */}
          <div className="mt-4 z-10 flex items-center gap-2 rounded-full border border-border bg-background/90 backdrop-blur-md px-4 py-1.5 shadow-md">
            <button
              onClick={() => setActivePageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activePageIndex === 0}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <CaretLeft className="size-4" />
            </button>
            <span className="text-xs font-mono font-medium text-foreground select-none">
              Page {activePageIndex + 1} of {totalPages}
            </span>
            <button
              onClick={() => setActivePageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={activePageIndex === totalPages - 1}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <CaretRight className="size-4" />
            </button>
          </div>

          {/* Mobile Horizontal Thumbnail Strip */}
          <div className="lg:hidden w-full flex items-center gap-2 overflow-x-auto pt-3 pb-1">
            {paper.images.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActivePageIndex(idx)}
                className={cn(
                  "relative w-16 aspect-[3/4] shrink-0 rounded-md overflow-hidden border transition-all",
                  activePageIndex === idx
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border/60 opacity-60"
                )}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 px-1 text-[9px] bg-black/75 text-white font-mono">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
