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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Student } from "@/types/student";
import { MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react";
import * as React from "react";

export default function AdminStudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useWorkspace();
  const { toast } = useToast();

  const [search, setSearch] = React.useState("");
  const [sectionFilter, setSectionFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  // Dialogs state
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [editingStudent, setEditingStudent] = React.useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = React.useState<Student | null>(null);

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    roll: "",
    email: "",
    phone: "",
    section: "A",
    role: "student" as const,
    status: "Active" as const,
  });

  const filtered = React.useMemo(() => {
    return students.filter((s) => {
      const matchSection = sectionFilter === "all" || s.section === sectionFilter;
      const q = search.toLowerCase().trim();
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.roll.includes(q) ||
        s.email.toLowerCase().includes(q);
      return matchSection && matchQuery;
    });
  }, [students, search, sectionFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      roll: `2601040${Math.floor(Math.random() * 80 + 10)}`,
      email: "",
      phone: "+880 1700-000000",
      section: "A",
      role: "student",
      status: "Active",
    });
    setIsAddOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.roll) return;

    const newStd: Student = {
      id: `std-${Date.now().toString(36)}`,
      roll: formData.roll,
      name: formData.name,
      email: formData.email || `${formData.roll.toLowerCase()}@nwu.edu`,
      phone: formData.phone,
      department: "Computer Science & Engineering",
      session: "Fall 2026",
      section: formData.section,
      avatarUrl: `https://images.unsplash.com/photo-${Math.floor(
        Math.random() * 50 + 1500000000000,
      )}?w=150&auto=format&fit=crop&q=80`,
      joinedDate: "July 2026",
      role: formData.role,
      status: formData.status,
      contributions: { questionPapers: 0, notes: 0, resources: 0 },
    };

    addStudent(newStd);
    setIsAddOpen(false);
    toast({
      title: "Student Added",
      description: `${newStd.name} (Roll: ${newStd.roll}) added to roster.`,
      type: "success",
    });
  };

  const handleOpenEdit = (s: Student) => {
    setEditingStudent(s);
    setFormData({
      name: s.name,
      roll: s.roll,
      email: s.email,
      phone: s.phone || "",
      section: s.section,
      role: s.role as any,
      status: s.status,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    const updated: Student = {
      ...editingStudent,
      name: formData.name,
      roll: formData.roll,
      email: formData.email,
      phone: formData.phone,
      section: formData.section,
      role: formData.role,
      status: formData.status,
    };

    updateStudent(updated);
    setEditingStudent(null);
    toast({
      title: "Student Updated",
      description: `Updated records for ${updated.name}`,
      type: "success",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingStudent) return;
    deleteStudent(deletingStudent.id);
    toast({
      title: "Student Removed",
      description: `${deletingStudent.name} has been removed from roster.`,
      type: "info",
    });
    setDeletingStudent(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Student Roster"
        description="View, register, and manage enrolled students for CSE Fall 2026"
        badge="Students"
        actionLabel="Register Student"
        onAction={handleOpenAdd}
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/70 bg-card">
        <div className="relative flex-1 min-w-[240px]">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name, roll number, or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <select
          value={sectionFilter}
          onChange={(e) => {
            setSectionFilter(e.target.value);
            setPage(1);
          }}
          className="h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
        >
          <option value="all">All Sections (A & B)</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Section</TableHead>
              <TableHead>Contact Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((std) => (
                <TableRow key={std.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-7">
                        <AvatarImage src={std.avatarUrl} alt={std.name} />
                        <AvatarFallback>{std.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-foreground text-xs">{std.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-primary">{std.roll}</TableCell>
                  <TableCell className="text-xs">Sec {std.section}</TableCell>
                  <TableCell className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {std.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={std.role === "representative" ? "default" : "subtle"}
                      className="text-[10px] capitalize"
                    >
                      {std.role === "representative" ? "CR" : std.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success" className="text-[10px]">
                      {std.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        onClick={() => handleOpenEdit(std)}
                        title="Edit student"
                      >
                        <PencilSimple className="size-3.5" />
                      </Button>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        onClick={() => setDeletingStudent(std)}
                        className="hover:text-rose-600"
                        title="Delete student"
                      >
                        <Trash className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-xs text-muted-foreground">
                  No students matched your search criteria.
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

      {/* Add Student Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Register Student</DialogTitle>
            <DialogDescription className="text-xs">
              Add student to CSE Fall 2026 academic batch.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAdd} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-9 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Roll Number</label>
                <Input
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  required
                  className="h-9 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Institutional Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-9 text-xs"
              />
            </div>
            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Student</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={Boolean(editingStudent)} onOpenChange={(o) => !o && setEditingStudent(null)}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Edit Student Record</DialogTitle>
            <DialogDescription className="text-xs">
              Update details for {editingStudent?.name}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEdit} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-9 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Roll Number</label>
                <Input
                  value={formData.roll}
                  onChange={(e) => setFormData({ ...formData, roll: e.target.value })}
                  required
                  className="h-9 text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Section</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold">Institutional Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-9 text-xs"
              />
            </div>
            <DialogFooter className="pt-3">
              <Button type="button" variant="outline" onClick={() => setEditingStudent(null)}>
                Cancel
              </Button>
              <Button type="submit">Update Record</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog
        open={Boolean(deletingStudent)}
        onOpenChange={(o) => !o && setDeletingStudent(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Student from Roster?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to remove <strong>{deletingStudent?.name}</strong> (Roll:{" "}
              {deletingStudent?.roll})? This will revoke their access to this academic workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Remove Student</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
