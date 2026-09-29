export type NoticePriority = "Normal" | "Important" | "Urgent";

export interface NoticeAttachment {
  name: string;
  url: string;
  size: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  priority: NoticePriority;
  category: "Academic" | "Exam" | "Class Schedule" | "Administrative" | "Extracurricular";
  attachments?: NoticeAttachment[];
  isPinned?: boolean;
}
