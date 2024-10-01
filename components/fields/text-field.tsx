"use client"

import { TextIcon } from 'lucide-react';
import { ElementsType, FormElement } from '../form-elements'

const type : ElementsType = "TextFiled"
export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: true,
      placheholder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: TextIcon,
    label: "Text field",
  },
  designerComponent: () => <div>Designer Component</div>,
  fromComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
