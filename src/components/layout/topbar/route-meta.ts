export interface RouteMeta {
  title: string;
  category: string;
}

export const pathTitles: Record<string, RouteMeta> = {
  "/": { title: "Dashboard", category: "Workspace" },
  "/question-papers": { title: "Question Papers", category: "Academic Archives" },
  "/notes": { title: "Class Notes", category: "Study Material" },
  "/resources": { title: "Learning Resources", category: "Reference" },
  "/subjects": { title: "Course Subjects", category: "Curriculum" },
  "/routine": { title: "Class Routine", category: "Schedule" },
  "/exams": { title: "Exam Schedule", category: "Assessments" },
  "/notices": { title: "Department Notices", category: "Announcements" },
  "/bookmarks": { title: "Saved Bookmarks", category: "Personal" },
  "/profile": { title: "Student Profile", category: "Account" },
  "/settings": { title: "Settings", category: "Preferences" },
  "/admin": { title: "Admin Overview", category: "Administration" },
  "/admin/students": { title: "Manage Students", category: "Admin" },
  "/admin/subjects": { title: "Manage Subjects", category: "Admin" },
  "/admin/question-papers": { title: "Manage Papers", category: "Admin" },
  "/admin/notes": { title: "Manage Notes", category: "Admin" },
  "/admin/resources": { title: "Manage Resources", category: "Admin" },
  "/admin/routine": { title: "Manage Routine", category: "Admin" },
  "/admin/exams": { title: "Manage Exams", category: "Admin" },
  "/admin/notices": { title: "Publish Notices", category: "Admin" },
};

export function getRouteMeta(pathname: string): RouteMeta {
  return (
    pathTitles[pathname] || {
      title: pathname.split("/").pop()?.replace(/-/g, " ") || "Overview",
      category: pathname.startsWith("/admin") ? "Administration" : "Workspace",
    }
  );
}
