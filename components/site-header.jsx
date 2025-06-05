"use client";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/prediksi": "Prediksi Risiko",
  "/dashboard/rekomendasi": "Rekomendasi",
  "/dashboard/riwayat": "Riwayat",
  "/dashboard/edukasi": "Edukasi",
  "/dashboard/laporan": "Laporan",
};

export function SiteHeader() {
  const pathname = usePathname();
  const pageTitle = pageTitles[pathname] || "DiaMate Dashboard";

  return (
    <header className="flex h-12 shrink-0 items-center border-b border-border w-full z-10">
      <div className="flex items-center  px-2 lg:px-6 flex-1">
        <SidebarTrigger className="bg-transparent hover:bg-muted" />
        <Separator orientation="vertical" className="h-4 mx-2" />
        <h1 className="text-base font-medium text-foreground">{pageTitle}</h1>
      </div>
      <div className="pr-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
