import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselComponent({ data }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full px-5"
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1 pointer-events-none">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block pointer-events-auto"
              >
                <Card className="p-4 h-70 hover:shadow-md transition-shadow">
                  <CardContent className="flex max-w-5xl flex-col w-full items-center justify-center p-6">
                    <Image
                      width={100}
                      height={100}
                      src={item.image}
                      alt="teams avatar"
                      className="rounded-full"
                    />
                    <h3 className="mt-5 text-md md:text-xl text-center font-semibold">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-base text-center">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </div>
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
