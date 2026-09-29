"use client";

import * as React from "react";
import { Plus, BookOpenText } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { NoteType } from "@/types/note";

interface AddNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddNoteDialog({ open, onOpenChange }: AddNoteDialogProps) {
  const { subjects, addNote, student } = useWorkspace();
  const { toast } = useToast();

  const [subjectId, setSubjectId] = React.useState(subjects[0]?.id || "sub-cse1101");
  const [title, setTitle] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [type, setType] = React.useState<NoteType>("Lecture Notes");
  const [format, setFormat] = React.useState<"PDF" | "DOCX" | "Handwritten Scans">("PDF");
  const [pages, setPages] = React.useState<number>(8);
  const [summary, setSummary] = React.useState("");
  const [keyPointsText, setKeyPointsText] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim()) {
      toast({
        title: "Required Fields",
        description: "Please provide a note title and topic.",
        type: "error",
      });
      return;
    }

    const keyPoints = keyPointsText
      .split("\n")
      .map((k) => k.trim())
      .filter(Boolean);

    addNote({
      subjectId,
      title: title.trim(),
      topic: topic.trim(),
      type,
      author: student.name,
      authorRoll: student.roll,
      pages: Number(pages) || 5,
      fileSize: "1.8 MB",
      format,
      summary:
        summary.trim() ||
        `Comprehensive class notes and lecture review for ${topic}. Covers theory and solved examples.`,
      keyPoints:
        keyPoints.length > 0
          ? keyPoints
          : [
              "Core theoretical foundations and textbook definitions",
              "Solved lecture examples and edge cases",
              "Common exam pitfalls and revision tips",
            ],
      status: "Approved",
    });

    onOpenChange(false);
    toast({
      title: "Note Shared!",
      description: `"${title}" has been added to class notes.`,
      type: "success",
    });

    // Reset
    setTitle("");
    setTopic("");
    setSummary("");
    setKeyPointsText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary">Class Archives</span>
          </div>
          <DialogTitle className="text-lg font-bold text-foreground mt-0.5">
            Share Class Notes
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share your handwritten summaries, formula sheets, or lecture notes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Subject <span className="text-rose-500">*</span>
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
              required
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.code}: {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Note Title <span className="text-rose-500">*</span>
            </label>
            <Input
              placeholder="e.g. Complete K-Map Minimization & Quine-McCluskey Handout"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Topic / Unit <span className="text-rose-500">*</span>
              </label>
              <Input
                placeholder="e.g. Memory & Pointers"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Note Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as NoteType)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="Lecture Notes">Lecture Notes</option>
                <option value="Summary">Summary</option>
                <option value="Formula Sheet">Formula Sheet</option>
                <option value="Lab Report">Lab Report</option>
                <option value="Handwritten">Handwritten Scans</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Document Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
              >
                <option value="PDF">PDF Document</option>
                <option value="Handwritten Scans">Handwritten Scans</option>
                <option value="DOCX">Word Document (.docx)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Page Count
              </label>
              <Input
                type="number"
                min={1}
                max={200}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Overview Summary
            </label>
            <Textarea
              placeholder="Brief summary of what this note covers..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="text-xs min-h-[70px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Key Takeaway Points (one per line)
            </label>
            <Textarea
              placeholder="- Main theoretical concept&#10;- Important formula or shortcut&#10;- Exam review problem"
              value={keyPointsText}
              onChange={(e) => setKeyPointsText(e.target.value)}
              className="text-xs min-h-[70px]"
            />
          </div>

          <DialogFooter className="pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <BookOpenText className="size-4" />
              <span>Publish Notes</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
