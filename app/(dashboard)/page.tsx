import React, { Suspense } from "react";
import { Getforms, GetFormsStats } from "@/actions/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import {
  ArrowRight,
  Edit,
  Eye,
  MousePointerClick,
  NotepadText,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import CreateFormBtn from "@/components/create-form-btn";

export default function DashboardPage() {
  return (
    <div className="container mx-auto pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormBtn />
        <Suspense
          fallback={Array(4)
            .fill(0)
            .map((el) => (
              <FormCardSkeleton key={el} />
            ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormsStats();
  return <StatsCards loading={false} data={stats} />;
}

interface CardStatsProps {
  loading: boolean;
  data?: Awaited<ReturnType<typeof GetFormsStats>>;
}

function StatsCards(props: CardStatsProps) {
  const { loading, data } = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<Eye className="h-4 w-4" />}
        helperText="All time form visits"
        loading={loading}
        value={data?.visits.toLocaleString() || ""}
        className="shadow-none border-2"
      />
      <StatsCard
        title="Total submissions"
        icon={<NotepadText className="h-4 w-4" />}
        helperText="All time form submissions"
        loading={loading}
        value={data?.submissions.toLocaleString() || ""}
        className="shadow-none border-2"
      />
      <StatsCard
        title="Submissions rate"
        icon={<MousePointerClick className="h-4 w-4" />}
        helperText="Visits that result in form submissions"
        loading={loading}
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        className="shadow-none border-2"
      />
      <StatsCard
        title="Bounce rate"
        icon={<Waypoints className="h-4 w-4" />}
        helperText="Visits that leaves without interacting"
        loading={loading}
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        className="shadow-none border-2"
      />
    </div>
  );
}

export function StatsCard({
  title,
  icon,
  helperText,
  loading,
  value,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  helperText: string;
  loading: boolean;
  value: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          ) : (
            value
          )}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

function FormCardSkeleton() {
  return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
}

async function FormCards() {
  const forms = await Getforms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <NotepadText className="h-4 w-4 text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
        <CardContent className="h-[20px] truncate text-sm text-start text-muted-foreground p-0">
          {form.description || "No description"}
        </CardContent>
        <CardFooter className="p-0">
          {form.published && (
            <Button
              variant={"secondary"}
              asChild
              className="w-full mt-2 text-md gap-4"
            >
              <Link href={`/form/${form.id}`}>
                View submissions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
          {!form.published && (
            <Button
              variant={"secondary"}
              asChild
              className="w-full mt-2 text-md gap-4"
            >
              <Link href={`/builder/${form.id}`}>
                Edit Form <Edit className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
