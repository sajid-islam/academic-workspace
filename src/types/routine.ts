export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export interface ClassSlot {
  id: string;
  subjectId: string;
  day: DayOfWeek;
  startTime: string; // e.g. "08:30 AM"
  endTime: string;   // e.g. "09:50 AM"
  room: string;      // e.g. "Room 402, Academic Bldg 2"
  teacher: string;
  type: "Theory" | "Lab";
}
