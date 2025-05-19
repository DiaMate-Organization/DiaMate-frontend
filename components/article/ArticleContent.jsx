"use client";
import Image from "next/image";

export default function ArticleContent({ article }) {
  return (
    <div className="mx-12 md:mx-20 mt-10 lg:pl-18 overflow-hidden">
      <div className="flex flex-col items-center gap-5 justify-center md:mt-32">
        <div className="mt-32 flex flex-col items-center justify-center">
          <h2 className="text-3xl max-w-2xl md:text-5xl lg:text-6xl font-medium text-center">
            {article.title}
          </h2>
          <div className="text-center mt-5 text-muted-foreground">
            {article.creator}
          </div>
        </div>

        <div className="relative md:mt-20 w-full lg:w-1/2 aspect-[16/9]">
          <Image
            src={article.image}
            alt="article thumbnail"
            fill
            className="object-cover rounded-md"
          />
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="prose dark:prose-invert"
        ></div>
      </div>
    </div>
  );
}
