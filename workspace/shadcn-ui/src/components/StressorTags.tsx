import { STRESSOR_TYPES } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface StressorTagsProps {
  selectedStressors: string[];
  onStressorToggle: (stressorId: string) => void;
}

export default function StressorTags({ selectedStressors, onStressorToggle }: StressorTagsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-slate-700">What's causing stress today?</h3>
      <div className="flex flex-wrap gap-2">
        {STRESSOR_TYPES.map((stressor) => (
          <Button
            key={stressor.id}
            variant={selectedStressors.includes(stressor.id) ? "default" : "outline"}
            size="sm"
            onClick={() => onStressorToggle(stressor.id)}
            className={`
              transition-all duration-200 hover:scale-105 
              ${selectedStressors.includes(stressor.id) 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                : 'hover:bg-slate-50 border-slate-200'
              }
            `}
          >
            <span className="mr-2">{stressor.icon}</span>
            {stressor.name}
          </Button>
        ))}
      </div>
    </div>
  );
}