"use client";
import Image from "next/image";

export default function ArticleContent({ article }) {
  return (
    <div className="lg:pl-18 overflow-hidden">
      <div className="flex flex-col items-center gap-5 justify-center md:mt-32">
        <div className="mt-24 flex flex-col items-center justify-center">
          <h2 className="text-3xl max-w-2xl md:text-5xl lg:text-6xl font-medium text-center">
            {article.title}
          </h2>
          <div className="text-center mt-5 text-muted-foreground">
            {article.creator}
          </div>
        </div>

        <div className="relative w-full max-w-3xl aspect-video mx-auto">
          <Image
            src={article.thumbnail}
            alt="article thumbnail"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover rounded-md"
          />
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="mt-15 prose dark:prose-invert"
        ></div>
      </div>
    </div>
  );
}
