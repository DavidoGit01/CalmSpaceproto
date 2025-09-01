import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TriggerDetection from '@/components/TriggerDetection';
import ReliefDashboard from '@/components/ReliefDashboard';
import InsightsPanel from '@/components/InsightsPanel';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MoodEntry, Achievement } from '@/types/wellness';

export default function Index() {
  const [selectedStressors, setSelectedStressors] = useState<string[]>([]);
  const [mood, setMood] = useState(0);
  const [stressLevel, setStressLevel] = useState(50);
  const [activeSection, setActiveSection] = useState<'detection' | 'relief' | 'insights'>('detection');
  
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('calmspace-mood-entries', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('calmspace-achievements', [
    {
      id: '1',
      title: 'First Entry',
      description: 'Log your first mood entry',
      icon: '🌟',
      unlocked: false,
    },
    {
      id: '2',
      title: 'Stress Warrior',
      description: 'Complete 5 breathing exercises',
      icon: '🛡️',
      unlocked: false,
    },
    {
      id: '3',
      title: 'Mindful Master',
      description: 'Complete 10 mindfulness sessions',
      icon: '🧘',
      unlocked: false,
    },
    {
      id: '4',
      title: 'Consistency King',
      description: 'Log mood for 7 consecutive days',
      icon: '👑',
      unlocked: false,
    },
    {
      id: '5',
      title: 'Zen Zone',
      description: 'Maintain low stress for a week',
      icon: '☮️',
      unlocked: false,
    },
    {
      id: '6',
      title: 'Happy Camper',
      description: 'Maintain good mood for 5 days',
      icon: '😊',
      unlocked: false,
    },
  ]);

  const handleStressorToggle = (stressorId: string) => {
    setSelectedStressors(prev => 
      prev.includes(stressorId) 
        ? prev.filter(id => id !== stressorId)
        : [...prev, stressorId]
    );
  };

  const saveMoodEntry = () => {
    if (mood === 0) {
      alert('Please select your mood first!');
      return;
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood,
      stressLevel,
      stressors: selectedStressors,
    };

    setMoodEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== newEntry.date);
      return [...filtered, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Check for achievements
    checkAchievements([...moodEntries.filter(entry => entry.date !== newEntry.date), newEntry]);

    // Reset form
    setSelectedStressors([]);
    setMood(0);
    setStressLevel(50);
    
    // Move to relief dashboard
    setActiveSection('relief');
  };

  const checkAchievements = (entries: MoodEntry[]) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.id) {
        case '1': // First Entry
          shouldUnlock = entries.length >= 1;
          break;
        case '4': // Consistency King - 7 consecutive days
          shouldUnlock = checkConsecutiveDays(entries, 7);
          break;
        case '5': // Zen Zone - low stress for a week
          shouldUnlock = checkLowStressWeek(entries);
          break;
        case '6': // Happy Camper - good mood for 5 days
          shouldUnlock = checkGoodMoodStreak(entries, 5);
          break;
      }

      if (shouldUnlock) {
        return {
          ...achievement,
          unlocked: true,
          unlockedDate: new Date().toISOString(),
        };
      }

      return achievement;
    }));
  };

  const checkConsecutiveDays = (entries: MoodEntry[], days: number) => {
    if (entries.length < days) return false;
    
    const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    for (let i = 0; i <= sortedEntries.length - days; i++) {
      let consecutive = true;
      for (let j = 0; j < days - 1; j++) {
        const currentDate = new Date(sortedEntries[i + j].date);
        const nextDate = new Date(sortedEntries[i + j + 1].date);
        const diffTime = currentDate.getTime() - nextDate.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        
        if (diffDays !== 1) {
          consecutive = false;
          break;
        }
      }
      if (consecutive) return true;
    }
    return false;
  };

  const checkLowStressWeek = (entries: MoodEntry[]) => {
    const lastWeek = entries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    if (lastWeek.length < 5) return false;
    
    const averageStress = lastWeek.reduce((sum, entry) => sum + entry.stressLevel, 0) / lastWeek.length;
    return averageStress <= 30;
  };

  const checkGoodMoodStreak = (entries: MoodEntry[], days: number) => {
    const recentEntries = entries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, days);
    
    if (recentEntries.length < days) return false;
    
    return recentEntries.every(entry => entry.mood >= 4);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex justify-center space-x-2">
          <Button
            onClick={() => setActiveSection('detection')}
            variant={activeSection === 'detection' ? 'default' : 'outline'}
            className={activeSection === 'detection' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
          >
            🎯 Detection
          </Button>
          <Button
            onClick={() => setActiveSection('relief')}
            variant={activeSection === 'relief' ? 'default' : 'outline'}
            className={activeSection === 'relief' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
          >
            🛠️ Relief Tools
          </Button>
          <Button
            onClick={() => setActiveSection('insights')}
            variant={activeSection === 'insights' ? 'default' : 'outline'}
            className={activeSection === 'insights' ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}
          >
            📊 Insights
          </Button>
        </div>

        {/* Content Sections */}
        {activeSection === 'detection' && (
          <div className="space-y-6">
            <TriggerDetection
              selectedStressors={selectedStressors}
              mood={mood}
              stressLevel={stressLevel}
              onStressorToggle={handleStressorToggle}
              onMoodChange={setMood}
              onStressLevelChange={setStressLevel}
            />
            
            <div className="text-center">
              <Button
                onClick={saveMoodEntry}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-8"
              >
                Save & Get Relief Tools
              </Button>
            </div>
          </div>
        )}

        {activeSection === 'relief' && <ReliefDashboard />}

        {activeSection === 'insights' && (
          <InsightsPanel 
            moodEntries={moodEntries}
            achievements={achievements}
          />
        )}
      </div>
    </Layout>
  );
}