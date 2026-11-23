"use client";

import { initialExams } from "@/data/exams";
import { initialNotes } from "@/data/notes";
import { initialNotices } from "@/data/notices";
import { initialQuestionPapers } from "@/data/question-papers";
import { initialResources } from "@/data/resources";
import { initialRoutine } from "@/data/routine";
import { currentStudent, initialStudents } from "@/data/students";
import { initialSubjects } from "@/data/subjects";
import { Exam } from "@/types/exam";
import { Note } from "@/types/note";
import { Notice } from "@/types/notice";
import { QuestionPaper } from "@/types/question-paper";
import { Resource } from "@/types/resource";
import { ClassSlot } from "@/types/routine";
import { Student } from "@/types/student";
import { Subject } from "@/types/subject";
import * as React from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface BookmarkItem {
  id: string;
  type: "paper" | "note" | "resource";
  createdAt: string;
}

interface WorkspaceContextType {
  // Current student
  student: Student;

  // Question Papers
  questionPapers: QuestionPaper[];
  addQuestionPaper: (
    paper: Omit<QuestionPaper, "id" | "uploadedAt" | "views" | "downloads">,
  ) => QuestionPaper;
  deleteQuestionPaper: (id: string) => void;

  // Notes
  notes: Note[];
  addNote: (note: Omit<Note, "id" | "date" | "downloadsCount">) => Note;
  deleteNote: (id: string) => void;

  // Resources
  resources: Resource[];
  addResource: (res: Omit<Resource, "id" | "date">) => Resource;
  deleteResource: (id: string) => void;

  // Notices
  notices: Notice[];
  addNotice: (notice: Omit<Notice, "id" | "date">) => Notice;
  deleteNotice: (id: string) => void;

  // Subjects
  subjects: Subject[];
  addSubject: (subj: Subject) => void;
  updateSubject: (subj: Subject) => void;
  deleteSubject: (id: string) => void;

  // Students (admin)
  students: Student[];
  addStudent: (std: Student) => void;
  updateStudent: (std: Student) => void;
  deleteStudent: (id: string) => void;

  // Routine
  routine: ClassSlot[];
  addRoutineSlot: (slot: ClassSlot) => void;
  deleteRoutineSlot: (id: string) => void;

  // Exams
  exams: Exam[];
  addExam: (exam: Exam) => void;
  deleteExam: (id: string) => void;

  // Bookmarks
  bookmarks: BookmarkItem[];
  toggleBookmark: (id: string, type: "paper" | "note" | "resource") => boolean;
  isBookmarked: (id: string) => boolean;
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  // Core collections
  const [questionPapers, setQuestionPapers] =
    React.useState<QuestionPaper[]>(initialQuestionPapers);
  const [notes, setNotes] = React.useState<Note[]>(initialNotes);
  const [resources, setResources] = React.useState<Resource[]>(initialResources);
  const [notices, setNotices] = React.useState<Notice[]>(initialNotices);
  const [students, setStudents] = React.useState<Student[]>(initialStudents);
  const [subjects, setSubjects] = React.useState<Subject[]>(initialSubjects);
  const [routine, setRoutine] = React.useState<ClassSlot[]>(initialRoutine);
  const [exams, setExams] = React.useState<Exam[]>(initialExams);

  // Bookmarks state (pre-seeded with a couple of items)
  const [bookmarks, setBookmarks] = React.useState<BookmarkItem[]>([
    { id: "qp-01", type: "paper", createdAt: "2026-09-20" },
    { id: "note-01", type: "note", createdAt: "2026-09-22" },
    { id: "res-01", type: "resource", createdAt: "2026-09-24" },
  ]);

  // Bookmark actions
  const toggleBookmark = (id: string, type: "paper" | "note" | "resource") => {
    const exists = bookmarks.some((b) => b.id === id);
    if (exists) {
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
      return false;
    } else {
      setBookmarks((prev) => [
        ...prev,
        { id, type, createdAt: new Date().toISOString().split("T")[0] },
      ]);
      return true;
    }
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  // Question Papers actions
  const addQuestionPaper = (
    paperData: Omit<QuestionPaper, "id" | "uploadedAt" | "views" | "downloads">,
  ): QuestionPaper => {
    const newPaper: QuestionPaper = {
      ...paperData,
      id: `qp-${Date.now().toString(36)}`,
      uploadedAt: new Date().toISOString().split("T")[0],
      views: 1,
      downloads: 0,
      status: "Approved",
    };
    setQuestionPapers((prev) => [newPaper, ...prev]);
    return newPaper;
  };

  const deleteQuestionPaper = (id: string) => {
    setQuestionPapers((prev) => prev.filter((p) => p.id !== id));
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // Notes actions
  const addNote = (noteData: Omit<Note, "id" | "date" | "downloadsCount">): Note => {
    const newNote: Note = {
      ...noteData,
      id: `note-${Date.now().toString(36)}`,
      date: new Date().toISOString().split("T")[0],
      downloadsCount: 0,
      status: "Approved",
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // Resources actions
  const addResource = (resData: Omit<Resource, "id" | "date">): Resource => {
    const newResource: Resource = {
      ...resData,
      id: `res-${Date.now().toString(36)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Approved",
    };
    setResources((prev) => [newResource, ...prev]);
    return newResource;
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  // Notices actions
  const addNotice = (noticeData: Omit<Notice, "id" | "date">): Notice => {
    const newNotice: Notice = {
      ...noticeData,
      id: `not-${Date.now().toString(36)}`,
      date: new Date().toISOString().split("T")[0],
    };
    setNotices((prev) => [newNotice, ...prev]);
    return newNotice;
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  // Students actions
  const addStudent = (std: Student) => {
    setStudents((prev) => [std, ...prev]);
  };

  const updateStudent = (std: Student) => {
    setStudents((prev) => prev.map((s) => (s.id === std.id ? std : s)));
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // Subjects actions
  const addSubject = (subj: Subject) => {
    setSubjects((prev) => [...prev, subj]);
  };

  const updateSubject = (subj: Subject) => {
    setSubjects((prev) => prev.map((s) => (s.id === subj.id ? subj : s)));
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  // Routine actions
  const addRoutineSlot = (slot: ClassSlot) => {
    setRoutine((prev) => [...prev, slot]);
  };

  const deleteRoutineSlot = (id: string) => {
    setRoutine((prev) => prev.filter((r) => r.id !== id));
  };

  // Exams actions
  const addExam = (exam: Exam) => {
    setExams((prev) => [...prev, exam]);
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        student: currentStudent,
        questionPapers,
        addQuestionPaper,
        deleteQuestionPaper,
        notes,
        addNote,
        deleteNote,
        resources,
        addResource,
        deleteResource,
        notices,
        addNotice,
        deleteNotice,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        routine,
        addRoutineSlot,
        deleteRoutineSlot,
        exams,
        addExam,
        deleteExam,
        bookmarks,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
