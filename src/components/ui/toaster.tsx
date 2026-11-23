"use client";

import { Toaster, toast } from "@yusufceng1z/ding-react";
import { useEffect } from "react";

export function AppToaster() {
  useEffect(() => {
    const updateSound = (event: Event) => {
      const soundEvent = event as CustomEvent<boolean>;

      toast.configure({ sound: soundEvent.detail });
    };

    toast.configure({ sound: localStorage.getItem("sound") === "true" });

    window.addEventListener("sound-change", updateSound);

    return () => {
      window.removeEventListener("sound-change", updateSound);
    };
  }, []);
  return <Toaster position="top-center" />;
}
