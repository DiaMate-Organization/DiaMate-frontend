"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ArticleList } from "@/lib/data";
import ArticlesListSkeleton from "./ArticleListSkeleton";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ArticleCarousel() {
  const [articles, SetArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllArticle() {
      setLoading(true);
      try {
        const res = await axios.get(`${HOST}/`);
        const data = res.data;
        SetArticles(data);
        return data;
      } catch (err) {
        console.warn("⚠️ API failed, using local data as fallback", err);
        const res = await axios.get("http://localhost:3000/data/articles.json");
        const data = res.data;
        SetArticles(data);
        return data;
      } finally {
        setLoading(false);
      }
    }

    getAllArticle();
  }, []);

  return loading ? (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
      <Skeleton className="w-full h-[280px] rounded-md" />
      <Skeleton className="w-full h-[280px] rounded-md" />
      <Skeleton className="w-full h-[280px] rounded-md" />
    </div>
  ) : (
    <Carousel className="w-full max-w-7xl">
      <CarouselContent className="-ml-1 gap-8">
        {articles.map((data, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className={"border-0 bg-transparent"}>
                <Image
                  width={500}
                  height={500}
                  src={data.image}
                  className="rounded-md"
                  alt="articles image"
                />
                <div className="flex flex-col items-start py-2 px-2">
                  <h3 className="text-2xl font-semibold">
                    <a href={`/article/${data.slug}`}>{data.title}</a>
                  </h3>

                  <div className="flex mt-5 text-muted-foreground w-full items-center justify-between">
                    <p>{data.creator}</p>
                    <p>{data.readMinutes} Menit</p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default ArticleCarousel;
