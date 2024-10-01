"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { MoonIcon, SunIcon, Monitor } from "lucide-react";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <Tabs>
      <TabsList className="border">
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <Monitor className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
