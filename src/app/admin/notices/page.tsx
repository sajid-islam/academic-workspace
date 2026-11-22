"use client";

import * as React from "react";
import {
  BellRinging,
  Plus,
  Trash,
  MagnifyingGlass,
  PushPin,
  Paperclip,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useWorkspace } from "@/context/workspace-context";
import { toast } from "@yusufceng1z/ding-react";
import { Notice, NoticePriority } from "@/types/notice";

export default function AdminNoticesPage() {
  const { notices, addNotice, deleteNotice, student } = useWorkspace();

  const [search, setSearch] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [deletingNotice, setDeletingNotice] = React.useState<Notice | null>(null);

  const [form, setForm] = React.useState({
    title: "",
    content: "",
    priority: "Normal" as NoticePriority,
    category: "Academic" as const,
    isPinned: false,
    author: "Head, Department of CSE",
    authorRole: "CSE Department Office",
  });

  const filtered = React.useMemo(() => {
    return notices.filter((n) => {
      const matchP = priorityFilter === "all" || n.priority === priorityFilter;
      const q = search.toLowerCase().trim();
      const matchQ =
        !q ||
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.author.toLowerCase().includes(q);
      return matchP && matchQ;
    });
  }, [notices, search, priorityFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    addNotice({
      title: form.title,
      content: form.content,
      priority: form.priority,
      category: form.category,
      author: form.author,
      authorRole: form.authorRole,
      isPinned: form.isPinned,
    });

    setIsAddOpen(false);
    toast.success("Notice Broadcasted", { description: `"${form.title}" published to student portal.` });

    setForm({
      title: "",
      content: "",
      priority: "Normal",
      category: "Academic",
      isPinned: false,
      author: "Head, Department of CSE",
      authorRole: "CSE Department Office",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingNotice) return;
    deleteNotice(deletingNotice.id);
    toast.info("Notice Deleted", { description: "Announcement removed from public feed." });
    setDeletingNotice(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Department Notices"
        description="Broadcast official announcements, circulars, and urgent notices to CSE students"
        badge="Broadcasts"
        actionLabel="Publish Notice"
        onAction={() => setIsAddOpen(true)}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search circulars by title, text, or author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <select
          value={priorityFilter}
          onChange={(e) => {
            setPriorityFilter(e.target.value);
            setPage(1);
          }}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="Urgent">Urgent</option>
          <option value="Important">Important</option>
          <option value="Normal">Normal</option>
        </select>
      </div>

      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Pinned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((notice) => (
              <TableRow key={notice.id}>
                <TableCell>
                  <span className="font-semibold text-xs text-foreground block truncate max-w-[280px]">
                    {notice.title}
                  </span>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px]">
                    {notice.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {notice.author}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {notice.date}
                </TableCell>
                <TableCell>
                  {notice.isPinned ? (
                    <PushPin className="size-4 text-primary" weight="fill" />
                  ) : (
                    <span className="text-muted-foreground/40 text-xs">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    onClick={() => setDeletingNotice(notice)}
                    className="hover:text-rose-600"
                    title="Delete notice"
                  >
                    <Trash className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
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

      {/* Publish Notice Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Publish Department Notice</DialogTitle>
            <DialogDescription className="text-xs">
              Broadcast an official announcement to the CSE Fall 2026 student workspace.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAdd} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Circular Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Schedule for Sessional Lab Evaluations"
                required
                className="h-9 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Priority Level</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="Normal">Normal</option>
                  <option value="Important">Important</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="Academic">Academic</option>
                  <option value="Exam">Exam Schedule</option>
                  <option value="Class Schedule">Class Schedule</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Extracurricular">Extracurricular</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Announcement Content</label>
              <Textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder="Write announcement body..."
                required
                className="text-xs min-h-[90px]"
              />
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="pinNotice"
                checked={form.isPinned}
                onCheckedChange={(checked) => setForm({ ...form, isPinned: Boolean(checked) })}
              />
              <label
                htmlFor="pinNotice"
                className="text-xs text-foreground font-medium cursor-pointer select-none"
              >
                Pin this notice to top of announcements
              </label>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Broadcast Notice</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deletingNotice)}
        onOpenChange={(o) => !o && setDeletingNotice(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notice Announcement?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to remove <strong>{deletingNotice?.title}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete Notice
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
