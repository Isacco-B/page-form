"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { Share2 } from "lucide-react";

export default function FormLinkShare({ shareURL }: { shareURL: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const shareUrl = `${window.location.origin}/submit/${shareURL}`;
  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input readOnly value={shareUrl} />
      <Button
        className="w-[250px]"
        onClick={() => {
          navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Copied",
            description: "Link copied to clipboard",
            duration: 3000,
          });
        }}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Link
      </Button>
    </div>
  );
}
