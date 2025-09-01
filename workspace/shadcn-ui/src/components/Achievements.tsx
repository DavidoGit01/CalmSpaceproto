import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Achievement } from '@/types/wellness';

interface AchievementsProps {
  achievements: Achievement[];
}

export default function Achievements({ achievements }: AchievementsProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-700">Achievements</span>
          <Badge variant="secondary">
            {unlockedCount}/{totalCount}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`
                p-3 rounded-lg border transition-all duration-200
                ${achievement.unlocked 
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-sm' 
                  : 'bg-slate-50 border-slate-200 opacity-60'
                }
              `}
            >
              <div className="text-center">
                <div className={`text-2xl mb-1 ${achievement.unlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className={`text-sm font-medium ${achievement.unlocked ? 'text-slate-700' : 'text-slate-500'}`}>
                  {achievement.title}
                </div>
                <div className={`text-xs mt-1 ${achievement.unlocked ? 'text-slate-600' : 'text-slate-400'}`}>
                  {achievement.description}
                </div>
                {achievement.unlocked && achievement.unlockedDate && (
                  <div className="text-xs text-green-600 mt-1">
                    Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}