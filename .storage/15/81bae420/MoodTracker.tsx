import { MOOD_EMOJIS } from '@/lib/constants';
import { Button } from '@/components/ui/button';

interface MoodTrackerProps {
  mood: number;
  onMoodChange: (mood: number) => void;
}

export default function MoodTracker({ mood, onMoodChange }: MoodTrackerProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-slate-700">How are you feeling?</h3>
      <div className="flex justify-center space-x-2">
        {MOOD_EMOJIS.map((emoji, index) => (
          <Button
            key={index}
            variant="ghost"
            size="lg"
            onClick={() => onMoodChange(index + 1)}
            className={`
              text-3xl p-3 rounded-full transition-all duration-200 hover:scale-110
              ${mood === index + 1 
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 shadow-lg scale-110' 
                : 'hover:bg-slate-50'
              }
            `}
          >
            {emoji}
          </Button>
        ))}
      </div>
      <div className="text-center text-sm text-slate-500">
        {mood > 0 && (
          <span>
            {mood === 1 && "Very Low"}
            {mood === 2 && "Low"}
            {mood === 3 && "Neutral"}
            {mood === 4 && "Good"}
            {mood === 5 && "Excellent"}
          </span>
        )}
      </div>
    </div>
  );
}