export type NoteType = "Lecture Notes" | "Summary" | "Formula Sheet" | "Lab Report" | "Handwritten";

export interface Note {
  id: string;
  subjectId: string;
  title: string;
  topic: string;
  type: NoteType;
  author: string;
  authorRoll: string;
  date: string;
  pages: number;
  fileSize: string;
  format: "PDF" | "DOCX" | "Handwritten Scans";
  summary: string;
  keyPoints: string[];
  downloadsCount: number;
  status?: "Approved" | "Pending Review";
}
