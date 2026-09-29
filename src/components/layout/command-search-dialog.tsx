"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  Books,
  BellRinging,
  ArrowRight,
  X,
  CornersOut,
} from "@phosphor-icons/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";

export function CommandSearchDialog() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen, questionPapers, notes, resources, subjects, notices } =
    useWorkspace();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  const cleanQuery = query.toLowerCase().trim();

  // Search across collections
  const filteredPapers = React.useMemo(() => {
    if (!cleanQuery) return [];
    return questionPapers
      .filter(
        (p) =>
          p.title?.toLowerCase().includes(cleanQuery) ||
          p.examType.toLowerCase().includes(cleanQuery) ||
          p.year.toString().includes(cleanQuery) ||
          p.uploadedBy.toLowerCase().includes(cleanQuery)
      )
      .slice(0, 3);
  }, [cleanQuery, questionPapers]);

  const filteredNotes = React.useMemo(() => {
    if (!cleanQuery) return [];
    return notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(cleanQuery) ||
          n.topic.toLowerCase().includes(cleanQuery) ||
          n.type.toLowerCase().includes(cleanQuery) ||
          n.author.toLowerCase().includes(cleanQuery)
      )
      .slice(0, 3);
  }, [cleanQuery, notes]);

  const filteredResources = React.useMemo(() => {
    if (!cleanQuery) return [];
    return resources
      .filter(
        (r) =>
          r.title.toLowerCase().includes(cleanQuery) ||
          r.type.toLowerCase().includes(cleanQuery) ||
          r.description.toLowerCase().includes(cleanQuery) ||
          r.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
      .slice(0, 3);
  }, [cleanQuery, resources]);

  const filteredSubjects = React.useMemo(() => {
    if (!cleanQuery) return [];
    return subjects
      .filter(
        (s) =>
          s.code.toLowerCase().includes(cleanQuery) ||
          s.name.toLowerCase().includes(cleanQuery) ||
          s.teacher.name.toLowerCase().includes(cleanQuery)
      )
      .slice(0, 3);
  }, [cleanQuery, subjects]);

  const filteredNotices = React.useMemo(() => {
    if (!cleanQuery) return [];
    return notices
      .filter(
        (nt) =>
          nt.title.toLowerCase().includes(cleanQuery) ||
          nt.content.toLowerCase().includes(cleanQuery) ||
          nt.category.toLowerCase().includes(cleanQuery)
      )
      .slice(0, 2);
  }, [cleanQuery, notices]);

  const hasResults =
    filteredPapers.length > 0 ||
    filteredNotes.length > 0 ||
    filteredResources.length > 0 ||
    filteredSubjects.length > 0 ||
    filteredNotices.length > 0;

  const handleSelect = (url: string) => {
    setIsSearchOpen(false);
    router.push(url);
  };

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogContent className="p-0 max-w-2xl overflow-hidden gap-0 border-border/80 shadow-2xl">
        <DialogTitle className="sr-only">Search Academic Workspace</DialogTitle>
        <DialogDescription className="sr-only">
          Search question papers, lecture notes, learning resources, subjects, and department notices
        </DialogDescription>

        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border bg-background">
          <MagnifyingGlass className="size-5 text-muted-foreground mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search papers, notes, resources, subjects, notices... (e.g. 'DLD', 'C++', 'Midterm')"
            className="flex-1 bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {!query && (
            <div className="py-8 px-4 text-center">
              <p className="text-xs font-medium text-muted-foreground mb-3">
                Quick Suggested Searches
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  "CSE 1101",
                  "Digital Logic",
                  "Discrete Math",
                  "Midterm 2025",
                  "K-Maps",
                  "Thevenin",
                  "Pointers",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && !hasResults && (
            <div className="py-12 px-4 text-center">
              <p className="text-sm font-medium text-foreground">No matches found</p>
              <p className="text-xs text-muted-foreground mt-1">
                We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try another subject code or keyword.
              </p>
            </div>
          )}

          {/* Question Papers Results */}
          {filteredPapers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <FileImage className="size-3.5 text-primary" />
                <span>Question Papers</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredPapers.map((paper) => (
                  <button
                    key={paper.id}
                    onClick={() => handleSelect(`/question-papers/${paper.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileImage className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                          {paper.title || `${paper.examType} Exam`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {paper.examType} · {paper.year} · {paper.pagesCount} image pages
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[11px] shrink-0">
                      View Paper
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes Results */}
          {filteredNotes.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <BookOpenText className="size-3.5 text-blue-600 dark:text-blue-400" />
                <span>Class Notes</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredNotes.map((note) => (
                  <button
                    key={note.id}
                    onClick={() => handleSelect("/notes")}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <BookOpenText className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                          {note.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {note.topic} · By {note.author} · {note.pages} pages
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-[11px] shrink-0">
                      {note.type}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources Results */}
          {filteredResources.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <FolderSimpleStar className="size-3.5 text-amber-600 dark:text-amber-400" />
                <span>Learning Resources</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredResources.map((res) => (
                  <button
                    key={res.id}
                    onClick={() => handleSelect("/resources")}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                        <FolderSimpleStar className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                          {res.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {res.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[11px] capitalize shrink-0">
                      {res.type}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subjects Results */}
          {filteredSubjects.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Books className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Subjects</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredSubjects.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSelect(`/subjects/${sub.id}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {sub.code.split(" ")[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                          {sub.code}: {sub.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sub.teacher.name} · {sub.credit} Credits
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notices Results */}
          {filteredNotices.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <BellRinging className="size-3.5 text-rose-600 dark:text-rose-400" />
                <span>Department Notices</span>
              </div>
              <div className="mt-1 space-y-1">
                {filteredNotices.map((nt) => (
                  <button
                    key={nt.id}
                    onClick={() => handleSelect("/notices")}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted/70 text-left transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                        <BellRinging className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary">
                          {nt.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {nt.category} · {nt.date}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={nt.priority === "Urgent" ? "destructive" : "secondary"}
                      className="text-[11px] shrink-0"
                    >
                      {nt.priority}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/40 border-t border-border text-[11px] text-muted-foreground">
          <span>Search CSE Fall 2026 Repository</span>
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↑↓</kbd> navigate
            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border">↵</kbd> select
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
