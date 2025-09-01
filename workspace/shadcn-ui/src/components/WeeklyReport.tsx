import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoodEntry } from '@/types/wellness';
import { STRESSOR_TYPES } from '@/lib/constants';

interface WeeklyReportProps {
  moodEntries: MoodEntry[];
}

export default function WeeklyReport({ moodEntries }: WeeklyReportProps) {
  const thisWeekEntries = moodEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });

  const averageMood = thisWeekEntries.length > 0 
    ? thisWeekEntries.reduce((sum, entry) => sum + entry.mood, 0) / thisWeekEntries.length 
    : 0;

  const averageStress = thisWeekEntries.length > 0
    ? thisWeekEntries.reduce((sum, entry) => sum + entry.stressLevel, 0) / thisWeekEntries.length
    : 0;

  const stressorCounts = thisWeekEntries.reduce((acc, entry) => {
    entry.stressors.forEach(stressor => {
      acc[stressor] = (acc[stressor] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topStressor = Object.entries(stressorCounts)
    .sort(([,a], [,b]) => b - a)[0];

  const getMoodDescription = (mood: number) => {
    if (mood >= 4.5) return { text: 'Excellent', color: 'text-green-600' };
    if (mood >= 3.5) return { text: 'Good', color: 'text-blue-600' };
    if (mood >= 2.5) return { text: 'Neutral', color: 'text-yellow-600' };
    if (mood >= 1.5) return { text: 'Low', color: 'text-orange-600' };
    return { text: 'Very Low', color: 'text-red-600' };
  };

  const getStressDescription = (stress: number) => {
    if (stress >= 80) return { text: 'Very High', color: 'text-red-600' };
    if (stress >= 60) return { text: 'High', color: 'text-orange-600' };
    if (stress >= 40) return { text: 'Moderate', color: 'text-yellow-600' };
    if (stress >= 20) return { text: 'Low', color: 'text-blue-600' };
    return { text: 'Very Low', color: 'text-green-600' };
  };

  const moodDesc = getMoodDescription(averageMood);
  const stressDesc = getStressDescription(averageStress);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-700">
          Weekly Wellness Report
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {thisWeekEntries.length === 0 ? (
          <div className="text-center text-slate-500 py-4">
            No data recorded this week. Start tracking your mood to see insights!
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-700">
                  {averageMood.toFixed(1)}
                </div>
                <div className={`text-sm font-medium ${moodDesc.color}`}>
                  {moodDesc.text}
                </div>
                <div className="text-xs text-slate-500">Average Mood</div>
              </div>
              
              <div className="text-center p-3 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-700">
                  {averageStress.toFixed(0)}%
                </div>
                <div className={`text-sm font-medium ${stressDesc.color}`}>
                  {stressDesc.text}
                </div>
                <div className="text-xs text-slate-500">Average Stress</div>
              </div>
            </div>

            {/* Top Stressor */}
            {topStressor && (
              <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Most Common Stressor
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">
                    {STRESSOR_TYPES.find(s => s.id === topStressor[0])?.icon || '⚠️'}
                  </span>
                  <span className="font-medium text-slate-700">
                    {STRESSOR_TYPES.find(s => s.id === topStressor[0])?.name || topStressor[0]}
                  </span>
                  <Badge variant="secondary">{topStressor[1]} times</Badge>
                </div>
              </div>
            )}

            {/* Insights */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700">Insights & Recommendations</h4>
              <div className="space-y-1 text-sm text-slate-600">
                {averageMood < 3 && (
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-500">💡</span>
                    <span>Consider increasing your mindfulness sessions to improve mood.</span>
                  </div>
                )}
                {averageStress > 60 && (
                  <div className="flex items-start space-x-2">
                    <span className="text-green-500">🌱</span>
                    <span>Try more breathing exercises to manage stress levels.</span>
                  </div>
                )}
                {thisWeekEntries.length >= 5 && (
                  <div className="flex items-start space-x-2">
                    <span className="text-yellow-500">⭐</span>
                    <span>Great job tracking your wellness consistently!</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}