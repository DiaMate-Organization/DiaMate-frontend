"use client";

import Image from "next/image";
import { SidebarRoutes, LogoutButton } from "./SidebarRoutes";

export function DesktopSidebar({ isExpanded }) {
  return (
    <aside 
      className={`hidden md:flex flex-col border-r bg-background transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4 border-b flex items-center">
        <Image
          src="/logo.webp"
          alt="DiaMate Logo"
          width={32}
          height={32}
          className={isExpanded ? "mr-2" : ""}
        />
        {isExpanded && (
          <h2 className="font-semibold text-primary">DiaMate</h2>
        )}
      </div>
      
      <nav className="flex-1 overflow-auto py-4">
        <SidebarRoutes isExpanded={isExpanded} />
      </nav>
      
      <LogoutButton isExpanded={isExpanded} />
    </aside>
  );
}