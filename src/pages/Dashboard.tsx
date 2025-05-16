
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Play, Clock, ArrowUp } from "lucide-react";

export default function Dashboard() {
  const recentProjects = [
    { id: 1, name: "Pinterest Pin - Spring Collection", type: "image", date: "1 hour ago" },
    { id: 2, name: "YouTube Short - Product Demo", type: "video", date: "3 hours ago" },
    { id: 3, name: "Pinterest Idea Pin - Recipe", type: "image", date: "Yesterday" },
    { id: 4, name: "YouTube Video - Tutorial", type: "video", date: "2 days ago" },
  ];
  
  const renderIcon = (type: string) => {
    return type === "image" ? (
      <ImageIcon className="h-5 w-5 text-brand-purple" />
    ) : (
      <Play className="h-5 w-5 text-brand-purple" />
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your social media content management
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Media assets in library</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">YouTube Videos</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Posted on YouTube</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pinterest Pins</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">Posted on Pinterest</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <ArrowUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">From last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your recently edited content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center p-3 rounded-lg hover:bg-muted hover-scale cursor-pointer"
                >
                  <div className="mr-3 rounded-md bg-accent p-2">
                    {renderIcon(project.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{project.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" /> {project.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Pre-designed templates ready to use</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 text-center hover:border-brand-purple hover:shadow-sm transition-all duration-300 hover-scale cursor-pointer">
                <div className="aspect-square rounded-md bg-accent flex items-center justify-center mb-2">
                  <ImageIcon className="h-10 w-10 text-brand-purple" />
                </div>
                <p className="text-sm font-medium">Pinterest Pin</p>
              </div>
              <div className="border rounded-lg p-4 text-center hover:border-brand-purple hover:shadow-sm transition-all duration-300 hover-scale cursor-pointer">
                <div className="aspect-square rounded-md bg-accent flex items-center justify-center mb-2">
                  <Play className="h-10 w-10 text-brand-purple" />
                </div>
                <p className="text-sm font-medium">YouTube Short</p>
              </div>
              <div className="border rounded-lg p-4 text-center hover:border-brand-purple hover:shadow-sm transition-all duration-300 hover-scale cursor-pointer">
                <div className="aspect-square rounded-md bg-accent flex items-center justify-center mb-2">
                  <Play className="h-10 w-10 text-brand-purple" />
                </div>
                <p className="text-sm font-medium">Long Video</p>
              </div>
              <div className="border rounded-lg p-4 text-center hover:border-brand-purple hover:shadow-sm transition-all duration-300 hover-scale cursor-pointer">
                <div className="aspect-square rounded-md bg-accent flex items-center justify-center mb-2">
                  <ImageIcon className="h-10 w-10 text-brand-purple" />
                </div>
                <p className="text-sm font-medium">Recipe Pin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
