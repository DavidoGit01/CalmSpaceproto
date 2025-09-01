import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'text-green-600', bgColor: 'bg-green-50 hover:bg-green-100 border-green-200' },
  { id: 'calm', emoji: '😌', label: 'Calm', color: 'text-blue-600', bgColor: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
  { id: 'stressed', emoji: '😫', label: 'Stressed', color: 'text-orange-600', bgColor: 'bg-orange-50 hover:bg-orange-100 border-orange-200' },
  { id: 'anxious', emoji: '😟', label: 'Anxious', color: 'text-red-600', bgColor: 'bg-red-50 hover:bg-red-100 border-red-200' },
  { id: 'tired', emoji: '😴', label: 'Tired', color: 'text-purple-600', bgColor: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
];

interface EnhancedMoodSelectorProps {
  selectedMood: string;
  onMoodSelect: (moodId: string) => void;
  userName?: string;
}

export default function EnhancedMoodSelector({ selectedMood, onMoodSelect, userName = 'Friend' }: EnhancedMoodSelectorProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
            Hello {userName}, how are you feeling today?
          </h2>
          <p className="text-slate-600">Let's check in with your current mood</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {MOOD_OPTIONS.map((mood) => (
            <Button
              key={mood.id}
              onClick={() => onMoodSelect(mood.id)}
              variant="ghost"
              className={`
                h-24 flex flex-col items-center justify-center space-y-2 rounded-2xl border-2 transition-all duration-300
                ${selectedMood === mood.id 
                  ? `${mood.bgColor} ring-2 ring-offset-2 ring-violet-400 scale-105 shadow-lg` 
                  : `${mood.bgColor} hover:scale-105 hover:shadow-md`
                }
              `}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className={`text-sm font-medium ${mood.color}`}>{mood.label}</span>
            </Button>
          ))}
        </div>

        {selectedMood && (
          <div className="mt-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-violet-50 to-teal-50 rounded-full border border-violet-200">
              <span className="text-sm text-slate-600">
                You're feeling <span className="font-semibold text-violet-600">
                  {MOOD_OPTIONS.find(m => m.id === selectedMood)?.label.toLowerCase()}
                </span> today
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}