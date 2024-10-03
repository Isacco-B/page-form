import React from 'react'
import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}
