"use client";

import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";



export function DashboardSidebar({ 
  mobileOpen, 
  setMobileOpen, 
  desktopOpen,
  setDesktopOpen 
}) {
  return (
    <>
      <DesktopSidebar isExpanded={desktopOpen} />
      <MobileSidebar isOpen={mobileOpen} setIsOpen={setMobileOpen} />
    </>
  );
}