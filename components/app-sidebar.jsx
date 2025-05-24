"use client";

import * as React from "react";
import { Home, AlertCircle, ClipboardList, History, BookOpen, Heart } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Prediksi Risiko",
    path: "/dashboard/prediksi",
    icon: AlertCircle,
  },
  {
    name: "Rekomendasi",
    path: "/dashboard/rekomendasi",
    icon: ClipboardList,
  },
  {
    name: "Riwayat",
    path: "/dashboard/riwayat",
    icon: History,
  },
  {
    name: "Edukasi",
    path: "/dashboard/edukasi",
    icon: BookOpen,
  },
  {
    name: "Laporan",
    path: "/dashboard/laporan",
    icon: Heart,
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4 border-b border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-0 hover:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-accent">
                  <Image
                    src="/logo.webp"
                    alt="Logo DiaMate"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-foreground">DiaMate</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain items={routes} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}