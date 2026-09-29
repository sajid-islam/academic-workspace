"use client";

import * as React from "react";
import {
  UploadSimple,
  Images,
  Trash,
  ArrowLeft,
  ArrowRight,
  Star,
  CheckCircle,
  Plus,
} from "@phosphor-icons/react";
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
import { Badge } from "@/components/ui/badge";
import { useWorkspace } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";
import { ExamType } from "@/types/question-paper";
import { generateExamPaperImage } from "@/data/paper-images";

interface AddPaperDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddPaperDialog({ open, onOpenChange }: AddPaperDialogProps) {
  const { subjects, addQuestionPaper, student } = useWorkspace();
  const { toast } = useToast();

  const [subjectId, setSubjectId] = React.useState(subjects[0]?.id || "sub-cse1101");
  const [examType, setExamType] = React.useState<ExamType>("Midterm");
  const [year, setYear] = React.useState<number>(2026);
  const [title, setTitle] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);

  // Initial demo images to make testing instant and delightful
  const [images, setImages] = React.useState<string[]>([]);
  const [primaryIndex, setPrimaryIndex] = React.useState(0);

  // Prepopulate sample realistic scans when dialog opens if empty
  React.useEffect(() => {
    if (open && images.length === 0) {
      const selectedSubject = subjects.find((s) => s.id === subjectId) || subjects[0];
      const page1 = generateExamPaperImage({
        courseCode: selectedSubject?.code || "CSE 1101",
        courseTitle: selectedSubject?.name || "Structured Programming",
        examType: "Class Assessment",
        year: 2026,
        pageNumber: 1,
        totalPages: 2,
        questions: [
          {
            num: "1.",
            text: "Explain the syntax and runtime semantics of memory allocation in systems programming.",
            marks: "10",
          },
          {
            num: "2.",
            text: "Write a function to traverse a binary tree in pre-order without recursion.",
            marks: "10",
          },
        ],
      });
      const page2 = generateExamPaperImage({
        courseCode: selectedSubject?.code || "CSE 1101",
        courseTitle: selectedSubject?.name || "Structured Programming",
        examType: "Class Assessment",
        year: 2026,
        pageNumber: 2,
        totalPages: 2,
        questions: [
          {
            num: "3.",
            text: "Analyze time complexity using recurrence trees and prove tight asymptotic bounds.",
            marks: "10",
          },
        ],
      });
      setImages([page1, page2]);
    }
  }, [open, subjectId, subjects, images.length]);

  const handleAddSamplePage = () => {
    const selectedSubject = subjects.find((s) => s.id === subjectId) || subjects[0];
    const newPageNum = images.length + 1;
    const newPage = generateExamPaperImage({
      courseCode: selectedSubject?.code || "CSE 1101",
      courseTitle: selectedSubject?.name || "Structured Programming",
      examType: examType,
      year: Number(year),
      pageNumber: newPageNum,
      totalPages: newPageNum,
      questions: [
        {
          num: `${newPageNum}. (a)`,
          text: `Sample examination question for page ${newPageNum}. Figures in the margin indicate full marks.`,
          marks: "10",
        },
      ],
    });
    setImages((prev) => [...prev, newPage]);
    toast({
      title: `Page ${newPageNum} Added`,
      description: "Appended exam page to image stack.",
      type: "info",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert file to object URL or data URL
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImages((prev) => [...prev, event.target!.result as string]);
        toast({
          title: "Image Uploaded",
          description: `Loaded ${file.name} successfully`,
          type: "success",
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      toast({
        title: "At least one image required",
        description: "A question paper must contain at least 1 image page.",
        type: "warning",
      });
      return;
    }
    setImages((prev) => prev.filter((_, i) => i !== index));
    if (primaryIndex === index) {
      setPrimaryIndex(0);
    } else if (primaryIndex > index) {
      setPrimaryIndex(primaryIndex - 1);
    }
  };

  const handleMoveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const updated = [...images];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setImages(updated);

    if (primaryIndex === fromIndex) {
      setPrimaryIndex(toIndex);
    } else if (primaryIndex === toIndex) {
      setPrimaryIndex(fromIndex);
    }
  };

  const handleSetPrimary = (index: number) => {
    setPrimaryIndex(index);
    // Put primary image first
    const updated = [...images];
    const [primary] = updated.splice(index, 1);
    updated.unshift(primary);
    setImages(updated);
    setPrimaryIndex(0);
    toast({
      title: "Primary Cover Updated",
      description: `Page ${index + 1} is now set as primary thumbnail.`,
      type: "info",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast({
        title: "Images Required",
        description: "Please attach at least one question paper image.",
        type: "error",
      });
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      const selectedSubject = subjects.find((s) => s.id === subjectId);
      const generatedTitle =
        title.trim() ||
        `${selectedSubject?.code} ${examType} Examination — ${year}`;

      const created = addQuestionPaper({
        subjectId,
        title: generatedTitle,
        examType,
        year: Number(year),
        term: "Fall",
        uploadedBy: student.name,
        uploadedByRoll: student.roll,
        images,
        pagesCount: images.length,
        totalMarks: examType === "Midterm" ? 40 : examType === "Final" ? 70 : 20,
        duration: examType === "Final" ? "3 Hours" : "1.5 Hours",
        status: "Approved",
      });

      setIsUploading(false);
      onOpenChange(false);

      toast({
        title: "Question Paper Uploaded!",
        description: `"${created.title}" with ${created.pagesCount} pages is now live in archive.`,
        type: "success",
      });

      // Reset
      setTitle("");
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-[10px]">
              Image Only Format
            </Badge>
            <span className="text-xs text-muted-foreground">CSE · Fall 2026</span>
          </div>
          <DialogTitle className="text-lg font-bold text-foreground mt-1">
            Upload Question Paper
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Share scanned or photographed question papers with your batchmates.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Course Subject <span className="text-rose-500">*</span>
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
                Exam Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as ExamType)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
                required
              >
                <option value="Midterm">Midterm Examination</option>
                <option value="Final">Semester Final</option>
                <option value="Quiz">Quiz</option>
                <option value="Class Test">Class Test</option>
                <option value="Assignment">Assignment Assessment</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Exam Year <span className="text-rose-500">*</span>
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-xs focus:ring-2 focus:ring-ring focus:outline-none"
                required
              >
                <option value={2026}>2026 (Current)</option>
                <option value={2025}>2025</option>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Optional Title
              </label>
              <Input
                placeholder="e.g. Midterm 2026 (Section A)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>

          {/* Image Upload & Management Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Images className="size-4 text-primary" />
                  <span>Question Paper Images ({images.length} pages)</span>
                  <span className="text-rose-500">*</span>
                </label>
                <p className="text-[11px] text-muted-foreground">
                  JPG, JPEG, PNG, WEBP. Drag/reorder pages or set cover page.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSamplePage}
                  className="text-xs gap-1"
                >
                  <Plus className="size-3.5" />
                  <span>Add Page</span>
                </Button>

                <label className="cursor-pointer inline-flex items-center gap-1 h-8 rounded-md border border-input bg-background px-2.5 text-xs font-medium hover:bg-muted transition-colors">
                  <UploadSimple className="size-3.5" />
                  <span>Upload File</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            {/* Thumbnail Gallery & Reordering Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-muted/40 rounded-xl border border-border">
              {images.map((imgSrc, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col rounded-lg border border-border/70 bg-card overflow-hidden shadow-2xs hover:border-primary/50 transition-colors"
                >
                  {/* Image Aspect Box */}
                  <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={`Page ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />

                    {/* Primary Badge */}
                    {idx === 0 && (
                      <div className="absolute top-1.5 left-1.5 bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.2 rounded shadow-xs flex items-center gap-1">
                        <Star className="size-3" weight="fill" />
                        <span>Primary Cover</span>
                      </div>
                    )}

                    <div className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.2 rounded font-mono">
                      Page {idx + 1}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-1.5 flex items-center justify-between border-t border-border/60 bg-card text-xs">
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveImage(idx, idx - 1)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                        title="Move left"
                      >
                        <ArrowLeft className="size-3.5" />
                      </button>

                      <button
                        type="button"
                        disabled={idx === images.length - 1}
                        onClick={() => handleMoveImage(idx, idx + 1)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none"
                        title="Move right"
                      >
                        <ArrowRight className="size-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(idx)}
                          className="text-[10px] text-primary hover:underline px-1"
                        >
                          Make Cover
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="p-1 text-muted-foreground hover:text-rose-600 transition-colors rounded"
                        title="Remove page"
                      >
                        <Trash className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="pt-2 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Processing Images...</span>
                </>
              ) : (
                <>
                  <UploadSimple className="size-4" />
                  <span>Upload Question Paper</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
