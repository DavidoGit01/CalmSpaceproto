import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MINDFULNESS_PROMPTS } from '@/lib/constants';

export default function MindfulnessTools() {
  const [currentPrompt, setCurrentPrompt] = useState<string | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * MINDFULNESS_PROMPTS.length);
    setCurrentPrompt(MINDFULNESS_PROMPTS[randomIndex]);
  };

  const startMindfulnessSession = (minutes: number) => {
    setTimeLeft(minutes * 60);
    setIsTimerActive(true);
    getRandomPrompt();

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopSession = () => {
    setIsTimerActive(false);
    setTimeLeft(0);
    setCurrentPrompt(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">🧠</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mindfulness
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isTimerActive && !currentPrompt && (
          <div className="space-y-4">
            <h4 className="font-medium text-slate-700 text-center">
              Choose your mindfulness session:
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => startMindfulnessSession(1)}
                variant="outline"
                className="h-16 flex flex-col space-y-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                <span className="text-lg">1 min</span>
                <span className="text-xs text-slate-500">Quick Reset</span>
              </Button>
              
              <Button
                onClick={() => startMindfulnessSession(3)}
                variant="outline"
                className="h-16 flex flex-col space-y-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                <span className="text-lg">3 min</span>
                <span className="text-xs text-slate-500">Short Break</span>
              </Button>
              
              <Button
                onClick={() => startMindfulnessSession(5)}
                variant="outline"
                className="h-16 flex flex-col space-y-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                <span className="text-lg">5 min</span>
                <span className="text-xs text-slate-500">Deep Focus</span>
              </Button>
              
              <Button
                onClick={() => startMindfulnessSession(10)}
                variant="outline"
                className="h-16 flex flex-col space-y-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                <span className="text-lg">10 min</span>
                <span className="text-xs text-slate-500">Full Session</span>
              </Button>
            </div>

            <div className="text-center">
              <Button
                onClick={getRandomPrompt}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                Get Mindfulness Prompt
              </Button>
            </div>
          </div>
        )}

        {(isTimerActive || currentPrompt) && (
          <div className="space-y-4">
            {isTimerActive && (
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-700 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${timeLeft > 0 ? ((300 - timeLeft) / 300) * 100 : 100}%` 
                    }}
                  />
                </div>
              </div>
            )}

            {currentPrompt && (
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg text-center">
                <div className="text-base text-slate-700 leading-relaxed">
                  {currentPrompt}
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-3">
              {!isTimerActive && (
                <Button
                  onClick={getRandomPrompt}
                  variant="outline"
                  size="sm"
                >
                  New Prompt
                </Button>
              )}
              
              <Button
                onClick={stopSession}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {isTimerActive ? 'Stop Session' : 'Clear'}
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-slate-500 text-center">
          Take a moment to center yourself and find inner peace
        </div>
      </CardContent>
    </Card>
  );
}