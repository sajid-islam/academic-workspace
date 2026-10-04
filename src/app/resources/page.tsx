"use client";

import { getResourceIcon } from "@/components/dashboard/recent-resources";
import { AddResourceDialog } from "@/components/resources/add-resource-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import {
  ArrowSquareOut,
  BookmarkSimple,
  Copy,
  FolderSimpleStar,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import * as React from "react";

export default function ResourcesPage() {
  const { resources, subjects, isBookmarked, toggleBookmark } = useWorkspace();
  const { toast } = useToast();

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSubject, setSelectedSubject] = React.useState<string>("all");
  const [selectedType, setSelectedType] = React.useState<string>("all");

  const resourceTypes: { label: string; value: string }[] = [
    { label: "All Types", value: "all" },
    { label: "Videos", value: "video" },
    { label: "Playlists", value: "playlist" },
    { label: "Websites", value: "website" },
    { label: "Books", value: "book" },
    { label: "PDFs", value: "pdf" },
  ];

  const filteredResources = React.useMemo(() => {
    return resources.filter((res) => {
      const matchesSubject = selectedSubject === "all" || res.subjectId === selectedSubject;
      const matchesType = selectedType === "all" || res.type === selectedType;

      const subject = subjects.find((s) => s.id === res.subjectId);
      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        res.title.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.tags.some((t) => t.toLowerCase().includes(query)) ||
        res.addedBy.toLowerCase().includes(query) ||
        subject?.code.toLowerCase().includes(query);

      return matchesSubject && matchesType && matchesQuery;
    });
  }, [resources, subjects, searchQuery, selectedSubject, selectedType]);

  const copyUrl = (url: string, title: string) => {
    navigator.clipboard?.writeText(url);
    toast({
      title: "URL Copied",
      description: `Copied link for "${title}"`,
      type: "info",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Curated Content
            </span>
            <Badge variant="subtle" className="text-[10px]">
              {resources.length} Links
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Learning Resources
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Curated video lectures, playlists, classic textbooks, and interactive visual simulators.
          </p>
        </div>

        <Button onClick={() => setIsAddOpen(true)} className="gap-2 shrink-0">
          <Plus className="size-4" />
          <span>Add Resource</span>
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {resourceTypes.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setSelectedType(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedType === tab.value
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Subject Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
          <div className="relative flex-1 min-w-[240px]">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search resources by title, topic, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 text-xs"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Course Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code}: {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((res) => {
            const subject = subjects.find((s) => s.id === res.subjectId);
            const bookmarked = isBookmarked(res.id);

            return (
              <div
                key={res.id}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <div className="size-7 rounded-md bg-muted flex items-center justify-center shrink-0 border border-border/50">
                        {getResourceIcon(res.type)}
                      </div>
                      <span className="text-xs font-bold text-primary">{subject?.code}</span>
                      <Badge variant="outline" className="text-[10px] capitalize">
                        {res.type}
                      </Badge>
                    </div>

                    <button
                      onClick={() => {
                        const next = toggleBookmark(res.id, "resource");
                        toast({
                          title: next ? "Bookmarked resource" : "Removed bookmark",
                          type: "info",
                        });
                      }}
                      className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Bookmark resource"
                    >
                      <BookmarkSimple className="size-4" weight={bookmarked ? "fill" : "regular"} />
                    </button>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-2.5 block line-clamp-2"
                  >
                    {res.title}
                  </a>

                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {res.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="truncate">Added by {res.addedBy}</span>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => copyUrl(res.url, res.title)}
                      className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      title="Copy URL"
                    >
                      <Copy className="size-3.5" />
                    </button>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline px-1.5 py-0.5"
                    >
                      <span>Open</span>
                      <ArrowSquareOut className="size-3.5" />
                    </a>
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
            <FolderSimpleStar className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">No resources found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mt-1 leading-relaxed">
            Try adjusting your search query, clearing filters, or submit a recommended resource for
            this course.
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
              Add Resource
            </Button>
          </div>
        </div>
      )}

      {/* Add Resource Dialog */}
      <AddResourceDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
    </div>
  );
}
