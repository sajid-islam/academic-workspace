import {
  House,
  FileImage,
  BookOpenText,
  FolderSimpleStar,
  Books,
  CalendarDots,
  ClockAfternoon,
  BellRinging,
  BookmarkSimple,
  UserCircle,
  GearSix,
  ShieldCheck,
  Student,
  PresentationChart,
  ListBullets,
  type Icon,
} from "@phosphor-icons/react";

export interface NavItem {
  title: string;
  href: string;
  icon: Icon;
  badge?: string;
  exact?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const studentNavigation: NavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        title: "Dashboard",
        href: "/",
        icon: House,
        exact: true,
      },
      {
        title: "Question Papers",
        href: "/question-papers",
        icon: FileImage,
        badge: "Image Only",
      },
      {
        title: "Class Notes",
        href: "/notes",
        icon: BookOpenText,
      },
      {
        title: "Learning Resources",
        href: "/resources",
        icon: FolderSimpleStar,
      },
      {
        title: "Subjects",
        href: "/subjects",
        icon: Books,
      },
    ],
  },
  {
    label: "Schedule",
    items: [
      {
        title: "Class Routine",
        href: "/routine",
        icon: CalendarDots,
      },
      {
        title: "Exam Routine",
        href: "/exams",
        icon: ClockAfternoon,
        badge: "Midterm",
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        title: "Notices",
        href: "/notices",
        icon: BellRinging,
        badge: "3",
      },
      {
        title: "Bookmarks",
        href: "/bookmarks",
        icon: BookmarkSimple,
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        title: "Student Profile",
        href: "/profile",
        icon: UserCircle,
      },
      {
        title: "Settings",
        href: "/settings",
        icon: GearSix,
      },
    ],
  },
];

export const adminNavigation: NavGroup[] = [
  {
    label: "Admin Portal",
    items: [
      {
        title: "Overview",
        href: "/admin",
        icon: PresentationChart,
        exact: true,
      },
      {
        title: "Students",
        href: "/admin/students",
        icon: Student,
      },
      {
        title: "Subjects",
        href: "/admin/subjects",
        icon: Books,
      },
      {
        title: "Question Papers",
        href: "/admin/question-papers",
        icon: FileImage,
      },
      {
        title: "Class Notes",
        href: "/admin/notes",
        icon: BookOpenText,
      },
      {
        title: "Resources",
        href: "/admin/resources",
        icon: FolderSimpleStar,
      },
      {
        title: "Class Routine",
        href: "/admin/routine",
        icon: CalendarDots,
      },
      {
        title: "Exam Schedule",
        href: "/admin/exams",
        icon: ClockAfternoon,
      },
      {
        title: "Department Notices",
        href: "/admin/notices",
        icon: BellRinging,
      },
    ],
  },
];
