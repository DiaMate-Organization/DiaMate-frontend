"use client";

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
import { X } from "lucide-react";
import { SidebarRoutes, LogoutButton } from "./SidebarRoutes";

export function MobileSidebar({ isOpen, setIsOpen }) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
              <SidebarRoutes isExpanded={true} onLinkClick={() => setIsOpen(false)} />
            </nav>
          </div>

          <LogoutButton isExpanded={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}