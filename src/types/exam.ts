import { ExamType } from "./question-paper";

export interface Exam {
  id: string;
  subjectId: string;
  examType: ExamType;
  date: string;       // e.g. "2026-10-14"
  startTime: string;  // e.g. "10:00 AM"
  endTime: string;    // e.g. "12:00 PM"
  duration: string;   // e.g. "2 hours"
  room: string;       // e.g. "Hall 301 (Auditorium Building)"
  totalMarks: number;
  syllabusTopics: string[];
  isPast: boolean;
}
