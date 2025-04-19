"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Activity,
  AlertCircle,
  Bell,
  BookOpen,
  ClipboardList,
  FileText,
  Heart,
  History,
  Home,
  Menu,
  Pill,
  User,
  X,
} from "lucide-react";

const routes = [
  {
    name: "Beranda",
    path: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Prediksi Risiko",
    path: "/prediksi",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    name: "Rekomendasi",
    path: "/rekomendasi",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    name: "Riwayat",
    path: "/riwayat",
    icon: <History className="h-5 w-5" />,
  },
  {
    name: "Edukasi",
    path: "/edukasi",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: "Gula Darah",
    path: "/gula-darah",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    name: "Obat",
    path: "/obat",
    icon: <Pill className="h-5 w-5" />,
  },
  {
    name: "Makanan",
    path: "/makanan",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Laporan",
    path: "/laporan",
    icon: <Heart className="h-5 w-5" />,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DiabetesRiskTracker Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <h1 className="text-xl font-semibold text-primary hidden sm:block">
              DiabetesRiskTracker
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 space-x-1">
            {routes.slice(0, 5).map((route) => (
              <Link key={route.path} href={route.path}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground hover:text-primary hover:bg-primary/5"
                >
                  {route.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
              3
            </span>
            <span className="sr-only">Notifikasi</span>
          </Button>

          <Link href="/profil" className="hidden sm:block">
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              Profil
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0">
              <SheetHeader>
                <SheetTitle>
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center">
                      <Image
                        src="/logo.png"
                        alt="DiabetesRiskTracker Logo"
                        width={32}
                        height={32}
                        className="mr-2"
                      />
                      <h2 className="font-semibold text-primary">
                        DiabetesRiskTracker
                      </h2>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                    >
                      {/* <X className="h-5 w-5" /> */}
                    </Button>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-auto py-2">
                  <nav className="flex flex-col px-2 space-y-1">
                    {routes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/5"
                        >
                          <div className="flex items-center">
                            <div className="mr-3">{route.icon}</div>
                            {route.name}
                          </div>
                        </Button>
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="p-4 border-t mt-auto">
                  <Link href="/profil" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                      <User className="h-4 w-4" />
                      Profil Pengguna
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
