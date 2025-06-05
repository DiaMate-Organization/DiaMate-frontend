const { Skeleton } = require("../ui/skeleton");

export default function ArticleGridSkeleton({ cols }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[...Array(cols)].map((_, id) => (
        <div key={id} className="p-1">
          <div className="border-0 bg-transparent">
            {/* Skeleton gambar */}
            <Skeleton className="w-full bg-muted h-80 rounded-md" />

            <div className="flex flex-col items-start py-2 px-2 space-y-3">
              {/* Skeleton judul */}
              <Skeleton className="h-8 bg-muted w-3/4 rounded-md" />

              {/* Skeleton author & read_minutes */}
              <div className="flex w-full items-center justify-between">
                <Skeleton className="h-4 bg-muted w-1/3 rounded-md" />
                <Skeleton className="h-4 bg-muted w-1/6 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
