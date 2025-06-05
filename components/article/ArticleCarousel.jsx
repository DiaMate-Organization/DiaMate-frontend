"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllArticles } from "@/lib/article-actions";
import ArticleCard from "./ArticleCard";
import ArticleGridSkeleton from "./ArticleGridSkeleton";

function ArticleCarousel() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllArticle = async () => {
      try {
        const response = await getAllArticles();
        console.log(response.data);
        setArticles(response.data.articles);
      } catch (err) {
        console.error(err);
        toast("error mendapatkan article edukasi");
      } finally {
        setLoading(false);
      }
    };

    getAllArticle();
  }, []);

  return loading ? (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <ArticleGridSkeleton cols={3} />
    </div>
  ) : (
    <Carousel className="w-full max-w-7xl">
      <CarouselContent className="-ml-1 gap-8">
        {articles.slice(0, 4).map((data, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <ArticleCard article={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-end gap-4">
        <CarouselPrevious className="static translate-y-0 left-auto right-auto" />
        <CarouselNext className="static translate-y-0 left-auto right-auto" />
      </div>
    </Carousel>
  );
}

export default ArticleCarousel;
