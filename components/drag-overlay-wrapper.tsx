import React from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { SidebarBtnElementDragOverlay } from "./sidebar-btn-element";
import { ElementsType, FormElements } from "./form-elements";

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = React.useState<Active | null>(null);
  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active);
      console.log(event.active);
    },
    onDragCancel() {
      setDraggedItem(null);
    },
    onDragEnd() {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}
