"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { AddPaperDialog } from "@/components/question-papers/add-paper-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/toast";
import { useWorkspace } from "@/context/workspace-context";
import { QuestionPaper } from "@/types/question-paper";
import { Eye, Images, MagnifyingGlass, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import * as React from "react";

export default function AdminQuestionPapersPage() {
  const { questionPapers, subjects, deleteQuestionPaper } = useWorkspace();
  const { toast } = useToast();

  const [search, setSearch] = React.useState("");
  const [subjectFilter, setSubjectFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [deletingPaper, setDeletingPaper] = React.useState<QuestionPaper | null>(null);

  const filtered = React.useMemo(() => {
    return questionPapers.filter((p) => {
      const matchSubject = subjectFilter === "all" || p.subjectId === subjectFilter;
      const sub = subjects.find((s) => s.id === p.subjectId);
      const q = search.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.examType.toLowerCase().includes(q) ||
        p.year.toString().includes(q) ||
        p.uploadedBy.toLowerCase().includes(q) ||
        sub?.code.toLowerCase().includes(q);
      return matchSubject && matchQuery;
    });
  }, [questionPapers, subjects, search, subjectFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleConfirmDelete = () => {
    if (!deletingPaper) return;
    deleteQuestionPaper(deletingPaper.id);
    toast({
      title: "Question Paper Deleted",
      description: `"${deletingPaper.title}" has been removed from archives.`,
      type: "info",
    });
    setDeletingPaper(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Archived Question Papers"
        description="Review, moderate, and manage uploaded image-based examination question papers"
        badge="Archives"
        actionLabel="Upload Paper"
        onAction={() => setIsAddOpen(true)}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search papers by subject code, title, or contributor..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <select
          value={subjectFilter}
          onChange={(e) => {
            setSubjectFilter(e.target.value);
            setPage(1);
          }}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
        >
          <option value="all">All Course Subjects</option>
          {subjects.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.code}: {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Exam Type & Year</TableHead>
              <TableHead>Pages Count</TableHead>
              <TableHead>Uploaded By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((paper) => {
                const sub = subjects.find((s) => s.id === paper.subjectId);

                return (
                  <TableRow key={paper.id}>
                    <TableCell>
                      <Link
                        href={`/question-papers/${paper.id}`}
                        className="relative block size-10 rounded border overflow-hidden shrink-0 bg-muted hover:opacity-80 transition-opacity"
                      >
                        <img
                          src={paper.images[0]}
                          alt="thumbnail"
                          className="w-full h-full object-cover object-top"
                        />
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-primary">{sub?.code}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-foreground">
                          {paper.examType}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          Session {paper.year}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Images className="size-3.5" />
                        <span>{paper.pagesCount} pages</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="font-medium text-foreground">{paper.uploadedBy}</span>
                      <span className="text-[10px] text-muted-foreground block">
                        Roll: {paper.uploadedByRoll || "CR"}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {paper.uploadedAt}
                    </TableCell>
                    <TableCell>
                      <Badge variant="success" className="text-[10px]">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild size="icon-xs" variant="ghost" title="View paper">
                          <Link href={`/question-papers/${paper.id}`}>
                            <Eye className="size-3.5" />
                          </Link>
                        </Button>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          onClick={() => setDeletingPaper(paper)}
                          className="hover:text-rose-600"
                          title="Delete paper"
                        >
                          <Trash className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-xs text-muted-foreground">
                  No question papers matched your query.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <DataTablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>

      <AddPaperDialog open={isAddOpen} onOpenChange={setIsAddOpen} />

      <AlertDialog open={Boolean(deletingPaper)} onOpenChange={(o) => !o && setDeletingPaper(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Question Paper?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to permanently delete <strong>{deletingPaper?.title}</strong>?
              This action will remove all {deletingPaper?.pagesCount} associated images.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete Paper</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
