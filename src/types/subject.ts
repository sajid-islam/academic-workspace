export interface SubjectTeacher {
  name: string;
  designation: string;
  email: string;
  officeRoom: string;
  avatarUrl?: string;
}

export interface SubjectCounts {
  questionPapers: number;
  notes: number;
  resources: number;
}

export interface SubjectSyllabusModule {
  title: string;
  topics: string[];
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credit: number;
  type: "Theory" | "Lab" | "Sessional";
  colorBadge: {
    bg: string;
    text: string;
    border: string;
    dot: string;
  };
  teacher: SubjectTeacher;
  room: string;
  scheduleSummary: string;
  counts: SubjectCounts;
  description: string;
  syllabus: SubjectSyllabusModule[];
}
