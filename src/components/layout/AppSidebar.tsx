
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { ImageIcon, Play, Library, LayoutDashboard, Images } from "lucide-react";

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Image Editor", url: "/image-editor", icon: ImageIcon },
    { title: "Video Editor", url: "/video-editor", icon: Play },
    { title: "Content Library", url: "/content-library", icon: Library },
    { title: "Templates", url: "/templates", icon: Images },
  ];

  const isActive = (path: string) => currentPath === path;
  const isExpanded = menuItems.some((i) => isActive(i.url));
  const getNavCls = ({ isActive }: { isActive: boolean }) => 
    isActive ? "bg-sidebar-accent text-sidebar-primary-foreground font-medium" : "hover:bg-sidebar-accent/50";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}
      collapsible
    >
      <div className="py-4 flex items-center justify-center border-b border-sidebar-border">
        <h1 className={`font-bold text-xl text-white ${collapsed ? "hidden" : "block"}`}>SocialSync</h1>
        <div className={`${collapsed ? "block" : "hidden"}`}>
          <div className="h-8 w-8 bg-brand-purple rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>
        </div>
        <SidebarTrigger className="absolute top-4 right-2" />
      </div>

      <SidebarContent>
        <SidebarGroup defaultOpen={true}>
          <SidebarGroupLabel className={collapsed ? "hidden" : "block"}>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`flex items-center py-2 px-4 rounded-lg ${getNavCls}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className={`mt-auto mb-4 mx-3 pt-4 border-t border-sidebar-border ${collapsed ? "hidden" : "block"}`}>
          <div className="px-3 py-2">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-brand-purple rounded-full flex items-center justify-center text-white">
                U
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">User</p>
                <p className="text-xs text-sidebar-foreground/70">Free Plan</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
