import ProgressChart from './ProgressChart';
import Achievements from './Achievements';
import WeeklyReport from './WeeklyReport';
import { MoodEntry, Achievement } from '@/types/wellness';

interface InsightsPanelProps {
  moodEntries: MoodEntry[];
  achievements: Achievement[];
}

export default function InsightsPanel({ moodEntries, achievements }: InsightsPanelProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Adaptive Learning Panel
        </h2>
        <p className="text-slate-600">Track your progress and unlock achievements</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart moodEntries={moodEntries} />
        <Achievements achievements={achievements} />
      </div>
      
      <WeeklyReport moodEntries={moodEntries} />
    </div>
  );
}