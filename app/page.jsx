"use client";

import LandingPageNav from "@/components/LandingPageNav";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AvatarCircles } from "@/components/magicui/avatar-circles";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Button } from "@/components/ui/button";
import { univ } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, InfoIcon, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full mb-5 bg-yellow-100 text-yellow-900 px-4 py-2 text-sm md:text-base text-center flex items-center justify-center gap-2 border-b border-yellow-300">
        <TriangleAlertIcon className="w-5 h-5 text-yellow-600" />
        <span>
          <strong className="font-medium">Perhatian:</strong> Hasil dari Diamate
          bersifat prediktif awal dan bukan diagnosis medis.
        </span>
      </div>

      {/* Navbar
      <LandingPageNav /> */}

      {/* Main Content */}

      <div className="mx-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-5 justify-between md:mt-32 mx-5">
          <div className="relative z-0 flex flex-col items-center justify-center text-center md:text-left md:items-start w-full md:w-1/2 mt-10 md:mt-0 md:pl-18">
            <div className="pb-5">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ Introducing DiaMate</span>
                  <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>

            <h1 className="md:text-5xl text-4xl font-medium leading-tight tracking-tight">
              Sehat itu mudah kalau dimulai hari ini.
            </h1>
            <p className="mt-4 md:text-lg text-base text-gray-400 leading-snug max-w-xl">
              Diamate membantu kamu mengenali risiko diabetes lebih awal dengan
              teknologi AI 🤖 dan langkah yang sederhana.
            </p>
            <div className="mt-5">
              <InteractiveHoverButton>Mulai Assessment</InteractiveHoverButton>
            </div>

            <div className="flex mt-5 flex-col gap-2">
              <p className="md:text-lg text-base text-gray-400 leading-snug max-w-xl">
                Dibuat oleh mahasiswa dari 4 universitas yang bereputasi
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
      </div>
    </>
  );
}
