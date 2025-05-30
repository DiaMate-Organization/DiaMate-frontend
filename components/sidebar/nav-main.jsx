"use client";

import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function NavMain({ items, currentPath }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = currentPath === item.path;
            
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.name}
                  className={cn(
                    "transition-colors duration-200",
                    isActive && "bg-accent text-accent-foreground font-medium"
                  )}
                >
                  <a href={item.path}>
                    <item.icon className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      isActive && "text-accent-foreground"
                    )} />
                    <span className={cn(
                      "transition-colors duration-200",
                      isActive && "font-medium"
                    )}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-primary" />
                    )}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}