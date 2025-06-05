"use client";

import Image from "next/image";
import React, { useState } from "react";

function ArticleCard({ article }) {
  const [error, setError] = useState(false);
  return (
    <div className="p-1">
      <div className={"border-0 bg-transparent"}>
        <Image
          width={500}
          height={500}
          src={error ? "/article-1.jpg" : article.thumbnail}
          onError={() => setError(true)}
          className="rounded-md w-full h-80 object-cover"
          alt="article thumbnail"
        />
        <div className="flex flex-col items-start py-2 px-2">
          <h3 className="text-2xl font-semibold">
            <a href={`/article/${article.slug}`}>{article.title}</a>
          </h3>

          <div className="flex mt-5 text-muted-foreground w-full items-center justify-between">
            <p>{article.author}</p>
            <p>{article.read_minutes} Menit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
