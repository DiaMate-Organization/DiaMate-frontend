// to do : add diynamic data

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

function ArticleSection() {
  return (
    <Carousel className="w-full max-w-7xl">
      <CarouselContent className="-ml-1 gap-8">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className={"border-0 bg-transparent"}>
                <Image
                  width={500}
                  height={500}
                  src={"/article-1.jpg"}
                  className="rounded-md"
                  alt="articles iamge"
                />
                <div className="flex flex-col items-start py-2 px-2">
                  <h3 className="text-2xl font-semibold">
                    <a href="#">
                      Makanan sehat yang bisa dimakan saat diabetes
                    </a>
                  </h3>

                  <div className="flex mt-5 text-muted-foreground w-full items-center justify-between">
                    <p>Dewi Persik</p>
                    <p>6 Menit</p>
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

export default ArticleSection;
