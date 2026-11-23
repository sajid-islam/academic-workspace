import Providers from "@/components/common/providers";
import { AppShell } from "@/components/layout/app-shell";
import { AppToaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSE Workspace · Fall 2026 | North Western University, Khulna",
  description:
    "Private academic workspace for Computer Science & Engineering students (Fall 2026 session). Access past exam papers, lecture notes, resources, class timetable, and announcements.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", inter.variable, inter.className)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <AppToaster />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
