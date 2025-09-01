import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoodEntry } from '@/types/wellness';

interface ProgressChartProps {
  moodEntries: MoodEntry[];
}

export default function ProgressChart({ moodEntries }: ProgressChartProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  const getDataForDate = (date: string) => {
    const entry = moodEntries.find(entry => entry.date === date);
    return entry || { mood: 0, stressLevel: 0 };
  };

  const maxStress = Math.max(...moodEntries.map(entry => entry.stressLevel), 100);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-700">
          Weekly Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Mood Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">Mood Trend</h4>
            <div className="flex items-end space-x-1 h-20">
              {last7Days.map((date, index) => {
                const data = getDataForDate(date);
                const height = (data.mood / 5) * 100;
                return (
                  <div key={date} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-400 to-purple-500 rounded-t transition-all duration-300 hover:opacity-80"
                      style={{ height: `${height}%`, minHeight: data.mood > 0 ? '4px' : '0px' }}
                    />
                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stress Chart */}
          <div>
            <h4 className="text-sm font-medium text-slate-600 mb-2">Stress Level</h4>
            <div className="flex items-end space-x-1 h-20">
              {last7Days.map((date) => {
                const data = getDataForDate(date);
                const height = (data.stressLevel / 100) * 100;
                const color = data.stressLevel > 60 ? 'from-red-400 to-red-600' : 
                             data.stressLevel > 30 ? 'from-yellow-400 to-orange-500' : 
                             'from-green-400 to-green-600';
                return (
                  <div key={date} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full bg-gradient-to-t ${color} rounded-t transition-all duration-300 hover:opacity-80`}
                      style={{ height: `${height}%`, minHeight: data.stressLevel > 0 ? '4px' : '0px' }}
                    />
                    <div className="text-xs text-slate-500 mt-1">
                      {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}