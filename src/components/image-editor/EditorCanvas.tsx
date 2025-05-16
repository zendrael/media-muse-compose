
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Image } from 'fabric';
import { toast } from 'sonner';
import { applyBrightnessContrast } from '@/lib/image-editor/filters';
import type { ImageEditorState } from '@/lib/image-editor/types';

interface EditorCanvasProps {
  editorState: ImageEditorState;
  onImageLoaded: () => void;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ editorState, onImageLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const imageRef = useRef<Image | null>(null);
  
  // Initialize fabric canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#f8f9fa'
    });
    
    fabricRef.current = canvas;
    
    return () => {
      canvas.dispose();
    };
  }, []);
  
  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      Image.fromURL(event.target.result.toString(), (img) => {
        if (!fabricRef.current) return;
        
        // Clear canvas
        fabricRef.current.clear();
        
        // Scale image to fit canvas
        const canvas = fabricRef.current;
        const canvasWidth = canvas.width || 800;
        const canvasHeight = canvas.height || 600;
        
        const scale = Math.min(
          canvasWidth / img.width!, 
          canvasHeight / img.height!
        );
        
        img.scale(scale * 0.9);
        
        // Center image
        img.set({
          left: canvasWidth / 2,
          top: canvasHeight / 2,
          originX: 'center',
          originY: 'center',
          selectable: true,
        });
        
        // Store image reference and add to canvas
        imageRef.current = img;
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        
        onImageLoaded();
        toast.success('Image loaded successfully');
      });
    };
    
    reader.readAsDataURL(file);
  };
  
  // Apply brightness and contrast when editorState changes
  useEffect(() => {
    if (!fabricRef.current || !imageRef.current) return;
    
    applyBrightnessContrast(
      fabricRef.current,
      imageRef.current,
      editorState.brightness,
      editorState.contrast
    );
  }, [editorState.brightness, editorState.contrast]);
  
  // Add text when text value changes
  useEffect(() => {
    if (!fabricRef.current || !editorState.text.value) return;
    
    const canvas = fabricRef.current;
    
    const text = new fabric.Text(editorState.text.value, {
      left: canvas.width! / 2,
      top: canvas.height! / 2,
      fontSize: editorState.text.fontSize,
      fill: editorState.text.color,
      fontFamily: editorState.text.fontFamily,
      originX: 'center',
      originY: 'center',
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    
    toast.success('Text added to canvas');
  }, [editorState.text.value]);
  
  return (
    <div className="relative">
      <canvas ref={canvasRef} className="border rounded-lg shadow-md" />
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      <label
        htmlFor="imageUpload"
        className="absolute inset-0 flex items-center justify-center bg-black/10 cursor-pointer hover:bg-black/20 transition-colors opacity-0 hover:opacity-100"
      >
        <span className="bg-white rounded-lg px-4 py-2 shadow-lg">Click to Upload Image</span>
      </label>
    </div>
  );
};

export default EditorCanvas;
