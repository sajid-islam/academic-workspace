"use client";

import * as React from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { TodayClasses } from "@/components/dashboard/today-classes";
import { UpcomingExams } from "@/components/dashboard/upcoming-exams";
import { RecentQuestionPapers } from "@/components/dashboard/recent-question-papers";
import { RecentNotes } from "@/components/dashboard/recent-notes";
import { RecentResources } from "@/components/dashboard/recent-resources";
import { LatestNotices } from "@/components/dashboard/latest-notices";
import { AddPaperDialog } from "@/components/question-papers/add-paper-dialog";

export default function DashboardPage() {
  const [isUploadPaperOpen, setIsUploadPaperOpen] = React.useState(false);

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* 1. Dashboard Header & Stats */}
      <DashboardHeader onUploadPaper={() => setIsUploadPaperOpen(true)} />

      {/* 2. Today's Classes & Upcoming Exams Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayClasses />
        <UpcomingExams />
      </div>

      {/* 3. Recent Question Papers (Image Thumbnails Only) */}
      <RecentQuestionPapers />

      {/* 4. Notes & Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentNotes />
        <RecentResources />
      </div>

      {/* 5. Department Notices */}
      <LatestNotices />

      {/* Upload Question Paper Dialog */}
      <AddPaperDialog
        open={isUploadPaperOpen}
        onOpenChange={setIsUploadPaperOpen}
      />
    </div>
  );
}
