"use client";

import * as React from "react";
import {
  CalendarDots,
  Plus,
  Trash,
  Clock,
  MapPin,
  User,
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
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { ClassSlot, DayOfWeek } from "@/types/routine";

export default function AdminRoutinePage() {
  const { routine, subjects, addRoutineSlot, deleteRoutineSlot } = useWorkspace();
  const { toast } = useToast();

  const [selectedDay, setSelectedDay] = React.useState<string>("all");
  const [page, setPage] = React.useState(1);
  const pageSize = 7;

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [deletingSlot, setDeletingSlot] = React.useState<ClassSlot | null>(null);

  const [form, setForm] = React.useState({
    subjectId: subjects[0]?.id || "sub-cse1101",
    day: "Monday" as DayOfWeek,
    startTime: "08:30 AM",
    endTime: "09:50 AM",
    room: "Room 402, Academic Bldg 2",
    teacher: "Prof. Dr. Mohammad Rashedul Islam",
    type: "Theory" as const,
  });

  const filtered = React.useMemo(() => {
    return routine.filter((r) => selectedDay === "all" || r.day === selectedDay);
  }, [routine, selectedDay]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: ClassSlot = {
      id: `slot-${Date.now().toString(36)}`,
      subjectId: form.subjectId,
      day: form.day,
      startTime: form.startTime,
      endTime: form.endTime,
      room: form.room,
      teacher: form.teacher,
      type: form.type,
    };
    addRoutineSlot(newSlot);
    setIsAddOpen(false);
    toast({
      title: "Class Slot Added",
      description: `Scheduled on ${newSlot.day} (${newSlot.startTime})`,
      type: "success",
    });
  };

  const handleConfirmDelete = () => {
    if (!deletingSlot) return;
    deleteRoutineSlot(deletingSlot.id);
    toast({
      title: "Class Slot Removed",
      description: `Removed slot from routine timetable.`,
      type: "info",
    });
    setDeletingSlot(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      <AdminHeader
        title="Class Routine Schedule"
        description="Allocate rooms, faculty timeslots, and lab sessions for weekly timetable"
        badge="Timetable"
        actionLabel="Add Class Slot"
        onAction={() => setIsAddOpen(true)}
      />

      {/* Day Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {["all", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"].map((day) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDay(day);
              setPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedDay === day
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {day === "all" ? "All Days" : day}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Timeslot</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((slot) => {
              const sub = subjects.find((s) => s.id === slot.subjectId);

              return (
                <TableRow key={slot.id}>
                  <TableCell className="font-semibold text-xs text-foreground">
                    {slot.day}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-primary">
                    {slot.startTime} – {slot.endTime}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs font-bold">{sub?.code}</span>
                      <span className="text-[11px] text-muted-foreground">{sub?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={slot.type === "Lab" ? "secondary" : "outline"}
                      className="text-[10px]"
                    >
                      {slot.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{slot.room}</TableCell>
                  <TableCell className="text-xs">{slot.teacher}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => setDeletingSlot(slot)}
                      className="hover:text-rose-600"
                      title="Delete slot"
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
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>

      {/* Add Slot Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Add Timetable Slot</DialogTitle>
            <DialogDescription className="text-xs">
              Assign a course session to the weekly class schedule.
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
                <label className="text-xs font-semibold">Day of Week</label>
                <select
                  value={form.day}
                  onChange={(e) => setForm({ ...form, day: e.target.value as DayOfWeek })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Class Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs"
                >
                  <option value="Theory">Theory Session</option>
                  <option value="Lab">Lab / Sessional</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Start Time</label>
                <Input
                  value={form.startTime}
                  onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                  placeholder="08:30 AM"
                  className="h-9 text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold">End Time</label>
                <Input
                  value={form.endTime}
                  onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                  placeholder="09:50 AM"
                  className="h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Room & Building</label>
              <Input
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Faculty Teacher</label>
              <Input
                value={form.teacher}
                onChange={(e) => setForm({ ...form, teacher: e.target.value })}
                className="h-9 text-xs"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Slot</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(deletingSlot)}
        onOpenChange={(o) => !o && setDeletingSlot(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Class Slot?</AlertDialogTitle>
            <AlertDialogDescription className="text-xs">
              Are you sure you want to remove this timetable slot on {deletingSlot?.day} ({deletingSlot?.startTime})?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete Slot
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
