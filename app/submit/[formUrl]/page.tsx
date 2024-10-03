import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/form-elements";
import FormSubmitComponent from "@/components/form-submit-component";
import React from "react";

export default async function SubmitPage({
  params,
}: {
  params: { formUrl: string };
}) {
  const formUrl = params.formUrl;
  const form = await GetFormContentByUrl(formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[]

  return <FormSubmitComponent content={formContent} formUrl={formUrl} />;
}
