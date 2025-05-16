
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Templates() {
  const youtubeTemplates = [
    { id: 1, name: "YouTube Short", thumbnail: "/placeholder.svg", dimensions: "1080×1920" },
    { id: 2, name: "YouTube Video", thumbnail: "/placeholder.svg", dimensions: "1920×1080" },
    { id: 3, name: "YouTube Thumbnail", thumbnail: "/placeholder.svg", dimensions: "1280×720" },
    { id: 4, name: "YouTube End Screen", thumbnail: "/placeholder.svg", dimensions: "1920×1080" },
  ];

  const pinterestTemplates = [
    { id: 1, name: "Pinterest Pin", thumbnail: "/placeholder.svg", dimensions: "1000×1500" },
    { id: 2, name: "Pinterest Idea Pin", thumbnail: "/placeholder.svg", dimensions: "1080×1920" },
    { id: 3, name: "Pinterest Video Pin", thumbnail: "/placeholder.svg", dimensions: "1000×1500" },
    { id: 4, name: "Recipe Pin", thumbnail: "/placeholder.svg", dimensions: "1000×1500" },
    { id: 5, name: "Product Pin", thumbnail: "/placeholder.svg", dimensions: "1000×1500" },
  ];

  const otherTemplates = [
    { id: 1, name: "4×6 Print Card", thumbnail: "/placeholder.svg", dimensions: "1200×1800" },
    { id: 2, name: "Square Post", thumbnail: "/placeholder.svg", dimensions: "1080×1080" },
    { id: 3, name: "Blog Banner", thumbnail: "/placeholder.svg", dimensions: "1200×630" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground mt-2">
          Choose from our pre-designed templates for your social media content
        </p>
      </div>

      <div className="flex items-center space-x-2 border rounded-lg px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search templates..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
        />
      </div>

      <Tabs defaultValue="youtube">
        <TabsList>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
          <TabsTrigger value="pinterest">Pinterest</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="youtube">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {youtubeTemplates.map((template) => (
                <div key={template.id} className="hover-scale">
                  <Card className="overflow-hidden cursor-pointer">
                    <div className={template.name === "YouTube Short" ? "aspect-[9/16]" : "aspect-video"}>
                      <img 
                        src={template.thumbnail} 
                        alt={template.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-base font-medium">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{template.dimensions}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-3 flex justify-center">
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pinterest">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pinterestTemplates.map((template) => (
                <div key={template.id} className="hover-scale">
                  <Card className="overflow-hidden cursor-pointer">
                    <div className={template.name === "Pinterest Idea Pin" ? "aspect-[9/16]" : "aspect-[2/3]"}>
                      <img 
                        src={template.thumbnail} 
                        alt={template.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-base font-medium">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{template.dimensions}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-3 flex justify-center">
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherTemplates.map((template) => (
                <div key={template.id} className="hover-scale">
                  <Card className="overflow-hidden cursor-pointer">
                    <div className="aspect-[4/6]">
                      <img 
                        src={template.thumbnail} 
                        alt={template.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <h3 className="text-base font-medium">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{template.dimensions}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="mt-3 flex justify-center">
                    <Button size="sm">Use Template</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
