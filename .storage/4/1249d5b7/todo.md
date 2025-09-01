# CalmSpace Wellness App - MVP Implementation

## Core Files to Create/Modify

### 1. Main Layout & Navigation
- **src/pages/Index.tsx** - Main dashboard with all sections
- **src/components/Layout.tsx** - App header and navigation
- **index.html** - Update title and metadata

### 2. Trigger Detection Section
- **src/components/TriggerDetection.tsx** - Main trigger detection component
- **src/components/StressorTags.tsx** - Tag-based stressor selection
- **src/components/MoodTracker.tsx** - Emoji-based mood rating (1-5 scale)
- **src/components/StressSlider.tsx** - Visual intensity slider

### 3. Relief Dashboard
- **src/components/ReliefDashboard.tsx** - Main relief tools container
- **src/components/MusicPlayer.tsx** - Embedded audio player with controls
- **src/components/BreathingExercise.tsx** - Interactive breathing with circle animation
- **src/components/QuickStretch.tsx** - Step-by-step stretch guides
- **src/components/MindfulnessTools.tsx** - Meditation prompts and grounding exercises

### 4. Adaptive Learning Panel
- **src/components/InsightsPanel.tsx** - Stress patterns and analytics
- **src/components/ProgressChart.tsx** - Line charts for stress tracking
- **src/components/Achievements.tsx** - Badge system and rewards
- **src/components/WeeklyReport.tsx** - Weekly wellness insights

### 5. Shared Components & Utilities
- **src/lib/constants.ts** - App constants, colors, stressor types
- **src/hooks/useLocalStorage.ts** - Local storage for user data
- **src/types/wellness.ts** - TypeScript interfaces

## Features Implementation Priority
1. ✅ Basic layout and navigation
2. ✅ Trigger detection with stressor tags and mood tracker
3. ✅ Relief dashboard with music player and breathing exercise
4. ✅ Insights panel with basic progress tracking
5. ✅ Responsive design with calming color palette
6. ✅ Smooth animations and micro-interactions

## Design System
- **Colors**: Primary #667eea, Secondary #764ba2, Accent #f093fb, Background #fdfbfb
- **Rounded corners**: 12-16px
- **Gradients**: Soft blues to lavenders to teals
- **Typography**: Clean, readable fonts with proper hierarchy
- **Animations**: Gentle hover effects, smooth transitions, micro-interactions

## Data Storage
- Using localStorage for MVP (no backend required)
- Store: mood entries, stress levels, selected stressors, usage patterns, achievements

## Technical Notes
- Mobile-first responsive design
- Accessibility standards (ARIA labels, keyboard navigation)
- Smooth animations using CSS transitions and Framer Motion if needed
- Audio integration for music player and breathing exercises