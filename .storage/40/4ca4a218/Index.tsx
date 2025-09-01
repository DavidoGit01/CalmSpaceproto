import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import EnhancedLayout from '@/components/EnhancedLayout';
import EnhancedMoodSelector from '@/components/EnhancedMoodSelector';
import EnhancedTriggerDetection from '@/components/EnhancedTriggerDetection';
import EnhancedReliefDashboard from '@/components/EnhancedReliefDashboard';
import AIAssistantPanel from '@/components/AIAssistantPanel';
import InsightsPanel from '@/components/InsightsPanel';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { MoodEntry, Achievement } from '@/types/wellness';

export default function Index() {
  const [showLanding, setShowLanding] = useState(true);
  const [userName, setUserName] = useState('Friend');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<'mood' | 'triggers' | 'relief'>('mood');
  
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('calmspace-mood-entries', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('calmspace-achievements', [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first mood check-in',
      icon: '🌟',
      unlocked: false,
    },
    {
      id: '2',
      title: 'Stress Warrior',
      description: 'Use relief tools 5 times',
      icon: '🛡️',
      unlocked: false,
    },
    {
      id: '3',
      title: 'Mindful Explorer',
      description: 'Try all relief tool categories',
      icon: '🧭',
      unlocked: false,
    },
    {
      id: '4',
      title: 'Consistency Champion',
      description: 'Check in for 7 consecutive days',
      icon: '👑',
      unlocked: false,
    },
    {
      id: '5',
      title: 'Wellness Guru',
      description: 'Complete 30 wellness sessions',
      icon: '🧘‍♀️',
      unlocked: false,
    },
    {
      id: '6',
      title: 'Calm Achiever',
      description: 'Maintain positive mood for a week',
      icon: '☮️',
      unlocked: false,
    },
  ]);

  const handleGetStarted = (name: string) => {
    setUserName(name);
    setShowLanding(false);
    setActiveTab('home');
  };

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setCurrentStep('triggers');
  };

  const handleTriggerToggle = (triggerId: string) => {
    setSelectedTriggers(prev => 
      prev.includes(triggerId) 
        ? prev.filter(id => id !== triggerId)
        : [...prev, triggerId]
    );
  };

  const handleContinueToRelief = () => {
    setCurrentStep('relief');
    
    // Save mood entry
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: getMoodScore(selectedMood),
      stressLevel: getStressLevel(selectedMood),
      stressors: selectedTriggers,
    };

    setMoodEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== newEntry.date);
      return [...filtered, newEntry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });

    // Check achievements
    checkAchievements();
  };

  const getMoodScore = (mood: string) => {
    const moodScores: Record<string, number> = {
      'happy': 5,
      'calm': 4,
      'stressed': 2,
      'anxious': 2,
      'tired': 3
    };
    return moodScores[mood] || 3;
  };

  const getStressLevel = (mood: string) => {
    const stressLevels: Record<string, number> = {
      'happy': 10,
      'calm': 20,
      'stressed': 80,
      'anxious': 85,
      'tired': 50
    };
    return stressLevels[mood] || 50;
  };

  const checkAchievements = () => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;

      switch (achievement.id) {
        case '1': // First Steps
          shouldUnlock = true;
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

  const handleActionSelect = (actionId: string) => {
    // Handle relief action selection
    console.log('Selected action:', actionId);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentStep('mood');
      setSelectedMood('');
      setSelectedTriggers([]);
    }
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <EnhancedLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <div className="space-y-8">
        {activeTab === 'home' && (
          <>
            {currentStep === 'mood' && (
              <EnhancedMoodSelector
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
                userName={userName}
              />
            )}

            {currentStep === 'triggers' && selectedMood && (
              <EnhancedTriggerDetection
                selectedTriggers={selectedTriggers}
                onTriggerToggle={handleTriggerToggle}
                onContinue={handleContinueToRelief}
              />
            )}

            {currentStep === 'relief' && selectedMood && (
              <div className="space-y-8">
                <EnhancedReliefDashboard
                  selectedMood={selectedMood}
                  selectedTriggers={selectedTriggers}
                  onActionSelect={handleActionSelect}
                />
                
                <AIAssistantPanel
                  selectedMood={selectedMood}
                  selectedTriggers={selectedTriggers}
                />
              </div>
            )}
          </>
        )}

        {activeTab === 'relief' && (
          <EnhancedReliefDashboard
            selectedMood={selectedMood || 'calm'}
            selectedTriggers={selectedTriggers}
            onActionSelect={handleActionSelect}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsPanel 
            moodEntries={moodEntries}
            achievements={achievements}
          />
        )}

        {activeTab === 'profile' && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-violet-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-4xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
              Welcome, {userName}!
            </h2>
            <p className="text-slate-600">
              Profile customization coming soon! 
            </p>
          </div>
        )}
      </div>
    </EnhancedLayout>
  );
}