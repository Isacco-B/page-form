import React from "react";
import SidebarBtnElement from "./sidebar-btn-element";
import { FormElements } from "./form-elements";

export default function FormElementsSidebar() {
  return (
    <div className="w-full">
      <SidebarBtnElement formElement={FormElements.TextFiled} />
    </div>
  );
}
