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
      className="w-full"
    >
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className={"h-64 p-4"}>
                <CardContent className="flex flex-col w-full items-center justify-center p-6 ">
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt="teams avatar"
                    className="rounded-full"
                  />
                  <h3 className="mt-5 text-xl text-center font-semibold">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-center">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
