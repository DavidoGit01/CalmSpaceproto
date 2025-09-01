import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TriggerOption {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const TRIGGER_OPTIONS: TriggerOption[] = [
  { id: 'traffic', label: 'Traffic', icon: '🚗', color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'emails', label: 'Emails', icon: '📧', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'financial', label: 'Financial Worries', icon: '💰', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { id: 'work', label: 'Work Pressure', icon: '💼', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'relationships', label: 'Relationships', icon: '💕', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { id: 'health', label: 'Health Concerns', icon: '🏥', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'social', label: 'Social Situations', icon: '👥', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'other', label: 'Other', icon: '❓', color: 'bg-gray-50 text-gray-700 border-gray-200' },
];

interface EnhancedTriggerDetectionProps {
  selectedTriggers: string[];
  onTriggerToggle: (triggerId: string) => void;
  onContinue: () => void;
}

export default function EnhancedTriggerDetection({ selectedTriggers, onTriggerToggle, onContinue }: EnhancedTriggerDetectionProps) {
  const [customTrigger, setCustomTrigger] = useState('');

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-6">
        <CardTitle className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Root Cause Finder
            </h3>
          </div>
          <p className="text-slate-600 font-normal">What's stressing you right now?</p>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Trigger Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRIGGER_OPTIONS.map((trigger) => (
            <Button
              key={trigger.id}
              onClick={() => onTriggerToggle(trigger.id)}
              variant="ghost"
              className={`
                h-20 flex flex-col items-center justify-center space-y-1 rounded-2xl border-2 transition-all duration-300
                ${selectedTriggers.includes(trigger.id)
                  ? `${trigger.color} ring-2 ring-offset-2 ring-violet-400 scale-105 shadow-lg`
                  : `${trigger.color} hover:scale-105 hover:shadow-md`
                }
              `}
            >
              <span className="text-2xl">{trigger.icon}</span>
              <span className="text-xs font-medium text-center leading-tight">{trigger.label}</span>
            </Button>
          ))}
        </div>

        {/* Custom Trigger Input */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-slate-700">
            Or describe what's bothering you:
          </label>
          <Select value={customTrigger} onValueChange={setCustomTrigger}>
            <SelectTrigger className="rounded-xl border-slate-200 focus:border-violet-400 focus:ring-violet-400">
              <SelectValue placeholder="Select or type your specific trigger..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Upcoming Deadline</SelectItem>
              <SelectItem value="presentation">Public Speaking/Presentation</SelectItem>
              <SelectItem value="conflict">Personal Conflict</SelectItem>
              <SelectItem value="change">Major Life Change</SelectItem>
              <SelectItem value="uncertainty">Uncertainty about Future</SelectItem>
              <SelectItem value="overwhelm">Feeling Overwhelmed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Selected Triggers Display */}
        {selectedTriggers.length > 0 && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h4 className="text-sm font-medium text-slate-700">Your current stressors:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedTriggers.map((triggerId) => {
                const trigger = TRIGGER_OPTIONS.find(t => t.id === triggerId);
                return trigger ? (
                  <div
                    key={triggerId}
                    className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${trigger.color}`}
                  >
                    <span>{trigger.icon}</span>
                    <span>{trigger.label}</span>
                  </div>
                ) : null;
              })}
              {customTrigger && (
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium bg-violet-50 text-violet-700 border-violet-200">
                  <span>✨</span>
                  <span>{customTrigger}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {(selectedTriggers.length > 0 || customTrigger) && (
          <div className="text-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={onContinue}
              size="lg"
              className="
                px-8 py-3 rounded-2xl font-semibold
                bg-gradient-to-r from-violet-500 to-teal-500
                hover:from-violet-600 hover:to-teal-600
                shadow-lg hover:shadow-xl
                transform hover:scale-105 transition-all duration-300
                text-white border-0
              "
            >
              Get Personalized Relief
              <span className="ml-2">→</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}