import { Slider } from '@/components/ui/slider';

interface StressSliderProps {
  stressLevel: number;
  onStressLevelChange: (level: number) => void;
}

export default function StressSlider({ stressLevel, onStressLevelChange }: StressSliderProps) {
  const getStressColor = (level: number) => {
    if (level <= 20) return 'from-green-400 to-green-600';
    if (level <= 40) return 'from-yellow-400 to-yellow-600';
    if (level <= 60) return 'from-orange-400 to-orange-600';
    if (level <= 80) return 'from-red-400 to-red-600';
    return 'from-red-600 to-red-800';
  };

  const getStressLabel = (level: number) => {
    if (level <= 20) return 'Very Low';
    if (level <= 40) return 'Low';
    if (level <= 60) return 'Moderate';
    if (level <= 80) return 'High';
    return 'Very High';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-700">Stress Intensity Level</h3>
      <div className="px-3">
        <Slider
          value={[stressLevel]}
          onValueChange={(value) => onStressLevelChange(value[0])}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getStressColor(stressLevel)} text-white`}>
          {stressLevel}% - {getStressLabel(stressLevel)}
        </div>
      </div>
    </div>
  );
}