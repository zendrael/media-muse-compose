
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AppHeader() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-xl font-semibold hidden md:block">Social Media Manager</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button size="sm" className="bg-brand-purple hover:bg-brand-purple/90">
          <Plus className="h-4 w-4 mr-1" /> Create New
        </Button>
      </div>
    </header>
  );
}
