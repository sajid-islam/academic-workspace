export type ResourceType =
  | "video"
  | "playlist"
  | "website"
  | "pdf"
  | "book"
  | "document";

export interface Resource {
  id: string;
  subjectId: string;
  title: string;
  type: ResourceType;
  url: string;
  description: string;
  addedBy: string;
  addedByRoll: string;
  date: string;
  tags: string[];
  status?: "Approved" | "Pending Review";
}
