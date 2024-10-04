import React from "react";
import useDesigner from "./hooks/use-designer";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "@/hooks/use-toast";

export default function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = React.useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "Success",
        description: "Form saved successfully",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      variant={"outline"}
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <Save className="w-4 h-4" />
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save"}
    </Button>
  );
}
