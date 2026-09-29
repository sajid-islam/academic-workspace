export type ExamType = "Midterm" | "Final" | "Quiz" | "Class Test" | "Assignment";

export interface QuestionPaper {
  id: string;
  subjectId: string;
  title?: string;
  examType: ExamType;
  year: number;
  term?: string;
  uploadedBy: string;
  uploadedByRoll?: string;
  uploadedAt: string;
  images: string[]; // Mock/data image URLs
  totalMarks?: number;
  duration?: string;
  pagesCount: number;
  views?: number;
  downloads?: number;
  status?: "Approved" | "Pending Review";
}
