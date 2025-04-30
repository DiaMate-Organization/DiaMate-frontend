"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent,
  SheetDescription,
  SheetHeader, 
  SheetTitle,
  SheetClose 
} from "@/components/ui/sheet";
import {
  Activity,
  AlertCircle,
  BookOpen,
  ClipboardList,
  FileText,
  Heart,
  History,
  Home,
  LogOut,
  X,
} from "lucide-react";

const routes = [
  {
    name: "Beranda",
    path: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Prediksi Risiko",
    path: "/dashboard/prediksi",
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    name: "Rekomendasi",
    path: "/dashboard/rekomendasi",
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    name: "Riwayat",
    path: "/dashboard/riwayat",
    icon: <History className="h-5 w-5" />,
  },
  {
    name: "Edukasi",
    path: "/dashboard/edukasi",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: "Gula Darah",
    path: "/dashboard/gula-darah",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    name: "Makanan",
    path: "/dashboard/makanan",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    name: "Laporan",
    path: "/dashboard/laporan",
    icon: <Heart className="h-5 w-5" />,
  },
];

export function DashboardSidebar({ mobileOpen, setMobileOpen, desktopOpen }) {
  const pathname = usePathname();
  
  return (
    <>
      <aside 
        className={`hidden md:flex flex-col border-r bg-background transition-all duration-300 ease-in-out ${
          desktopOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 border-b flex items-center">
          <Image
            src="/logo.webp"
            alt="DiaMate Logo"
            width={32}
            height={32}
            className={desktopOpen ? "mr-2" : ""}
          />
          {desktopOpen && (
            <h2 className="font-semibold text-primary">DiaMate</h2>
          )}
        </div>
        
        <nav className="flex-1 overflow-auto py-4">
          <div className={`space-y-1 ${desktopOpen ? "px-3" : "px-2"}`}>
            {routes.map((route) => {
              const isActive = pathname === route.path;
              return (
                <Link key={route.path} href={route.path}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full mb-1 ${
                      desktopOpen ? "justify-start" : "justify-center px-0"
                    }`}
                    title={!desktopOpen ? route.name : undefined}
                  >
                    <span className={`inline-flex items-center ${desktopOpen ? "" : "justify-center"}`}>
                      <span className={desktopOpen ? "mr-3" : ""}>{route.icon}</span>
                      {desktopOpen && route.name}
                    </span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="p-4 border-t">
          {desktopOpen ? (
            <Link href="/login">
              <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button 
                className="w-full bg-primary hover:bg-primary/90 px-0 justify-center" 
                title="logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </aside>
      
      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent 
          side="left" 
          className="w-[80%] max-w-xs p-0 border-r-0"
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b px-4 py-3">
              <SheetTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    src="/logo.webp"
                    alt="DiaMate Logo"
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <h2 className="font-semibold text-primary">
                    DiaMate
                  </h2>
                </div>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Menu navigasi DiaMate
              </SheetDescription>
            </SheetHeader>
          
            <div className="flex-1 overflow-auto">
              <nav className="flex flex-col py-2">
                {routes.map((route) => {
                  const isActive = pathname === route.path;
                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start rounded-none border-0 h-12 px-4"
                      >
                        <span className="inline-flex items-center">
                          <span className="mr-3">{route.icon}</span>
                          {route.name}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="p-4 border-t mt-auto">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}