
import type { FilterOption } from './types';

// Helper function to apply filters using canvas
const applyCanvasFilter = (
  imageElement: HTMLImageElement | null,
  filterCallback: (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void
): string => {
  if (!imageElement) return '';
  
  const canvas = document.createElement('canvas');
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  
  const context = canvas.getContext('2d');
  if (!context) return '';
  
  // Draw the original image
  context.drawImage(imageElement, 0, 0);
  
  // Apply the filter
  filterCallback(context, canvas);
  
  // Return data URL
  return canvas.toDataURL('image/png');
};

// Define filter options
export const filterOptions: FilterOption[] = [
  {
    name: 'None',
    preview: '/placeholder.svg',
    apply: (imageElement) => {
      if (!imageElement) return '';
      return applyCanvasFilter(imageElement, (ctx) => {
        // No filter applied
      });
    },
  },
  {
    name: 'Grayscale',
    preview: '/placeholder.svg',
    apply: (imageElement) => {
      return applyCanvasFilter(imageElement, (ctx, canvas) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // red
          data[i + 1] = avg; // green
          data[i + 2] = avg; // blue
        }
        
        ctx.putImageData(imageData, 0, 0);
      });
    },
  },
  {
    name: 'Sepia',
    preview: '/placeholder.svg',
    apply: (imageElement) => {
      return applyCanvasFilter(imageElement, (ctx, canvas) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        }
        
        ctx.putImageData(imageData, 0, 0);
      });
    },
  },
  {
    name: 'Invert',
    preview: '/placeholder.svg',
    apply: (imageElement) => {
      return applyCanvasFilter(imageElement, (ctx, canvas) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];         // red
          data[i + 1] = 255 - data[i + 1]; // green
          data[i + 2] = 255 - data[i + 2]; // blue
        }
        
        ctx.putImageData(imageData, 0, 0);
      });
    },
  },
  {
    name: 'Vintage',
    preview: '/placeholder.svg',
    apply: (imageElement) => {
      return applyCanvasFilter(imageElement, (ctx, canvas) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Sepia effect
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
          
          // Add slight contrast
          data[i] = data[i] * 1.15;
          data[i + 1] = data[i + 1] * 1.15;
          data[i + 2] = data[i + 2] * 1.15;
        }
        
        ctx.putImageData(imageData, 0, 0);
      });
    },
  }
];

// Apply brightness and contrast
export const applyBrightnessContrast = (
  imageElement: HTMLImageElement | null,
  brightness: number,
  contrast: number
): string => {
  return applyCanvasFilter(imageElement, (ctx, canvas) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Normalize values
    const brightnessNormalized = (brightness - 100) / 100;
    const contrastNormalized = (contrast - 100) / 100;
    const factor = (259 * (contrastNormalized + 1)) / (255 * (1 - contrastNormalized));
    
    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness
      data[i] += 255 * brightnessNormalized;
      data[i + 1] += 255 * brightnessNormalized;
      data[i + 2] += 255 * brightnessNormalized;
      
      // Apply contrast
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
    
    ctx.putImageData(imageData, 0, 0);
  });
};
