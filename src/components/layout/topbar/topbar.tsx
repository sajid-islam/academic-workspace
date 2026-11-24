import ThemeSwitcher from "@/components/common/theme-switcher";
import { SoundToggle } from "./sound-toggle";
import { TopbarBreadcrumb } from "./topbar-breadcrumb";
import { UserPopover } from "./user-popover";

interface TopbarProps {
  onOpenMobileNav?: () => void;
}

export function Topbar({ onOpenMobileNav }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/85 px-4 sm:px-6 backdrop-blur-md">
      <TopbarBreadcrumb onOpenMobileNav={onOpenMobileNav} />

      <div className="flex items-center gap-2 sm:gap-3">
        <SoundToggle />
        <ThemeSwitcher />
        <UserPopover />
      </div>
    </header>
  );
}
