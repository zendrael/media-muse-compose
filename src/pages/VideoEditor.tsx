
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Play, Upload, Text, Video, Download, Save, Check, Plus } from "lucide-react";
import { toast } from "sonner";

export default function VideoEditor() {
  const [activeTab, setActiveTab] = useState("upload");
  const [videoClips, setVideoClips] = useState<number[]>([]);
  
  const handleVideoUpload = () => {
    toast("Video uploaded successfully", {
      description: "Your video is now ready for editing"
    });
    setVideoClips([1]);
    setActiveTab("edit");
  };
  
  const handleAddClip = () => {
    setVideoClips([...videoClips, videoClips.length + 1]);
    toast("Video clip added", {
      description: "You can now edit and arrange your clips"
    });
  };
  
  const handleSaveVideo = () => {
    toast("Video saved to library", {
      description: "You can find your video in the content library"
    });
  };
  
  const handleDownloadVideo = () => {
    toast("Video downloaded", {
      description: "Your video has been downloaded to your device"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Video Editor</h1>
        <p className="text-muted-foreground mt-2">
          Create and edit videos for your social media platforms
        </p>
      </div>

      <Tabs defaultValue="upload" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload Media</CardTitle>
                <CardDescription>
                  Upload videos to start editing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center cursor-pointer hover:border-brand-purple transition-colors">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="bg-accent rounded-full p-3">
                      <Upload className="h-6 w-6 text-brand-purple" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Drag and drop or click to upload</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Support for MP4, MOV, AVI
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-muted rounded-lg p-2 cursor-pointer hover:border-brand-purple">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative">
                      <Play className="h-8 w-8 text-muted-foreground" />
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1 rounded">
                        0:32
                      </div>
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">sample-video.mp4</p>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleVideoUpload}>
                    Continue to Edit <Check className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="edit" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                      <div className="text-muted-foreground text-sm flex flex-col items-center">
                        <Video className="h-12 w-12 mb-2" />
                        <span>Video preview will appear here</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 bg-muted/30">
                      <div className="mb-3 flex justify-between items-center">
                        <h3 className="text-sm font-medium">Timeline</h3>
                        <Button size="sm" variant="ghost" onClick={handleAddClip}>
                          <Plus className="h-4 w-4 mr-1" /> Add Clip
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {videoClips.map((clip, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="bg-accent p-2 rounded">
                              <Video className="h-4 w-4 text-brand-purple" />
                            </div>
                            <div className="flex-1 h-10 bg-accent/50 rounded relative">
                              <div className="absolute inset-y-0 left-0 w-1/3 bg-brand-purple/30 rounded" />
                            </div>
                            <div className="text-xs text-muted-foreground">0:12</div>
                          </div>
                        ))}
                        
                        {videoClips.length === 0 && (
                          <div className="text-center py-4 text-sm text-muted-foreground">
                            No clips added yet
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Edit Options</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full">
                        <Text className="h-4 w-4 mr-2" /> Add Text
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Play className="h-4 w-4 mr-2" /> Add Transition
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Clip Options</h3>
                      <Button variant="outline" className="w-full">
                        Trim Clip
                      </Button>
                      <Button variant="outline" className="w-full">
                        Split Clip
                      </Button>
                      <Button variant="outline" className="w-full">
                        Add Audio
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <Button className="w-full" onClick={() => setActiveTab("export")}>
                      Continue to Export <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>
                  Save or download your edited video
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-video bg-accent rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground text-sm flex flex-col items-center">
                    <Video className="h-12 w-12 mb-2" />
                    <span>Final video preview</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Export Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2 items-center">
                          <span className="text-sm font-medium">Format:</span>
                          <select className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option>MP4</option>
                            <option>MOV</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                          <span className="text-sm font-medium">Quality:</span>
                          <select className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2 items-center">
                          <span className="text-sm font-medium">Resolution:</span>
                          <select className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option>1080p</option>
                            <option>720p</option>
                            <option>480p</option>
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" className="w-full" onClick={handleSaveVideo}>
                          <Save className="h-4 w-4 mr-2" /> Save to Library
                        </Button>
                        <Button className="w-full" onClick={handleDownloadVideo}>
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
