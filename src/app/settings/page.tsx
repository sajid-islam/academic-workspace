"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeMode } from "@/context/workspace-context";
import { useGetMeQuery } from "@/redux/apis/user/user.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook.redux";
import { changeTheme } from "@/redux/stores/theme/theme.slice";
import { LaptopIcon, LockKeyIcon, MoonIcon, SunIcon, UserIcon } from "@phosphor-icons/react";
import { toast } from "@yusufceng1z/ding-react";
import SettingPageSkeleton from "./components/settings-page.skeleton";

export default function SettingsPage() {
  const { data: user, isLoading } = useGetMeQuery();
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatchTheme = useAppDispatch();
  if (isLoading) {
    return <SettingPageSkeleton />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in-50 duration-300">
      {/* Header */}
      <div className="border-b border-border/70 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Workspace Settings</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Manage your student account preferences, theme appearance, notifications, and security.
        </p>
      </div>

      {/* 1. Account Settings */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <UserIcon className="size-5 text-primary" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Account Information</h2>
            <p className="text-xs text-muted-foreground">
              Official university student registration details
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.warning("This feature is unavailable for now");
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Full Name</label>
              <Input value={user?.name} disabled className="h-9 text-xs" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Phone Number</label>
              <Input value={user?.nickname} disabled className="h-9 text-xs" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Student ID</label>
              <Input
                value={user?.student_id}
                disabled
                className="h-9 text-xs bg-muted/50 cursor-not-allowed opacity-80"
              />
              <span className="text-[10px] text-muted-foreground">Fixed by Registrar Office</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">University Email</label>
              <Input type="email" value={user?.email} disabled className="h-9 text-xs" />
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
          <SunIcon className="size-5 text-amber-500" />
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
              label: "Light",
              desc: "Clean white & slate surfaces",
              icon: SunIcon,
            },
            {
              id: "dark" as ThemeMode,
              label: "Dark",
              desc: "Deep contrast indigo night",
              icon: MoonIcon,
            },
            {
              id: "system" as ThemeMode,
              label: "System",
              desc: "Follows OS device preference",
              icon: LaptopIcon,
            },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  dispatchTheme(changeTheme(item.id));
                  toast.info(`${item.label} Activated`);
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
                <h3 className="text-xs font-bold text-foreground mt-3">{item.label}</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 hidden sm:block">
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Notifications */}
      {/* <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <BellIcon className="size-5 text-primary" />
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
            <Switch checked={notifyPapers} onCheckedChange={setNotifyPapers} />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <span className="text-xs font-semibold text-foreground block">New Class Notes</span>
              <span className="text-[11px] text-muted-foreground block">
                Alerts when classmates publish lecture summaries or formula sheets
              </span>
            </div>
            <Switch checked={notifyNotes} onCheckedChange={setNotifyNotes} />
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
            <Switch checked={notifyResources} onCheckedChange={setNotifyResources} />
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
            <Switch checked={notifyNotices} onCheckedChange={setNotifyNotices} />
          </div>
        </div>
      </div> */}

      {/* 4. Security & Password */}
      <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
          <LockKeyIcon className="size-5 text-primary" />
          <div>
            <h2 className="text-sm font-bold text-foreground">Security & Password</h2>
            <p className="text-xs text-muted-foreground">
              Update password credentials for your academic portal access
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.warning("This feature is unavailable for now");
          }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Current Password</label>
            <Input type="password" disabled placeholder="••••••••" className="h-9 text-xs" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">New Password</label>
              <Input
                type="password"
                disabled
                placeholder="At least 8 characters"
                className="h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Confirm New Password</label>
              <Input
                type="password"
                disabled
                placeholder="Repeat new password"
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
