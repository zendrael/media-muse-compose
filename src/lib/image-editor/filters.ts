
import { Canvas, Image, filters } from 'fabric';
import type { FilterOption } from './types';

// Helper to reset and apply new filters
const resetAndApplyFilters = (canvas: Canvas, imageElement: Image, filters: IBaseFilter[]) => {
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
      resetAndApplyFilters(canvas, imageElement, [new filters.Grayscale()]);
    },
  },
  {
    name: 'Sepia',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new filters.Sepia()]);
    },
  },
  {
    name: 'Invert',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new filters.Invert()]);
    },
  },
  {
    name: 'Vintage',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [
        new filters.Sepia(),
        new filters.Contrast({ contrast: 0.15 })
      ]);
    },
  }
];

// Apply brightness and contrast
export const applyBrightnessContrast = (
  canvas: Canvas, 
  imageElement: Image | null, 
  brightness: number,
  contrast: number
) => {
  if (!imageElement) return;
  
  // Store the current filters except brightness and contrast
  const otherFilters = imageElement.filters?.filter(
    filter => !(filter instanceof filters.Brightness || filter instanceof filters.Contrast)
  ) || [];
  
  // Create new filters array with new brightness and contrast
  const newFilters = [
    ...otherFilters,
    new filters.Brightness({ brightness: (brightness - 100) / 100 }),
    new filters.Contrast({ contrast: (contrast - 100) / 100 })
  ];
  
  // Apply filters
  imageElement.filters = newFilters;
  imageElement.applyFilters();
  canvas.renderAll();
};
