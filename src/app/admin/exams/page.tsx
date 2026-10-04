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
import { Exam } from "@/types/exam";
import { ExamType } from "@/types/question-paper";
import { Trash } from "@phosphor-icons/react";
import * as React from "react";

export default function AdminExamsPage() {
  const { exams, subjects, addExam, deleteExam } = useWorkspace();
  const { toast } = useToast();

  const [page, setPage] = React.useState(1);
  const pageSize = 6;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [deletingExam, setDeletingExam] = React.useState<Exam | null>(null);

  const [form, setForm] = React.useState({
    subjectId: subjects[0]?.id || "sub-cse1101",
    examType: "Midterm" as ExamType,
    date: "2026-10-14",
    startTime: "10:00 AM",
    endTime: "11:30 AM",
    duration: "1.5 Hours",
    room: "Auditorium Hall A (Main Campus)",
    totalMarks: 40,
    topicsText: "",
  });

  const totalPages = Math.ceil(exams.length / pageSize);
  const paginated = exams.slice((page - 1) * pageSize, page * pageSize);

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const topics = form.topicsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newExam: Exam = {
      id: `ex-${Date.now().toString(36)}`,
      subjectId: form.subjectId,
      examType: form.examType,
      date: form.date,
      startTime: form.startTime,
      endTime: form.endTime,
      duration: form.duration,
      room: form.room,
      totalMarks: Number(form.totalMarks),
      syllabusTopics: topics.length > 0 ? topics : ["Midterm syllabus coverage"],
      isPast: new Date(form.date) < new Date("2026-09-29"),
    };

    addExam(newExam);
    setIsAddOpen(false);
    toast({
      title: "Exam Scheduled",
      description: `${newExam.examType} scheduled on ${newExam.date}`,
      type: "success",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingExam) return;
    deleteExam(deletingExam.id);
    toast({
      title: "Exam Removed",
      description: "Exam schedule slot deleted.",
      type: "info",
    });
    setDeletingExam(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Examination Schedules"
        description="Schedule midterm and semester final exams, assign exam halls, and specify marks"
        badge="Assessments"
        actionLabel="Schedule Exam"
        onAction={() => setIsAddOpen(true)}
      />

      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Course Code</TableHead>
              <TableHead>Exam Type</TableHead>
              <TableHead>Duration & Marks</TableHead>
              <TableHead>Exam Hall Room</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((exam) => {
              const sub = subjects.find((s) => s.id === exam.subjectId);

              return (
                <TableRow key={exam.id}>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span className="font-bold text-foreground">{exam.date}</span>
                      <span className="text-[11px] text-muted-foreground">{exam.startTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary">{sub?.code}</span>
                      <span className="text-[11px] text-muted-foreground">{sub?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={exam.examType === "Final" ? "destructive" : "warning"}
                      className="text-[10px]"
                    >
                      {exam.examType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">
                    {exam.duration} · {exam.totalMarks} Marks
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{exam.room}</TableCell>
                  <TableCell>
                    <Badge variant={!exam.isPast ? "warning" : "subtle"} className="text-[10px]">
                      {!exam.isPast ? "Upcoming" : "Concluded"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setDeletingExam(exam)}
                      className="hover:text-rose-600"
                      title="Delete exam"
                    >
                      <Trash className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <DataTablePagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={exams.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>

      {/* Add Exam Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Schedule Examination</DialogTitle>
            <DialogDescription className="text-xs">
              Publish an exam date and venue to student timetable.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveAdd} className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold">Course Subject</label>
              <select
                value={form.subjectId}
                onChange={(e) => setForm({ ...form, subjectId: e.target.value })}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
              >
                {subjects.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.code}: {sub.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Exam Type</label>
                <select
                  value={form.examType}
                  onChange={(e) => setForm({ ...form, examType: e.target.value as ExamType })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="Midterm">Midterm Examination</option>
                  <option value="Final">Semester Final</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Class Test">Class Test</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Total Marks</label>
                <Input
                  type="number"
                  value={form.totalMarks}
                  onChange={(e) => setForm({ ...form, totalMarks: Number(e.target.value) })}
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Exam Date</label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="h-9 text-xs font-mono"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">Duration</label>
                <Input
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="1.5 Hours"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Exam Hall / Room</label>
              <Input
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Syllabus Highlights (comma separated)</label>
              <Input
                value={form.topicsText}
                onChange={(e) => setForm({ ...form, topicsText: e.target.value })}
                placeholder="Module 1, Pointers, Arrays"
                className="h-9 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Exam</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={Boolean(deletingExam)} onOpenChange={(o) => !o && setDeletingExam(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Exam Schedule?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to remove this examination scheduled for {deletingExam?.date}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete Schedule</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
