import { useState } from "react";
import { Home, Code, Table, BookOpen, Sparkles, Layers, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Components", url: "#components", icon: Layers, isAnchor: true },
  { title: "InputField", url: "#input", icon: Code, isAnchor: true },
  { title: "DataTable", url: "#table", icon: Table, isAnchor: true },
  { title: "Storybook", url: "/storybook", icon: BookOpen },
  { title: "Features", url: "#features", icon: Sparkles, isAnchor: true },
];

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentHash = location.hash;

  const isActive = (item: typeof items[0]) => {
    if (item.isAnchor) {
      return currentHash === item.url.split('#')[1] ? `#${item.url.split('#')[1]}` : '';
    }
    return currentPath === item.url;
  };

  const getNavCls = (item: typeof items[0]) => {
    const active = isActive(item);
    return active 
      ? "bg-gradient-to-r from-brand-600/20 to-accent-cyan/20 text-brand-600 font-medium border-r-2 border-brand-600" 
      : "hover:bg-white/50 hover:text-brand-600 transition-all duration-200";
  };

  const handleAnchorClick = (url: string) => {
    if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Sidebar className="w-72">
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-brand flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg gradient-text">UI Playbook</h2>
            <p className="text-xs text-muted-foreground">React Components</p>
          </div>
        </div>
      </div>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Navigation
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.isAnchor ? (
                      <button
                        onClick={() => handleAnchorClick(item.url)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 w-full text-left ${getNavCls(item)}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </button>
                    ) : (
                      <NavLink 
                        to={item.url} 
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${getNavCls(item)}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}