import React from "react";
import Logo from "@/components/logo";
import ThemeSwitcher from "@/components/theme-switcher";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <UserButton />
        </div>
      </nav>
      <main className="flex w-full flex-grow p-4">{children}</main>
    </div>
  );
}
