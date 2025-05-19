"use client";
import { CarouselComponent } from "@/components/Carousel";
import { Features } from "@/components/Features";
import LandingPageNav from "@/components/LandingPageNav";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Marquee } from "@/components/magicui/marquee";
import { Ripple } from "@/components/magicui/ripple";
import { MarqueeReviews } from "@/components/Reviews";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { benefits, data, faqs, teams, univ } from "@/lib/data";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";

import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight-new";
import ArticleCarousel from "@/components/article/ArticleCarousel";
import { Suspense } from "react";
import ArticlesListSkeleton from "@/components/article/ArticleListSkeleton";

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="mx-12 md:mx-20 mt-14 lg:pl-18">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-5 justify-between md:mt-32">
          <Spotlight />

          <div className="relative z-0 flex flex-col items-center justify-center text-center md:text-left md:items-start w-full lg:w-1/2 mt-10 md:mt-0">
            <div className="pb-5">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Introducing DiaMate</span>
                </AnimatedShinyText>
              </div>
            </div>

            <h1 className="lg:text-7xl text-4xl font-medium leading-tight tracking-tight">
              Sehat itu mudah kalau dimulai hari ini.
            </h1>
            <p className="mt-4 lg:text-lg text-base text-muted-foreground leading-snug max-w-xl">
              Diamate membantu kamu mengenali risiko diabetes lebih awal dengan
              teknologi AI 🤖 dan langkah yang sederhana.
            </p>
            <div className="mt-5">
              <InteractiveHoverButton>Mulai Assessment</InteractiveHoverButton>
            </div>

            <div className="flex mt-12 flex-col gap-2">
              <p className="lg:text-lg text-base text-muted-foreground leading-snug max-w-xl">
                Dibuat oleh mahasiswa dari 4 universitas yang kredibel
              </p>
              <div className="flex items-center md:justify-start justify-center">
                <AvatarCircles avatarUrls={univ} />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/hero-image.svg"
              alt="Ilustrasi DiaMate"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Introduction section */}
        <div id="introduction" className="mt-28 md:mt-52 lg:mx-20">
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <p id="introduction" className="text-muted-foreground">
              Introduction
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-3 md:gap-20">
            <h2 className="text-3xl w-full md:text-4xl leading-snug font-bold ">
              Tentang kami
            </h2>
            <div>
              <BoxReveal
                boxColor={"#00B0FF"}
                duration={1}
                className={"rounded-md"}
              >
                <h3 className="text-xl text-muted-foreground md:text-foreground md:text-2xl lg:text-3xl tracking-tight leading-snug">
                  <span className="text-primary italic">DiaMate</span> hadir
                  sebagai solusi digital yang membantu Anda mengenali risiko
                  diabetes sejak dini melalui teknologi machine learning. Kami
                  tidak hanya memberikan prediksi awal, tetapi juga menyediakan
                  dashboard pemantauan kesehatan dan rekomendasi aktivitas
                  harian yang dapat membantu Anda menurunkan risiko secara
                  bertahap.
                </h3>
              </BoxReveal>
            </div>
          </div>
        </div>

        {/* Why us */}
        <div
          id="benefits"
          className="relative mt-28 md:mt-44 items-center justify-center"
        >
          <div className="flex gap-3 items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <p className="text-muted-foreground">Benefits</p>
          </div>
          <h2 className="text-center md:text-4xl text-3xl font-bold">
            Kenapa pilih kami ?
          </h2>

          <Ripple mainCircleSize={380} numCircles={3} className={""} />
          <div className="z-10 relative flex items-center justify-center">
            <div className="mt-15 lg:mx-24 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
              {benefits.map((benefit, index) => (
                <Card key={index} className="lg:max-w-xl">
                  <CardHeader className="flex items-center justify-center">
                    {benefit.icon}
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-center text-base md:text-2xl font-medium">
                      {benefit.title}
                    </h3>
                    <p className="mt-4 text-center text-muted-foreground tracking-tight leading-snug">
                      {benefit.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div
          id="how-it-works"
          className="mt-28 flex flex-col justify-center w-full md:mt-52"
        >
          <div className="flex gap-3 items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <p className="text-muted-foreground">How it works</p>
          </div>
          <h2 className="text-center md:text-4xl text-3xl font-bold">
            Bagaimana kita mendiagnosis
          </h2>
          <div>
            <Features data={data} />
          </div>
        </div>
      </div>

      {/* Our Team */}
      <div id="our-team" className="mx-12 md:mx-20  mt-28 md:mt-44 lg:pl-18">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <p className="text-muted-foreground">Our Team</p>
        </div>
        <h2 className="text-center md:text-4xl text-3xl font-bold">
          Team Dibalik DiaMate
        </h2>
        <div className="max-w-5xl mt-12 mx-auto px-8 flex justify-center items-center">
          <CarouselComponent data={teams} />
        </div>
      </div>

      {/* wall of love */}
      <div className="mx-12 md:mx-20  mt-28 md:mt-44 lg:pl-18">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <p className="text-muted-foreground">Wall of Love</p>
        </div>
        <h2 className="text-center md:text-4xl text-3xl font-bold">
          Apa Kata Mereka
        </h2>
        <div className="mt-12">
          <MarqueeReviews />
        </div>
      </div>

      {/* Articles */}

      <div id="articles" className="mx-12 md:mx-20  mt-28 md:mt-44 lg:pl-18">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <p className="text-muted-foreground">Articles</p>
        </div>
        <h2 className="text-center md:text-4xl text-3xl font-bold">
          Insight Sehat ✨
        </h2>

        <div className="mt-12 flex flex-col items-center justify-center px-5 md:p-0">
          <ArticleCarousel />
        </div>
      </div>

      {/* FaQ */}
      <div id="faq" className="mx-12 md:mx-20  mt-28 md:mt-44 lg:pl-18">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <p className="text-muted-foreground">FAQ</p>
        </div>
        <h2 className="text-center md:text-4xl text-3xl font-bold">
          Sering Ditanya Nih
        </h2>
        <div className="flex flex-col mt-12 justify-center items-center">
          {faqs.map((data, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="w-full md:max-w-4xl"
            >
              <AccordionItem value={`data - ${index}`}>
                <AccordionTrigger className={"text-lg md:text-xl"}>
                  {data.question}
                </AccordionTrigger>
                <AccordionContent
                  className={" text-muted-foreground text-sm md:text-lg"}
                >
                  {data.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Footer i guess */}
      <div className="mx-12 md:mx-20 mt-28 md:mt-44 lg:pl-18">
        <div className="flex items-center justify-center">
          <AuroraBackground
            className={"rounded-md w-full md:px-8 h-80 md:h-96"}
          >
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
              <div className="text-3xl md:text-4xl font-bold dark:text-white text-center">
                Mulai sekarang, Tubuhmu akan berterimaksih nanti.
              </div>
              <Link href="#">
                <Button className="rounded-full w-fit text-foreground px-4 py-2">
                  Mulai
                </Button>
              </Link>
            </motion.div>
          </AuroraBackground>
        </div>
      </div>
    </>
  );
}
