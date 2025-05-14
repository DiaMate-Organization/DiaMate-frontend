"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell, ChevronLeft, ChevronRight, Menu, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function DashboardNav({
  setSidebarOpen,
  desktopSidebarOpen,
  setDesktopSidebarOpen,
}) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile sidebar toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          {/* Desktop sidebar toggle */}
          <Button
            variant="primary"
            size="icon"
            className="hidden md:flex mr-2 hover:bg-muted"
            onClick={() => setDesktopSidebarOpen(!desktopSidebarOpen)}
          >
            {desktopSidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
            <span className="sr-only">
              {desktopSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            </span>
          </Button>
          
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/logo.webp"
              alt="DiaMate Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <h1 className="text-lg font-semibold text-primary">
              DiaMate
            </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-3 md:mr-4">
          <Button 
            variant="primary" 
            size="icon" 
            className="relative bg-transparent border-2 hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
              3
            </span>
          </Button>
          
          <ThemeToggle />

          {/* <Link href="/dashboard/profil">
            <Button variant="primary" size="sm" className="gap-2 bg-transparent border-2 hover:bg-muted">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Bobon Santoso</span>
            </Button>
          </Link> */}
        </div>
      </div>
    </header>
  );
}