import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="font-bold text-3xl hover:cursor-pointer">
      Page <span className="text-muted-foreground">Form</span>
    </Link>
  );
}
