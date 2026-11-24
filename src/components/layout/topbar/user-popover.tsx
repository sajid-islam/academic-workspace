"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "@/context/workspace-context";
import { useGetMeQuery } from "@/redux/apis/user/user.slice";
import { GearSix, SignOut } from "@phosphor-icons/react";
import Link from "next/link";

export function UserPopover() {
  const { student } = useWorkspace();
  const { data: user, isLoading, isError } = useGetMeQuery();

  if (isLoading) {
    return (
      <div
        className="size-8 shrink-0 rounded-full bg-gray-200 animate-pulse"
        aria-label="Loading user profile"
      />
    );
  }
  if (isError) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="User profile menu"
        >
          <Avatar className="size-8">
            <AvatarImage src={user?.user_image} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5">
        <div className="flex items-center gap-2.5 p-2">
          <Avatar className="size-9">
            <AvatarImage src={user?.user_image} alt={user?.name} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-foreground truncate">{user?.name}</span>
            <span className="text-[11px] text-muted-foreground truncate">Roll: {student.roll}</span>
            <span className="text-[10px] text-primary truncate">{user?.email}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="gap-2 text-xs cursor-pointer">
              <GearSix className="size-4 text-muted-foreground" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/login" className="gap-2 text-xs text-rose-600 cursor-pointer">
            <SignOut className="size-4" />
            <span>Sign Out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
