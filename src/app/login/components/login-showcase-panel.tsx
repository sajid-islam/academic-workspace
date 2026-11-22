"use client";

import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarBlankIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react";

export function LoginShowcasePanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-between p-12 bg-zinc-950 text-zinc-50 overflow-hidden border-r border-border/40">
      {/* Ambient Mesh Gradient & Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-8 size-80 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

      {/* Top Brand Header */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/25">
          <GraduationCapIcon className="size-6" weight="fill" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight text-white">ACCO - Academic Workspace</p>
          <p className="text-xs text-zinc-400">Before Exam, Don&apos;t Poke CR/ACR Again</p>
        </div>
      </div>

      {/* Center Editorial & Glassmorphic Feature Preview */}
      <div className="relative z-10 max-w-lg space-y-8 my-auto">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold tracking-tight leading-[1.15] text-white">
            Your centralized academic workspace.
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Access exam routines, lab reports, suggestion, covered topic, assignment and academic
            records in one unified portal.
          </p>
        </div>

        {/* Relevant Feature Cards */}
        <div className="grid grid-cols-2 gap-3.5 pt-2">
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
            <div className="size-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <CalendarBlankIcon className="size-4" weight="duotone" />
            </div>
            <p className="text-xs font-semibold text-white">Exam &amp; Class Routines</p>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Check exam dates, class schedules, and assignment deadlines in one place.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md space-y-2">
            <div className="size-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <BookOpenIcon className="size-4" weight="duotone" />
            </div>
            <p className="text-xs font-semibold text-white">Lab Reports &amp; Covered Topics</p>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Track syllabus progress, covered topics, lab reports, and exam suggestions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span>Need for your Department?</span>
          <ArrowRightIcon className="size-3.5 text-zinc-400" />
        </div>
        <a
          href="mailto:sajidislam941@gmail.com"
          className="text-[11px] text-zinc-400 hover:text-white transition-colors"
        >
          sajidislam941@gmail.com
        </a>
      </div>
    </div>
  );
}
