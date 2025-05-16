
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Save } from 'lucide-react';
import { toast } from 'sonner';

interface ExportOptionsProps {
  onDownload: (format: string, quality: number) => void;
  onSaveToLibrary: () => void;
  disabled: boolean;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ onDownload, onSaveToLibrary, disabled }) => {
  const [format, setFormat] = useState('png');
  const [quality, setQuality] = useState('high');
  
  const qualityValue = quality === 'high' ? 1.0 : quality === 'medium' ? 0.8 : 0.6;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Export Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Format</label>
            <select
              className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm w-full"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              disabled={disabled}
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Quality</label>
            <select
              className="rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm w-full"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={disabled}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onSaveToLibrary()} 
            disabled={disabled}
          >
            <Save className="h-4 w-4 mr-2" /> Save to Library
          </Button>
          
          <Button 
            className="w-full" 
            onClick={() => onDownload(format, qualityValue)}
            disabled={disabled}
          >
            <Download className="h-4 w-4 mr-2" /> Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
