import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { STRETCH_EXERCISES } from '@/lib/constants';

export default function QuickStretch() {
  const [selectedExercise, setSelectedExercise] = useState(STRETCH_EXERCISES[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const startExercise = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      setCurrentStep(0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">💪</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quick Stretch
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Exercise Selection */}
        {!isActive && (
          <div className="space-y-3">
            <h4 className="font-medium text-slate-700">Choose an exercise:</h4>
            <div className="grid gap-2">
              {STRETCH_EXERCISES.map((exercise) => (
                <div
                  key={exercise.id}
                  onClick={() => setSelectedExercise(exercise)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-50
                    ${selectedExercise.id === exercise.id 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' 
                      : 'border border-slate-200'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{exercise.name}</span>
                    <Badge variant="secondary">{exercise.duration}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Active Exercise */}
        {isActive && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-slate-700 mb-1">
                {selectedExercise.name}
              </h3>
              <Badge variant="outline">{selectedExercise.duration}</Badge>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-1">
              {selectedExercise.steps.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${index <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-slate-200'
                    }
                  `}
                />
              ))}
            </div>

            {/* Current Step */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg text-center">
              <div className="text-sm text-slate-600 mb-2">
                Step {currentStep + 1} of {selectedExercise.steps.length}
              </div>
              <div className="text-base font-medium text-slate-700">
                {selectedExercise.steps[currentStep]}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-2">
              <Button
                onClick={prevStep}
                disabled={currentStep === 0}
                variant="outline"
                size="sm"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="sm"
              >
                {currentStep < selectedExercise.steps.length - 1 ? 'Next' : 'Complete'}
              </Button>
              <Button
                onClick={resetExercise}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Stop
              </Button>
            </div>
          </div>
        )}

        {/* Start Button */}
        {!isActive && (
          <div className="text-center">
            <Button 
              onClick={startExercise}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              Start {selectedExercise.name}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}