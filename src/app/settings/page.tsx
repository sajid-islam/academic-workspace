"use client";

import * as React from "react";
import {
  User,
  Sun,
  Moon,
  Laptop,
  Bell,
  LockKey,
  ShieldCheck,
  Check,
} from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useWorkspace, ThemeMode } from "@/context/workspace-context";
import { useToast } from "@/components/ui/toast";

export default function SettingsPage() {
  const { student, theme, setTheme } = useWorkspace();
  const { toast } = useToast();

  // Account state
  const [name, setName] = React.useState(student.name);
  const [email, setEmail] = React.useState(student.email);
  const [roll, setRoll] = React.useState(student.roll);
  const [phone, setPhone] = React.useState(student.phone || "+880 1712-345678");

  // Notifications state
  const [notifyPapers, setNotifyPapers] = React.useState(true);
  const [notifyNotes, setNotifyNotes] = React.useState(true);
  const [notifyResources, setNotifyResources] = React.useState(false);
  const [notifyNotices, setNotifyNotices] = React.useState(true);

  // Security password state
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Account Updated",
      description: "Profile changes saved successfully.",
      type: "success",
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        type: "error",
      });
      return;
    }
    toast({
      title: "Password Changed",
      description: "Your security credentials have been updated.",
      type: "success",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="border-b border-border/70 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Workspace Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Manage your student account preferences, theme appearance, notifications, and security.
        </p>
      </div>

      {/* 1. Account Settings */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <User className="size-5 text-primary" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Account Information</h2>
            <p className="text-xs text-muted-foreground">
              Official university student registration details
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveAccount} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Full Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Student ID / Roll Number
              </label>
              <Input
                value={roll}
                disabled
                className="h-9 text-xs font-mono bg-muted/50 cursor-not-allowed opacity-80"
              />
              <span className="text-[10px] text-muted-foreground">
                Fixed by Registrar Office
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                University Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Phone Number
              </label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm" className="text-xs">
              Save Account Changes
            </Button>
          </div>
        </form>
      </div>

      {/* 2. Appearance Theme */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <Sun className="size-5 text-amber-500" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Appearance & Theme</h2>
            <p className="text-xs text-muted-foreground">
              Customize interface display modes with smooth light and dark transitions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: "light" as ThemeMode,
              label: "Light Mode",
              desc: "Clean white & slate surfaces",
              icon: Sun,
            },
            {
              id: "dark" as ThemeMode,
              label: "Dark Mode",
              desc: "Deep contrast indigo night",
              icon: Moon,
            },
            {
              id: "system" as ThemeMode,
              label: "System Match",
              desc: "Follows OS device preference",
              icon: Laptop,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setTheme(item.id);
                  toast({
                    title: `${item.label} Activated`,
                    type: "info",
                  });
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/20 bg-primary/5 shadow-xs"
                    : "border-border/70 hover:border-border bg-card/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-primary" />
                  {isSelected && (
                    <span className="size-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-foreground mt-3">
                  {item.label}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Notifications */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <Bell className="size-5 text-primary" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Notification Preferences</h2>
            <p className="text-xs text-muted-foreground">
              Select which departmental and study updates you wish to receive
            </p>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-border/60">
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-semibold text-foreground block">
                New Question Papers
              </span>
              <span className="text-[11px] text-muted-foreground block">
                Receive notifications when exam papers are uploaded for your courses
              </span>
            </div>
            <Switch
              checked={notifyPapers}
              onCheckedChange={setNotifyPapers}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <span className="text-xs font-semibold text-foreground block">
                New Class Notes
              </span>
              <span className="text-[11px] text-muted-foreground block">
                Alerts when classmates publish lecture summaries or formula sheets
              </span>
            </div>
            <Switch
              checked={notifyNotes}
              onCheckedChange={setNotifyNotes}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <span className="text-xs font-semibold text-foreground block">
                Learning Resources
              </span>
              <span className="text-[11px] text-muted-foreground block">
                Notifications when textbooks, simulators, and video playlists are added
              </span>
            </div>
            <Switch
              checked={notifyResources}
              onCheckedChange={setNotifyResources}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <span className="text-xs font-semibold text-foreground block">
                Department Circulars & Notices
              </span>
              <span className="text-[11px] text-muted-foreground block">
                High-priority alerts for exam routines, class cancellations, and fee deadlines
              </span>
            </div>
            <Switch
              checked={notifyNotices}
              onCheckedChange={setNotifyNotices}
            />
          </div>
        </div>
      </div>

      {/* 4. Security & Password */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <LockKey className="size-5 text-primary" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Security & Password</h2>
            <p className="text-xs text-muted-foreground">
              Update password credentials for your academic portal access
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Current Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="h-9 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                New Password
              </label>
              <Input
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Repeat new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-9 text-xs"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm" variant="outline" className="text-xs">
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
