
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from 'lucide-react';
import { filters } from '@/lib/image-editor/filters';

interface FilterOptionsProps {
  onSelectFilter: (filterName: string) => void;
  selectedFilter: string | null;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({ onSelectFilter, selectedFilter }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Image className="h-5 w-5" /> Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {filters.map((filter) => (
            <div
              key={filter.name}
              className={`rounded-lg border p-2 cursor-pointer transition-all hover:border-brand-purple ${
                selectedFilter === filter.name ? 'border-brand-purple bg-accent/20' : 'border-muted'
              }`}
              onClick={() => onSelectFilter(filter.name)}
            >
              <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-1">
                <span className="text-xs text-muted-foreground">{filter.name}</span>
              </div>
              <p className="text-xs font-medium text-center">{filter.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterOptions;
