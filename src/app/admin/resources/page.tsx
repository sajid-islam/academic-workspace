"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import { getResourceIcon } from "@/components/dashboard/recent-resources";
import { AddResourceDialog } from "@/components/resources/add-resource-dialog";
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
import { toast } from "@yusufceng1z/ding-react";
import { useWorkspace } from "@/context/workspace-context";
import { Resource } from "@/types/resource";
import { ArrowSquareOut, MagnifyingGlass, Trash } from "@phosphor-icons/react";
import * as React from "react";

export default function AdminResourcesPage() {
  const { resources, subjects, deleteResource } = useWorkspace();

  const [search, setSearch] = React.useState("");
  const [subjectFilter, setSubjectFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [deletingResource, setDeletingResource] = React.useState<Resource | null>(null);

  const filtered = React.useMemo(() => {
    return resources.filter((r) => {
      const matchSubject = subjectFilter === "all" || r.subjectId === subjectFilter;
      const sub = subjects.find((s) => s.id === r.subjectId);
      const q = search.toLowerCase().trim();
      const matchQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.addedBy.toLowerCase().includes(q) ||
        sub?.code.toLowerCase().includes(q);
      return matchSubject && matchQuery;
    });
  }, [resources, subjects, search, subjectFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleConfirmDelete = () => {
    if (!deletingResource) return;
    deleteResource(deletingResource.id);
    toast.info("Resource Removed", { description: `"${deletingResource.title}" removed from repository.` });
    setDeletingResource(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Learning Resources"
        description="Review, verify, and moderate video playlists, web tools, textbooks, and documentation"
        badge="Resources"
        actionLabel="Add Resource"
        onAction={() => setIsAddOpen(true)}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search resources by title, subject, or contributor..."
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

      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Resource Title</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((res) => {
                const sub = subjects.find((s) => s.id === res.subjectId);

                return (
                  <TableRow key={res.id}>
                    <TableCell>
                      <div className="size-7 rounded bg-muted flex items-center justify-center shrink-0">
                        {getResourceIcon(res.type)}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-primary">{sub?.code}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-xs text-foreground block truncate max-w-[220px]">
                        {res.title}
                      </span>
                    </TableCell>
                    <TableCell>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <span className="truncate max-w-[150px]">{res.url}</span>
                        <ArrowSquareOut className="size-3 shrink-0" />
                      </a>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{res.addedBy}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{res.date}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        onClick={() => setDeletingResource(res)}
                        className="hover:text-rose-600"
                        title="Delete resource"
                      >
                        <Trash className="size-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground">
                  No learning resources found matching search.
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

      <AddResourceDialog open={isAddOpen} onOpenChange={setIsAddOpen} />

      <AlertDialog
        open={Boolean(deletingResource)}
        onOpenChange={(o) => !o && setDeletingResource(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Learning Resource?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete <strong>{deletingResource?.title}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete Resource</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
