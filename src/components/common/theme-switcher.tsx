"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hook.redux";
import { ThemeState, changeTheme } from "@/redux/stores/theme/theme.slice";
import { LaptopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { toast } from "@yusufceng1z/ding-react";
import { useEffect } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ThemeSwitcher = () => {
  const theme = useAppSelector((state) => state.theme.mode);
  const dispatchTheme = useAppDispatch();

  const applyThemeClass = (targetTheme: ThemeState["mode"]) => {
    const root = document.documentElement;

    // Disable animations and transitions
    root.classList.add("disable-transitions");

    root.classList.remove("light", "dark");

    root.classList.remove("theme-light", "theme-dark", "theme-system");

    root.classList.add(`theme-${targetTheme}`);

    if (targetTheme === "system") {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      root.classList.add(systemDark ? "dark" : "light");
    } else {
      root.classList.add(targetTheme);
    }

    // Re-enable animations and transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove("disable-transitions");
      });
    });
  };

  // Load saved preference
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") ?? "system") as ThemeState["mode"];

    dispatchTheme(changeTheme(savedTheme));

    applyThemeClass(savedTheme);
  }, [dispatchTheme]);

  const setTheme = (newTheme: ThemeState["mode"]) => {
    dispatchTheme(changeTheme(newTheme));
    localStorage.setItem("theme", newTheme);
    applyThemeClass(newTheme);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="rounded-lg text-muted-foreground hover:text-foreground"
          aria-label="Toggle theme"
        >
          <span className="relative">
            <SunIcon className="size-4 in-[.theme-light]:block hidden" />
            <MoonIcon className="size-4 in-[.theme-dark]:block hidden" />
            <LaptopIcon className="size-4 in-[.theme-system]:block hidden" />
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuLabel className="text-xs">Theme</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
            toast.info("Light mode enabled");
          }}
          className="gap-2 text-xs"
        >
          <SunIcon className="size-4 text-amber-500" />
          <span>Light</span>
          {theme === "light" && <span className="ml-auto text-[10px]">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
            toast.info("Dark mode enabled");
          }}
          className="gap-2 text-xs"
        >
          <MoonIcon className="size-4 text-indigo-400" />
          <span>Dark</span>
          {theme === "dark" && <span className="ml-auto text-[10px]">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
            toast.info("System theme synced");
          }}
          className="gap-2 text-xs"
        >
          <LaptopIcon className="size-4 text-muted-foreground" />
          <span>System</span>
          {theme === "system" && <span className="ml-auto text-[10px]">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
