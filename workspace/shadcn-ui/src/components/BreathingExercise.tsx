import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BREATHING_PATTERNS } from '@/lib/constants';

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(BREATHING_PATTERNS[0]);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      if (currentPhase === 'inhale') {
        if (selectedPattern.hold > 0) {
          setCurrentPhase('hold');
          setTimeLeft(selectedPattern.hold);
        } else {
          setCurrentPhase('exhale');
          setTimeLeft(selectedPattern.exhale);
        }
      } else if (currentPhase === 'hold') {
        setCurrentPhase('exhale');
        setTimeLeft(selectedPattern.exhale);
      } else {
        // Complete cycle
        setCycleCount(prev => prev + 1);
        setCurrentPhase('inhale');
        setTimeLeft(selectedPattern.inhale);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, selectedPattern]);

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeLeft(selectedPattern.inhale);
    setCycleCount(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setTimeLeft(0);
    setCycleCount(0);
  };

  const getPhaseInstruction = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      default:
        return 'Ready';
    }
  };

  const getCircleScale = () => {
    if (!isActive) return 'scale-100';
    
    switch (currentPhase) {
      case 'inhale':
        return 'scale-150';
      case 'hold':
        return 'scale-150';
      case 'exhale':
        return 'scale-75';
      default:
        return 'scale-100';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">🌬️</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Guided Breathing
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pattern Selection */}
        <Select 
          value={selectedPattern.name} 
          onValueChange={(value) => {
            const pattern = BREATHING_PATTERNS.find(p => p.name === value);
            if (pattern) setSelectedPattern(pattern);
          }}
          disabled={isActive}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {BREATHING_PATTERNS.map((pattern) => (
              <SelectItem key={pattern.name} value={pattern.name}>
                {pattern.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Breathing Circle Animation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div 
              className={`
                w-24 h-24 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 
                transition-transform duration-[3000ms] ease-in-out ${getCircleScale()}
                shadow-lg
              `}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-semibold text-white">
                  {timeLeft}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-medium text-slate-700 mb-1">
              {getPhaseInstruction()}
            </div>
            {isActive && (
              <div className="text-sm text-slate-500">
                Cycle {cycleCount + 1}
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-3">
          {!isActive ? (
            <Button 
              onClick={startExercise}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Start Breathing
            </Button>
          ) : (
            <Button 
              onClick={stopExercise}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Stop
            </Button>
          )}
        </div>

        {/* Pattern Info */}
        <div className="text-xs text-slate-500 text-center bg-slate-50 p-2 rounded-lg">
          {selectedPattern.name}: Inhale {selectedPattern.inhale}s
          {selectedPattern.hold > 0 && ` → Hold ${selectedPattern.hold}s`}
          → Exhale {selectedPattern.exhale}s
        </div>
      </CardContent>
    </Card>
  );
}