import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlesListSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex flex-col space-y-4">
          <Skeleton className="w-full bg-muted h-[180px] rounded-md" />
          <Skeleton className="h-6 bg-muted w-3/4" />
          <Skeleton className="h-4 bg-muted w-1/2" />
        </div>
      ))}
    </div>
  );
}
