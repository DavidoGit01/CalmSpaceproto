import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StressorTags from './StressorTags';
import MoodTracker from './MoodTracker';
import StressSlider from './StressSlider';

interface TriggerDetectionProps {
  selectedStressors: string[];
  mood: number;
  stressLevel: number;
  onStressorToggle: (stressorId: string) => void;
  onMoodChange: (mood: number) => void;
  onStressLevelChange: (level: number) => void;
}

export default function TriggerDetection({
  selectedStressors,
  mood,
  stressLevel,
  onStressorToggle,
  onMoodChange,
  onStressLevelChange,
}: TriggerDetectionProps) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">🎯</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Trigger Detection
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <StressorTags
          selectedStressors={selectedStressors}
          onStressorToggle={onStressorToggle}
        />
        <MoodTracker
          mood={mood}
          onMoodChange={onMoodChange}
        />
        <StressSlider
          stressLevel={stressLevel}
          onStressLevelChange={onStressLevelChange}
        />
      </CardContent>
    </Card>
  );
}