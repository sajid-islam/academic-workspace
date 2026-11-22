"use client";

import { Toaster, toast } from "@yusufceng1z/ding-react";

toast.configure({ sound: true });

export function AppToaster() {
  return <Toaster position="top-center" />;
}
