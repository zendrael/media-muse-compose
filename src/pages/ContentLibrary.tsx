
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ImageIcon, Play, Search, Plus } from "lucide-react";

export default function ContentLibrary() {
  const images = [
    { id: 1, name: "Product Shot 1", type: "image", thumbnail: "/placeholder.svg" },
    { id: 2, name: "Banner Design", type: "image", thumbnail: "/placeholder.svg" },
    { id: 3, name: "Recipe Photo", type: "image", thumbnail: "/placeholder.svg" },
    { id: 4, name: "Logo Design", type: "image", thumbnail: "/placeholder.svg" },
    { id: 5, name: "Social Media Post", type: "image", thumbnail: "/placeholder.svg" },
    { id: 6, name: "Profile Picture", type: "image", thumbnail: "/placeholder.svg" },
  ];

  const videos = [
    { id: 1, name: "Product Demo", type: "video", thumbnail: "/placeholder.svg", duration: "0:32" },
    { id: 2, name: "Tutorial Video", type: "video", thumbnail: "/placeholder.svg", duration: "2:15" },
    { id: 3, name: "Promotional Clip", type: "video", thumbnail: "/placeholder.svg", duration: "1:03" },
    { id: 4, name: "Behind the Scenes", type: "video", thumbnail: "/placeholder.svg", duration: "4:47" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Library</h1>
          <p className="text-muted-foreground mt-2">
            Manage your media assets for social media content
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Upload New
        </Button>
      </div>

      <div className="flex items-center space-x-2 border rounded-lg px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search content..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        />
      </div>

      <Tabs defaultValue="images">
        <TabsList>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="images">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <Card key={image.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-accent relative cursor-pointer">
                    <img src={image.thumbnail} alt={image.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex space-x-2">
                        <Button size="icon" variant="secondary" className="h-8 w-8">
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate">{image.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Image</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-accent relative cursor-pointer">
                    <img src={video.thumbnail} alt={video.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-sm truncate">{video.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">Video</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
