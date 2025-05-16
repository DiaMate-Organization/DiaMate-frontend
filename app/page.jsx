"use client";

import LandingPageNav from "@/components/LandingPageNav";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { benefits, univ } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  ChartColumnBig,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full mb-5 bg-yellow-100 text-yellow-900 px-4 text-sm md:text-base text-center flex items-center justify-center gap-5 border-b border-yellow-300">
        <Marquee>
          <strong className="font-medium">Perhatian:</strong> Hasil dari DiaMate
          bersifat prediktif awal dan bukan diagnosis medis.
        </Marquee>
      </div>

      {/* Navbar */}
      <LandingPageNav />

      {/* Main Content */}

      <div className="mx-12 md:mx-20 mt-14 lg:pl-18">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row items-center gap-5 justify-between md:mt-32">
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
            <p className="mt-4 lg:text-lg text-base text-gray-400 leading-snug max-w-xl">
              Diamate membantu kamu mengenali risiko diabetes lebih awal dengan
              teknologi AI 🤖 dan langkah yang sederhana.
            </p>
            <div className="mt-5">
              <InteractiveHoverButton>Mulai Assessment</InteractiveHoverButton>
            </div>

            <div className="flex mt-12 flex-col gap-2">
              <p className="lg:text-lg text-base text-gray-400 leading-snug max-w-xl">
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

        {/* Intro section */}
        <div className="mt-28 md:mt-52">
          <div className="flex gap-3 items-center">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <p id="introduction" className="text-gray-400">
              Introduction
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-20">
            <h2 className="text-3xl w-full md:text-4xl leading-snug font-bold ">
              Tentang kami
            </h2>
            <div>
              <BoxReveal boxColor={"#00B0FF"} duration={1}>
                <h3 className="text-xl md:text-2xl lg:text-3xl tracking-tight leading-snug">
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
        <div className="mt-28 md:mt-52 items-center justify-center">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <p className="text-gray-400">Benefits</p>
          </div>
          <h2 className="text-center md:text-4xl text-3xl font-bold">
            Kenapa pilih kami ?
          </h2>
          <div className="flex items-center justify-center">
            <div className="mt-15 lg:mx-24 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
              {benefits.map((benefit, index) => (
                <Card key={index} className="lg:max-w-xl bg-transparent">
                  <CardHeader className="flex items-center justify-center">
                    {benefit.icon}
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-center text-base md:text-2xl font-medium">
                      {benefit.title}
                    </h3>
                    <p className="mt-4 text-center text-gray-400 tracking-tight leading-snug">
                      {benefit.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
