"use client";

import * as React from "react";
import {
  BookOpenText,
  Plus,
  Trash,
  MagnifyingGlass,
  Eye,
  DownloadSimple,
} from "@phosphor-icons/react";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { AddNoteDialog } from "@/components/notes/add-note-dialog";
import { NoteViewerDialog } from "@/components/notes/note-viewer-dialog";
import { Note } from "@/types/note";

export default function AdminNotesPage() {
  const { notes, subjects, deleteNote } = useWorkspace();
  const { toast } = useToast();

  const [search, setSearch] = React.useState("");
  const [subjectFilter, setSubjectFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  const [isViewerOpen, setIsViewerOpen] = React.useState(false);
  const [deletingNote, setDeletingNote] = React.useState<Note | null>(null);

  const filtered = React.useMemo(() => {
    return notes.filter((n) => {
      const matchSubject = subjectFilter === "all" || n.subjectId === subjectFilter;
      const sub = subjects.find((s) => s.id === n.subjectId);
      const q = search.toLowerCase().trim();
      const matchQuery =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.topic.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q) ||
        sub?.code.toLowerCase().includes(q);
      return matchSubject && matchQuery;
    });
  }, [notes, subjects, search, subjectFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleConfirmDelete = () => {
    if (!deletingNote) return;
    deleteNote(deletingNote.id);
    toast({
      title: "Note Deleted",
      description: `"${deletingNote.title}" removed from repository.`,
      type: "info",
    });
    setDeletingNote(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Class Notes Library"
        description="Moderate, organize, and manage lecture notes, formula sheets, and summaries"
        badge="Notes"
        actionLabel="Publish Note"
        onAction={() => setIsAddOpen(true)}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search notes by title, topic, or author..."
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
              <TableHead>Course Code</TableHead>
              <TableHead>Title & Topic</TableHead>
              <TableHead>Note Type</TableHead>
              <TableHead>Format & Size</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((note) => {
                const sub = subjects.find((s) => s.id === note.subjectId);

                return (
                  <TableRow key={note.id}>
                    <TableCell className="font-mono text-xs font-bold text-primary">
                      {sub?.code}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-foreground truncate max-w-[220px]">
                          {note.title}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {note.topic}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px]">
                        {note.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {note.format} ({note.pages}p · {note.fileSize})
                    </TableCell>
                    <TableCell className="text-xs">
                      <span className="font-medium text-foreground">{note.author}</span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {note.date}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          onClick={() => {
                            setSelectedNote(note);
                            setIsViewerOpen(true);
                          }}
                          title="View note"
                        >
                          <Eye className="size-3.5" />
                        </Button>
                        <Button
                          size="icon-xs"
                          variant="ghost"
                          onClick={() => setDeletingNote(note)}
                          className="hover:text-rose-600"
                          title="Delete note"
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
                <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground">
                  No class notes found matching search.
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

      <AddNoteDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
      <NoteViewerDialog
        note={selectedNote}
        open={isViewerOpen}
        onOpenChange={setIsViewerOpen}
      />

      <AlertDialog
        open={Boolean(deletingNote)}
        onOpenChange={(o) => !o && setDeletingNote(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Class Note?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to delete <strong>{deletingNote?.title}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete Note
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
