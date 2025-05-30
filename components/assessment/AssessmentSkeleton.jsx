import { Skeleton } from "@/components/ui/skeleton";

export default function AssessmentSkeleton({ rows = 5 }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-card">
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-20 bg-muted" />
            </th>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-24 bg-muted" />
            </th>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-16 bg-muted" />
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, index) => (
            <tr key={index} className="border-b border-border">
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-32 bg-muted" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-6 w-20 bg-muted" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-6 w-8 bg-muted" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}