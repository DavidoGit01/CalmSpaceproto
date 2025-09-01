import { StressorType, AudioTrack } from '@/types/wellness';

export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2', 
  accent: '#f093fb',
  background: '#fdfbfb',
  text: '#2d3748',
  teal: '#4facfe',
};

export const STRESSOR_TYPES: StressorType[] = [
  { id: 'traffic', name: 'Traffic', icon: '🚗', color: 'bg-red-100 text-red-700' },
  { id: 'emails', name: 'Emails', icon: '📧', color: 'bg-blue-100 text-blue-700' },
  { id: 'finances', name: 'Finances', icon: '💰', color: 'bg-green-100 text-green-700' },
  { id: 'relationships', name: 'Relationships', icon: '💕', color: 'bg-pink-100 text-pink-700' },
  { id: 'work', name: 'Work', icon: '💼', color: 'bg-purple-100 text-purple-700' },
  { id: 'health', name: 'Health', icon: '🏥', color: 'bg-orange-100 text-orange-700' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'social', name: 'Social', icon: '👥', color: 'bg-indigo-100 text-indigo-700' },
];

export const MOOD_EMOJIS = ['😢', '😕', '😐', '🙂', '😊'];

export const SAMPLE_AUDIO_TRACKS: AudioTrack[] = [
  {
    id: '1',
    title: 'Ocean Waves',
    category: 'nature',
    duration: '10:00',
    url: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.wav'
  },
  {
    id: '2',
    title: 'Forest Rain',
    category: 'nature',
    duration: '15:00',
    url: 'https://www.soundjay.com/misc/sounds/rain-1.wav'
  },
  {
    id: '3',
    title: 'Peaceful Piano',
    category: 'instrumental',
    duration: '8:30',
    url: 'https://www.soundjay.com/misc/sounds/piano-1.wav'
  },
  {
    id: '4',
    title: 'Guided Breathing',
    category: 'meditation',
    duration: '5:00',
    url: 'https://www.soundjay.com/misc/sounds/meditation-1.wav'
  },
];

export const BREATHING_PATTERNS = [
  { name: '4-7-8 Technique', inhale: 4, hold: 7, exhale: 8 },
  { name: 'Box Breathing', inhale: 4, hold: 4, exhale: 4 },
  { name: 'Simple Breathing', inhale: 4, hold: 0, exhale: 6 },
];

export const STRETCH_EXERCISES = [
  {
    id: '1',
    name: 'Neck Roll',
    duration: '30 seconds',
    steps: [
      'Sit or stand with your spine straight',
      'Slowly roll your head in a circle',
      'Change direction after 15 seconds',
      'Keep movements gentle and controlled'
    ]
  },
  {
    id: '2',
    name: 'Shoulder Shrugs',
    duration: '1 minute',
    steps: [
      'Lift your shoulders up to your ears',
      'Hold for 5 seconds',
      'Release and let them drop',
      'Repeat 10 times'
    ]
  },
  {
    id: '3',
    name: 'Wrist Circles',
    duration: '30 seconds',
    steps: [
      'Extend your arms in front of you',
      'Make small circles with your wrists',
      'Change direction after 15 seconds',
      'Keep movements smooth'
    ]
  }
];

export const MINDFULNESS_PROMPTS = [
  'Take three deep breaths and notice how your body feels right now.',
  'Name 5 things you can see, 4 things you can hear, 3 things you can touch.',
  'Think of one thing you\'re grateful for today.',
  'Notice your thoughts without judging them, then let them pass.',
  'Focus on your breathing for the next minute.',
];