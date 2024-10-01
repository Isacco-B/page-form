import React from "react";
import { Button } from "./ui/button";
import { Eye } from "lucide-react";

export default function PreviewDialogBtn() {
  return (
    <Button variant={"outline"} className="gap-2">
      <Eye className="w-4 h-4" />
      Preview
    </Button>
  );
}
