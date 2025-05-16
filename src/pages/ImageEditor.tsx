
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ImageIcon, Upload, Text, Edit, Download, Image, Save, Check } from "lucide-react";
import { toast } from "sonner";

export default function ImageEditor() {
  const [activeTab, setActiveTab] = useState("upload");
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  
  const handleImageUpload = () => {
    toast("Image uploaded successfully", {
      description: "Your image is now ready for editing"
    });
    setActiveTab("edit");
  };
  
  const handleSaveImage = () => {
    toast("Image saved to library", {
      description: "You can find your image in the content library"
    });
  };
  
  const handleDownloadImage = () => {
    toast("Image downloaded", {
      description: "Your image has been downloaded to your device"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Image Editor</h1>
        <p className="text-muted-foreground mt-2">
          Create and edit images for your social media platforms
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
                  Upload an image to start editing
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
                        Support for JPG, PNG, SVG
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-muted rounded-lg p-2 cursor-pointer hover:border-brand-purple">
                    <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">sample-1.jpg</p>
                  </div>
                  <div className="border border-muted rounded-lg p-2 cursor-pointer hover:border-brand-purple">
                    <div className="aspect-square bg-muted rounded-md flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-center mt-2 text-muted-foreground">sample-2.jpg</p>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleImageUpload}>
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
                    <CardTitle>Canvas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[4/3] bg-accent rounded-lg flex items-center justify-center">
                      <div className="text-muted-foreground text-sm flex flex-col items-center">
                        <Image className="h-12 w-12 mb-2" />
                        <span>Image preview will appear here</span>
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
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Brightness</span>
                        <span className="text-sm text-muted-foreground">{brightness[0]}%</span>
                      </div>
                      <Slider
                        value={brightness}
                        min={0}
                        max={200}
                        step={1}
                        onValueChange={setBrightness}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Contrast</span>
                        <span className="text-sm text-muted-foreground">{contrast[0]}%</span>
                      </div>
                      <Slider
                        value={contrast}
                        min={0}
                        max={200}
                        step={1}
                        onValueChange={setContrast}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="w-full">
                        <Text className="h-4 w-4 mr-2" /> Add Text
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" /> Crop
                      </Button>
                    </div>
                    
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
                  Save or download your edited image
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-[4/3] bg-accent rounded-lg flex items-center justify-center">
                  <div className="text-muted-foreground text-sm flex flex-col items-center">
                    <Image className="h-12 w-12 mb-2" />
                    <span>Final image preview</span>
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
                            <option>PNG</option>
                            <option>JPG</option>
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
                          <span className="text-sm font-medium">Size:</span>
                          <select className="rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                            <option>Original</option>
                            <option>Pinterest Pin (1000×1500)</option>
                            <option>Custom</option>
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
                        <Button variant="outline" className="w-full" onClick={handleSaveImage}>
                          <Save className="h-4 w-4 mr-2" /> Save to Library
                        </Button>
                        <Button className="w-full" onClick={handleDownloadImage}>
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
