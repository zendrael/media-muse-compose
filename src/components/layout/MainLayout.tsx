
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <SidebarProvider defaultCollapsed={false} collapsedWidth={64}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <AppHeader />
          
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
          
          <footer className="border-t border-border py-4 px-6 text-center text-sm text-muted-foreground">
            SocialSync © {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
