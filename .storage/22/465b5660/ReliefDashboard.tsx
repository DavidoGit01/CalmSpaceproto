import MusicPlayer from './MusicPlayer';
import BreathingExercise from './BreathingExercise';
import QuickStretch from './QuickStretch';
import MindfulnessTools from './MindfulnessTools';

export default function ReliefDashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Personalized Relief Dashboard
        </h2>
        <p className="text-slate-600">Choose your path to calm and relaxation</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MusicPlayer />
        <BreathingExercise />
        <QuickStretch />
        <MindfulnessTools />
      </div>
    </div>
  );
}