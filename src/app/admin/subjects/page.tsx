"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { DataTablePagination } from "@/components/admin/data-table-pagination";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Subject } from "@/types/subject";
import { MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react";
import * as React from "react";

export default function AdminSubjectsPage() {
  const { subjects, addSubject, updateSubject, deleteSubject } = useWorkspace();
  const { toast } = useToast();

  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [editingSubject, setEditingSubject] = React.useState<Subject | null>(null);
  const [deletingSubject, setDeletingSubject] = React.useState<Subject | null>(null);

  const [form, setForm] = React.useState({
    code: "",
    name: "",
    credit: 3.0,
    type: "Theory" as const,
    teacherName: "",
    teacherDesignation: "Assistant Professor",
    teacherEmail: "",
    room: "",
    scheduleSummary: "",
    description: "",
  });

  const filtered = React.useMemo(() => {
    return subjects.filter((s) => {
      const q = search.toLowerCase().trim();
      return (
        !q ||
        s.code.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.teacher.name.toLowerCase().includes(q)
      );
    });
  }, [subjects, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleOpenAdd = () => {
    setForm({
      code: "CSE 110",
      name: "",
      credit: 3.0,
      type: "Theory",
      teacherName: "",
      teacherDesignation: "Assistant Professor",
      teacherEmail: "",
      room: "Room 401, Academic Bldg 2",
      scheduleSummary: "Mon, Wed (10:00 AM - 11:20 AM)",
      description: "Fundamental course covering core concepts.",
    });
    setIsAddOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubject: Subject = {
      id: `sub-${Date.now().toString(36)}`,
      code: form.code,
      name: form.name,
      credit: Number(form.credit),
      type: form.type,
      colorBadge: {
        bg: "bg-primary/10",
        text: "text-primary",
        border: "border-primary/20",
        dot: "bg-primary",
      },
      teacher: {
        name: form.teacherName || "Assigned Lecturer",
        designation: form.teacherDesignation,
        email: form.teacherEmail || "faculty.cse@nwu.edu",
        officeRoom: "Room 702, CSE Bldg",
      },
      room: form.room,
      scheduleSummary: form.scheduleSummary,
      counts: { questionPapers: 0, notes: 0, resources: 0 },
      description: form.description,
      syllabus: [
        {
          title: "Module 1: Introductory Theory",
          topics: ["Foundations", "Core principles", "Class review"],
        },
      ],
    };

    addSubject(newSubject);
    setIsAddOpen(false);
    toast({
      title: "Subject Added",
      description: `${newSubject.code}: ${newSubject.name} created.`,
      type: "success",
    });
  };

  const handleOpenEdit = (s: Subject) => {
    setEditingSubject(s);
    setForm({
      code: s.code,
      name: s.name,
      credit: s.credit,
      type: s.type as any,
      teacherName: s.teacher.name,
      teacherDesignation: s.teacher.designation,
      teacherEmail: s.teacher.email,
      room: s.room,
      scheduleSummary: s.scheduleSummary,
      description: s.description,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubject) return;

    const updated: Subject = {
      ...editingSubject,
      code: form.code,
      name: form.name,
      credit: Number(form.credit),
      type: form.type,
      room: form.room,
      scheduleSummary: form.scheduleSummary,
      description: form.description,
      teacher: {
        ...editingSubject.teacher,
        name: form.teacherName,
        designation: form.teacherDesignation,
        email: form.teacherEmail,
      },
    };

    updateSubject(updated);
    setEditingSubject(null);
    toast({
      title: "Subject Updated",
      description: `Changes to ${updated.code} saved.`,
      type: "success",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingSubject) return;
    deleteSubject(deletingSubject.id);
    toast({
      title: "Subject Removed",
      description: `${deletingSubject.code} removed from semester curriculum.`,
      type: "info",
    });
    setDeletingSubject(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Curriculum Subjects"
        description="Configure academic course modules, credit hours, and faculty assignments"
        badge="Curriculum"
        actionLabel="Add Subject"
        onAction={handleOpenAdd}
      />

      {/* Filter and Search Bar */}
      <div className="p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by course code, title, or instructor..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Room</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="text-xs font-bold text-primary">{sub.code}</TableCell>
                <TableCell className="font-semibold text-xs text-foreground">{sub.name}</TableCell>
                <TableCell className="text-xs">{sub.credit.toFixed(1)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px]">
                    {sub.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{sub.teacher.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {sub.teacher.designation}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{sub.room}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => handleOpenEdit(sub)}
                      title="Edit subject"
                    >
                      <PencilSimple className="size-3.5" />
                    </Button>
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setDeletingSubject(sub)}
                      className="hover:text-rose-600"
                      title="Delete subject"
                    >
                      <Trash className="size-3.5" />
                    </Button>
                  </div>
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

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Course Subject</DialogTitle>
            <DialogDescription className="text-xs">
              Introduce a new syllabus course for CSE Fall 2026.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAdd} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Course Code</label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  required
                  className="h-9 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Credits</label>
                <Input
                  type="number"
                  step="0.5"
                  value={form.credit}
                  onChange={(e) => setForm({ ...form, credit: Number(e.target.value) })}
                  className="h-9 text-xs"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Course Title</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Lead Instructor Name</label>
              <Input
                value={form.teacherName}
                onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
                required
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Allocated Room</label>
              <Input
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="h-9 text-xs"
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Subject</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editingSubject)} onOpenChange={(o) => !o && setEditingSubject(null)}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Subject</DialogTitle>
            <DialogDescription className="text-xs">
              Update details for {editingSubject?.code}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Course Code</label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  required
                  className="h-9 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Credits</label>
                <Input
                  type="number"
                  step="0.5"
                  value={form.credit}
                  onChange={(e) => setForm({ ...form, credit: Number(e.target.value) })}
                  className="h-9 text-xs"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Course Title</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-9 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Lead Instructor Name</label>
              <Input
                value={form.teacherName}
                onChange={(e) => setForm({ ...form, teacherName: e.target.value })}
                required
                className="h-9 text-xs"
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setEditingSubject(null)}>
                Cancel
              </Button>
              <Button type="submit">Update Subject</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deletingSubject)}
        onOpenChange={(o) => !o && setDeletingSubject(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Course Subject?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to remove{" "}
              <strong>
                {deletingSubject?.code}: {deletingSubject?.name}
              </strong>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete Course</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
