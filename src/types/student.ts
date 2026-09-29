export type StudentRole = "student" | "representative" | "admin";

export interface StudentContribution {
  questionPapers: number;
  notes: number;
  resources: number;
}

export interface Student {
  id: string;
  roll: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  session: string;
  section: string;
  avatarUrl: string;
  joinedDate: string;
  role: StudentRole;
  status: "Active" | "Inactive";
  contributions: StudentContribution;
  bio?: string;
}
