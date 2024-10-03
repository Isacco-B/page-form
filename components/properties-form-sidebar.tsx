import React from "react";
import useDesigner from "./hooks/use-designer";
import { FormElements } from "./form-elements";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Separator } from "./ui/separator";

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Elements properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="mb-4"/>
      <PropertiesForm elementInstance={selectedElement}/>
    </div>
  );
}
