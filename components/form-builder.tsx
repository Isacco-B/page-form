"use client";

import { Form } from "@prisma/client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import PreviewDialogBtn from "./preview-dialog-btn";
import SaveFormBtn from "./save-form-btn";
import PublishFormBtn from "./publish-form-btn";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import useDesigner from "./hooks/use-designer";
import Link from "next/link";
import Confetti from "react-confetti";
import DeleteFormBtn from "./delete-form-btn";

export default function FormBuilder({ form }: { form: Form }) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const { setElements, setSelectedElement } = useDesigner();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    setIsReady(true);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => clearTimeout(readyTimeout);
  }, [form, setElements, isReady, setSelectedElement]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  const shareUrl = window.location.origin + "/submit/" + form.shareURL;

  if (form.published) {
    return (
      <>
      <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false}/>
        <div className="flex items-center justify-center w-full h-full">
          <div className="max-w-md text-center ">
            <h1 className="text-4xl font-bold text-primary border-b pb-2 mb-10">
              Form published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Anyone with the link can view and submit this form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Link copied",
                    description: "The link has been copied to your clipboard",
                    duration: 3000,
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant={"link"} asChild>
                <Link href={"/"} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Go back home
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={"/form/" + form.id} className="gap-2">
                  Form details
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between items-center border-b-2 p-4 gap-3">
          <h2 className=" truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn id={form.id}/>
                <PublishFormBtn id={form.id}/>
                <DeleteFormBtn id={form.id}/>
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url('/paper.svg')] dark:bg-[url('/paper-dark.svg')]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
