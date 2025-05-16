
import { Canvas, Image } from 'fabric';
import { FilterOption } from './types';

// Import filters from fabric
import { 
  GrayscaleFilter, 
  SepiaFilter, 
  InvertFilter, 
  BrightnessFilter, 
  ContrastFilter 
} from 'fabric/dist/src/filters';

// Helper to reset and apply new filters
const resetAndApplyFilters = (canvas: Canvas, imageElement: Image, filterList: any[]) => {
  imageElement.filters = filterList;
  imageElement.applyFilters();
  canvas.renderAll();
};

export const filterOptions: FilterOption[] = [
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
      resetAndApplyFilters(canvas, imageElement, [new GrayscaleFilter()]);
    },
  },
  {
    name: 'Sepia',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new SepiaFilter()]);
    },
  },
  {
    name: 'Invert',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [new InvertFilter()]);
    },
  },
  {
    name: 'Vintage',
    preview: '/placeholder.svg',
    apply: (canvas, imageElement) => {
      resetAndApplyFilters(canvas, imageElement, [
        new SepiaFilter(),
        new ContrastFilter({ contrast: 0.15 })
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
    filter => !(filter instanceof BrightnessFilter || filter instanceof ContrastFilter)
  ) || [];
  
  // Create new filters array with new brightness and contrast
  const newFilters = [
    ...otherFilters,
    new BrightnessFilter({ brightness: (brightness - 100) / 100 }),
    new ContrastFilter({ contrast: (contrast - 100) / 100 })
  ];
  
  // Apply filters
  imageElement.filters = newFilters;
  imageElement.applyFilters();
  canvas.renderAll();
};
