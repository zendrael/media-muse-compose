
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Text } from 'lucide-react';

interface TextControlsProps {
  onAddText: (text: string, fontSize: number, color: string, fontFamily: string) => void;
}

const TextControls: React.FC<TextControlsProps> = ({ onAddText }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState([16]);
  const [color, setColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Arial');
  
  const handleAddText = () => {
    if (!text) return;
    onAddText(text, fontSize[0], color, fontFamily);
    setText('');
  };
  
  const fontOptions = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Text className="h-5 w-5" /> Text Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Font Size</span>
            <span className="text-sm text-muted-foreground">{fontSize[0]}px</span>
          </div>
          <Slider
            value={fontSize}
            min={8}
            max={72}
            step={1}
            onValueChange={setFontSize}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Font Family</label>
          <select
            className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm w-full"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {fontOptions.map((font) => (
              <option key={font} value={font}>{font}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Text Color</label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-8 p-1"
            />
            <Input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>
        
        <Button className="w-full" onClick={handleAddText}>
          Add Text
        </Button>
      </CardContent>
    </Card>
  );
};

export default TextControls;
