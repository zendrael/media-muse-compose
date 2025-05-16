import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Canvas, Text } from 'fabric';
import { toast } from "sonner";

import EditorCanvas from "@/components/image-editor/EditorCanvas";
import TextControls from "@/components/image-editor/TextControls";
import FilterOptions from "@/components/image-editor/FilterOptions";
import ExportOptions from "@/components/image-editor/ExportOptions";
import { filterOptions } from "@/lib/image-editor/filters"; 
import type { ImageEditorState } from "@/lib/image-editor/types";

export default function ImageEditor() {
  const [activeTab, setActiveTab] = useState("edit");
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const fabricCanvasRef = useRef<Canvas | null>(null);
  
  const editorState: ImageEditorState = {
    brightness: brightness[0],
    contrast: contrast[0],
    filter: selectedFilter,
    text: {
      value: '',
      fontSize: 20,
      color: '#000000',
      fontFamily: 'Arial'
    }
  };
  
  const handleImageLoaded = useCallback(() => {
    setImageLoaded(true);
    setActiveTab("edit");
  }, []);
  
  const handleAddText = useCallback((text: string, fontSize: number, color: string, fontFamily: string) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const newText = new Text(text, {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontSize: fontSize,
      fill: color,
      fontFamily: fontFamily,
      originX: 'center',
      originY: 'center',
    });
    
    canvas.add(newText);
    canvas.setActiveObject(newText);
    canvas.renderAll();
    
    toast.success("Text added successfully");
  }, []);
  
  const handleSelectFilter = useCallback((filterName: string) => {
    if (!fabricCanvasRef.current) return;
    
    setSelectedFilter(filterName);
    const canvas = fabricCanvasRef.current;
    const activeObjects = canvas.getActiveObjects();
    const imageObject = activeObjects.find(obj => obj instanceof Image) as Image;
    
    if (!imageObject) {
      toast.error("Please select an image first");
      return;
    }
    
    const filter = filterOptions.find(f => f.name === filterName);
    if (filter) {
      filter.apply(canvas, imageObject);
      toast.success(`Filter "${filterName}" applied`);
    }
  }, []);
  
  const handleDownload = useCallback((format: string, quality: number) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const dataURL = canvas.toDataURL({
      format: format as 'png' | 'jpeg',
      quality: quality,
    });
    
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `socialsync-image.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully");
  }, []);
  
  const handleSaveToLibrary = useCallback(() => {
    // In a real app, this would save to a database
    toast.success("Image saved to your content library");
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Image Editor</h1>
        <p className="text-muted-foreground mt-2">
          Create and edit images for your social media platforms
        </p>
      </div>

      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <EditorCanvas editorState={editorState} onImageLoaded={handleImageLoaded} />
                <div className="pt-4 flex justify-end">
                  <Button onClick={() => setActiveTab("edit")} disabled={!imageLoaded}>
                    Continue to Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="edit" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <EditorCanvas editorState={editorState} onImageLoaded={handleImageLoaded} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1 space-y-6">
                <Card>
                  <CardContent className="pt-6 space-y-6">
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
                        disabled={!imageLoaded}
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
                        disabled={!imageLoaded}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <FilterOptions
                  onSelectFilter={handleSelectFilter}
                  selectedFilter={selectedFilter}
                />
                
                <TextControls onAddText={handleAddText} />
                
                <Button className="w-full" onClick={() => setActiveTab("export")} disabled={!imageLoaded}>
                  Continue to Export
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <EditorCanvas editorState={editorState} onImageLoaded={handleImageLoaded} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-1">
                <ExportOptions
                  onDownload={handleDownload}
                  onSaveToLibrary={handleSaveToLibrary}
                  disabled={!imageLoaded}
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
