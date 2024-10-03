"use client";
import React from "react";
import { Button } from "./ui/button";

export default function VisitBtn({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const shareUrl = `${window.location.origin}/submit/${shareURL}`;
  return (
    <Button
      className="w-[200px]"
      onClick={() => window.open(shareUrl, "_blank")}
    >
      Visit
    </Button>
  );
}
