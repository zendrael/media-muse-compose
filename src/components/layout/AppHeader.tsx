
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppHeader() {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate("/image-editor");
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-xl font-semibold hidden md:block">Social Media Manager</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button size="sm" className="bg-brand-purple hover:bg-brand-purple/90" onClick={handleCreateNew}>
          <Plus className="h-4 w-4 mr-1" /> Create New
        </Button>
      </div>
    </header>
  );
}
