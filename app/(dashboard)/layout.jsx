"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/DashboardNav";
import { DashboardSidebar } from "@/components/sidebar/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar 
        mobileOpen={sidebarOpen} 
        setMobileOpen={setSidebarOpen}
        desktopOpen={desktopSidebarOpen}
        setDesktopOpen={setDesktopSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <DashboardNav
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          desktopSidebarOpen={desktopSidebarOpen}
          setDesktopSidebarOpen={setDesktopSidebarOpen}
        />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-2">
          {children}
        </main>
      </div>
    </div>
  );
}