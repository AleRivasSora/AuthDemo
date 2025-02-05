"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground"
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
