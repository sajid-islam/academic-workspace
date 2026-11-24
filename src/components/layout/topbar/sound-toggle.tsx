"use client";

import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function SoundToggle() {
  const [soundOn, setSoundOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("sound") === "true";
  });

  const handleToggle = () => {
    setSoundOn((prev) => {
      const newValue = !prev;
      localStorage.setItem("sound", String(newValue));
      window.dispatchEvent(new CustomEvent("sound-change", { detail: newValue }));
      return newValue;
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={soundOn ? "Mute notifications" : "Unmute notifications"}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {soundOn ? <SpeakerHighIcon className="size-4" /> : <SpeakerSlashIcon className="size-4" />}
    </button>
  );
}
