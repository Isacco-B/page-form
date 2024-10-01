import React from 'react'
import { Button } from './ui/button';
import { ArrowUpToLine } from 'lucide-react';

export default function PublishFormBtn() {
  return (
    <Button className="gap-2">
      <ArrowUpToLine className="w-4 h-4" />
      Publish
    </Button>
  );
}
