import React, { ReactNode } from "react";
import { awaitGetFormWithSubmission, GetformById } from "@/actions/form";
import { Eye, MousePointerClick, NotepadText, Waypoints } from "lucide-react";
import { StatsCard } from "../../page";
import { ElementsType, FormElementInstance } from "@/components/form-elements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import FormLinkShare from "@/components/form-link-share";
import VisitBtn from "@/components/visit-btn";

type Row = {
  [key: string]: string;
} & { submittedAt: Date };

export default async function FormDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const form = await GetformById(Number(params.id));
  if (!form) {
    throw new Error("form not found");
  }
  const { visits, submissions } = form;

  let submissionsRate = 0;
  if (visits > 0) {
    submissionsRate = Math.round((submissions / visits) * 100);
  }

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareURL={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="flex gap-2 items-center justify-center">
          <FormLinkShare shareURL={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total visits"
          icon={<Eye className="h-4 w-4" />}
          helperText="All time form visits"
          loading={false}
          value={visits.toLocaleString() || ""}
          className="shadow-none border-2"
        />
        <StatsCard
          title="Total submissions"
          icon={<NotepadText className="h-4 w-4" />}
          helperText="All time form submissions"
          loading={false}
          value={submissions.toLocaleString() || ""}
          className="shadow-none border-2"
        />
        <StatsCard
          title="Submissions rate"
          icon={<MousePointerClick className="h-4 w-4" />}
          helperText="Visits that result in form submissions"
          loading={false}
          value={submissionsRate.toLocaleString() + "%" || ""}
          className="shadow-none border-2"
        />
        <StatsCard
          title="Bounce rate"
          icon={<Waypoints className="h-4 w-4" />}
          helperText="Visits that leaves without interacting"
          loading={false}
          value={submissionsRate.toLocaleString() + "%" || ""}
          className="shadow-none border-2"
        />
      </div>
      <div className="pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

async function SubmissionsTable({ id }: { id: number }) {
  const form = await awaitGetFormWithSubmission(id);
  if (!form) {
    throw new Error("form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const colums: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextFiled":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        colums.push({
          id: element.id,
          label: element.extraAttributes?.label,
          type: element.type,
          required: element.extraAttributes?.required,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submission</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {colums.map((column) => (
                <TableHead key={column.id} className="uppercase">
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="text-muted-foreground text-right uppercase">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row ,i) => (
              <TableRow key={i}>
                {colums.map((column) => (
                  <RowCell
                    key={column.id}
                    value={row[column.id]}
                    type={column.type}
                  />
                ))}
                <TableCell className="text-muted-foreground text-right">
                  {formatDistance(row.submittedAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function RowCell({ value, type }: { value: string; type: ElementsType }) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) return;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;

    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />;
      break;
  }
  return <TableCell>{node}</TableCell>;
}
