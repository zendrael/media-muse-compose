
import { fabric } from 'fabric';
import type { FilterOption } from './types';

// Helper to reset filters and apply new ones
const resetAndApplyFilters = (canvas: fabric.Canvas, imageElement: fabric.Image, filters: fabric.IBaseFilter[]) => {
  imageElement.filters = filters;
  imageElement.applyFilters();
  canvas.renderAll();
};

export const filters: FilterOption[] = [
  {
    name: 'None',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, []);
    },
  },
  {
    name: 'Grayscale',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new fabric.filters.Grayscale()]);
    },
  },
  {
    name: 'Sepia',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new fabric.filters.Sepia()]);
    },
  },
  {
    name: 'Invert',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new fabric.filters.Invert()]);
    },
  },
  {
    name: 'Vintage',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [
        new fabric.filters.Sepia(),
        new fabric.filters.Contrast({ contrast: 0.15 })
      ]);
    },
  }
];

// Apply brightness and contrast
export const applyBrightnessContrast = (
  canvas: fabric.Canvas, 
  imageElement: fabric.Image | null, 
  brightness: number,
  contrast: number
) => {
  if (!imageElement) return;
  
  // Store the current filters except brightness and contrast
  const otherFilters = imageElement.filters?.filter(
    filter => !(filter instanceof fabric.filters.Brightness || filter instanceof fabric.filters.Contrast)
  ) || [];
  
  // Create new filters array with new brightness and contrast
  const newFilters = [
    ...otherFilters,
    new fabric.filters.Brightness({ brightness: (brightness - 100) / 100 }),
    new fabric.filters.Contrast({ contrast: (contrast - 100) / 100 })
  ];
  
  // Apply filters
  imageElement.filters = newFilters;
  imageElement.applyFilters();
  canvas.renderAll();
};
