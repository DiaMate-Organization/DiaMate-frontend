import React from "react";
import { Skeleton } from "../ui/skeleton";

function ArticleContentSkeleton() {
  return (
    <div className="mx-12 md:mx-20 mt-34 lg:pl-18 overflow-hidden">
      <div className="flex flex-col items-center gap-5 justify-center md:mt-32">
        <Skeleton className="w-3/4 md:w-2/4 h-8 md:h-16 rounded-lg" />
        <Skeleton className="w-1/3 h-5 mt-4 rounded" />

        <Skeleton className="mt-10 md:mt-20 w-full md:w-1/2 aspect-[16/9] rounded-md" />

        <div className="prose dark:prose-invert mt-8 w-full">
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6 mb-2" />
          <Skeleton className="h-4 w-3/6 mb-2" />
          <Skeleton className="h-4 w-2/6 mb-2" />
        </div>
      </div>
    </div>
  );
}

export default ArticleContentSkeleton;
