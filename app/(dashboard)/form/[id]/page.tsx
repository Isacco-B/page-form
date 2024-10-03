import React from "react";
import { GetformById } from "@/actions/form";
import { Eye, MousePointerClick, NotepadText, Waypoints } from "lucide-react";
import { StatsCard } from "../../page";
import FormLinkShare from "@/components/form-link-share";
import VisitBtn from "@/components/visit-btn";


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
          icon={<Eye className="h-4 w-4 text-blue-600" />}
          helperText="All time form visits"
          loading={false}
          value={visits.toLocaleString() || ""}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Total submissions"
          icon={<NotepadText className="h-4 w-4 text-yellow-600" />}
          helperText="All time form submissions"
          loading={false}
          value={submissions.toLocaleString() || ""}
          className="shadow-md shadow-yellow-600"
        />
        <StatsCard
          title="Submissions rate"
          icon={<MousePointerClick className="h-4 w-4 text-green-600" />}
          helperText="Visits that result in form submissions"
          loading={false}
          value={submissionsRate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Bounce rate"
          icon={<Waypoints className="h-4 w-4 text-red-600" />}
          helperText="Visits that leaves without interacting"
          loading={false}
          value={submissionsRate.toLocaleString() + "%" || ""}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="pt-10">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

function SubmissionsTable({ id }: { id: number }) {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submission</h1>
    </>
  )
}
