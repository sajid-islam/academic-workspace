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
      // set local storage
      localStorage.setItem("sound", String(newValue));
      // Apply sound class
      document.documentElement.classList.remove("sound-true", "sound-false");
      document.documentElement.classList.add("sound-" + newValue);
      // dispatch event
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
      <span className="relative">
        <SpeakerHighIcon className="size-4 in-[.sound-true]:block hidden" />
        <SpeakerSlashIcon className="size-4 in-[.sound-false]:block hidden" />
      </span>
    </button>
  );
}
