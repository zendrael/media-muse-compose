
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText } from 'react-konva';
import useImage from 'use-image';
import { toast } from 'sonner';
import type { ImageEditorState } from '@/lib/image-editor/types';
import { applyBrightnessContrast } from '@/lib/image-editor/filters';

interface EditorCanvasProps {
  editorState: ImageEditorState;
  onImageLoaded: () => void;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ editorState, onImageLoaded }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [processedImage, loadProcessedImage] = useImage(imageUrl);
  const stageRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Resize stage on window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setStageSize({
          width: Math.min(800, containerRef.current.offsetWidth),
          height: Math.min(600, containerRef.current.offsetHeight)
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
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
      
      const imgUrl = event.target.result.toString();
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setImageUrl(imgUrl);
        onImageLoaded();
        toast.success('Image loaded successfully');
      };
      img.src = imgUrl;
    };
    
    reader.readAsDataURL(file);
  };
  
  // Apply brightness and contrast when editorState changes
  useEffect(() => {
    if (!image) return;
    
    const newImageUrl = applyBrightnessContrast(
      image, 
      editorState.brightness, 
      editorState.contrast
    );
    
    if (newImageUrl) {
      setImageUrl(newImageUrl);
    }
  }, [editorState.brightness, editorState.contrast, image]);
  
  // Add text when text value changes
  const [textElements, setTextElements] = useState<Array<{
    id: string;
    text: string;
    fontSize: number;
    fill: string;
    fontFamily: string;
  }>>([]);
  
  useEffect(() => {
    if (!editorState.text.value) return;
    
    const newTextElement = {
      id: `text-${Date.now()}`,
      text: editorState.text.value,
      fontSize: editorState.text.fontSize,
      fill: editorState.text.color,
      fontFamily: editorState.text.fontFamily,
    };
    
    setTextElements(prev => [...prev, newTextElement]);
    toast.success('Text added to canvas');
  }, [editorState.text.value]);
  
  const downloadImage = () => {
    if (!stageRef.current) return;
    
    const dataURL = stageRef.current.toDataURL({
      pixelRatio: 2 // For better quality export
    });
    
    const link = document.createElement('a');
    link.download = 'socialsync-image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="relative" ref={containerRef}>
      <Stage
        width={stageSize.width}
        height={stageSize.height}
        ref={stageRef}
        className="border rounded-lg shadow-md bg-gray-50"
      >
        <Layer>
          {processedImage && (
            <KonvaImage
              image={processedImage}
              width={Math.min(processedImage.width, stageSize.width * 0.9)}
              height={Math.min(processedImage.height, stageSize.height * 0.9)}
              x={stageSize.width / 2}
              y={stageSize.height / 2}
              offsetX={processedImage.width / 2}
              offsetY={processedImage.height / 2}
              draggable
            />
          )}
          {textElements.map(textEl => (
            <KonvaText
              key={textEl.id}
              text={textEl.text}
              x={stageSize.width / 2}
              y={stageSize.height / 2}
              fontSize={textEl.fontSize}
              fill={textEl.fill}
              fontFamily={textEl.fontFamily}
              draggable
              align="center"
              offsetX={textEl.text.length * textEl.fontSize / 4}
              offsetY={textEl.fontSize / 2}
            />
          ))}
        </Layer>
      </Stage>
      
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      {!processedImage && (
        <label
          htmlFor="imageUpload"
          className="absolute inset-0 flex items-center justify-center bg-black/10 cursor-pointer hover:bg-black/20 transition-colors opacity-100"
        >
          <span className="bg-white rounded-lg px-4 py-2 shadow-lg">Click to Upload Image</span>
        </label>
      )}
    </div>
  );
};

export default EditorCanvas;
