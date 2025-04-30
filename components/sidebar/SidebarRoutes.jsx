"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
  // {
  //   name: "Gula Darah",
  //   path: "/dashboard/gula-darah",
  //   icon: <Activity className="h-5 w-5" />,
  // },
  // {
  //   name: "Makanan",
  //   path: "/dashboard/makanan",
  //   icon: <FileText className="h-5 w-5" />,
  // },
  {
    name: "Laporan",
    path: "/dashboard/laporan",
    icon: <Heart className="h-5 w-5" />,
  },
];

export function SidebarRoutes({ isExpanded, onLinkClick }) {
  const pathname = usePathname();
  
  return (
    <div className={`space-y-1 ${isExpanded ? "px-3" : "px-2"}`}>
      {routes.map((route) => {
        const isActive = pathname === route.path;
        return (
          <Link 
            key={route.path} 
            href={route.path}
            onClick={onLinkClick}
          >
            <Button
              variant={isActive ? "secondary" : "primary"}
              className={`w-full mb-1 hover:bg-primary ${
                isExpanded ? "justify-start" : "justify-center px-0"
              }`}
              title={!isExpanded ? route.name : undefined}
            >
              <span className={`inline-flex items-center ${isExpanded ? "" : "justify-center"}`}>
                <span className={isExpanded ? "mr-3" : ""}>{route.icon}</span>
                {isExpanded && route.name}
              </span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
}

export function LogoutButton({ isExpanded }) {
  return (
    <div className="p-4 border-t">
      {isExpanded ? (
        <Link href="/login">
          <Button className="w-full gap-2 text-foreground  bg-primary hover:bg-primary/90">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button 
            className="w-full text-foreground bg-primary hover:bg-primary/90 px-0 justify-center" 
            title="logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}