export interface StressorType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: number; // 1-5 scale
  stressLevel: number; // 0-100
  stressors: string[];
  notes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface WeeklyStats {
  week: string;
  averageMood: number;
  averageStress: number;
  totalSessions: number;
  mostCommonStressor: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  category: 'nature' | 'instrumental' | 'meditation';
  duration: string;
  url: string;
}