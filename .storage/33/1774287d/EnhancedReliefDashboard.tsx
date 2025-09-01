import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReliefAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  gradient: string;
  hoverGradient: string;
}

const RELIEF_ACTIONS: ReliefAction[] = [
  {
    id: 'breathing',
    title: 'Guided Breathing',
    subtitle: 'Instant calm in minutes',
    icon: '🌬️',
    duration: '1-2 min',
    gradient: 'from-blue-400 to-cyan-500',
    hoverGradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'stretch',
    title: 'Quick Stretch',
    subtitle: 'Release physical tension',
    icon: '🧘',
    duration: '2 min',
    gradient: 'from-green-400 to-emerald-500',
    hoverGradient: 'from-green-500 to-emerald-600'
  },
  {
    id: 'productivity',
    title: 'Productivity Hack',
    subtitle: 'Bite-sized wellness tip',
    icon: '💡',
    duration: '30 sec',
    gradient: 'from-yellow-400 to-orange-500',
    hoverGradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'music',
    title: 'Music Therapy',
    subtitle: 'Curated calming sounds',
    icon: '🎵',
    duration: '5-10 min',
    gradient: 'from-purple-400 to-pink-500',
    hoverGradient: 'from-purple-500 to-pink-600'
  }
];

interface EnhancedReliefDashboardProps {
  selectedMood: string;
  selectedTriggers: string[];
  onActionSelect: (actionId: string) => void;
}

export default function EnhancedReliefDashboard({ selectedMood, selectedTriggers, onActionSelect }: EnhancedReliefDashboardProps) {
  const getPersonalizedMessage = () => {
    if (selectedMood === 'stressed' || selectedMood === 'anxious') {
      return "Let's help you find your calm. Choose what feels right for you:";
    }
    if (selectedMood === 'tired') {
      return "Time to recharge your energy. Pick your preferred method:";
    }
    return "Here are some personalized tools to enhance your wellbeing:";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
          Personalized Relief Tools
        </h2>
        <p className="text-slate-600">{getPersonalizedMessage()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {RELIEF_ACTIONS.map((action) => (
          <Card
            key={action.id}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl overflow-hidden cursor-pointer group"
            onClick={() => onActionSelect(action.id)}
          >
            <CardContent className="p-0">
              <div className={`bg-gradient-to-r ${action.gradient} group-hover:${action.hoverGradient} p-6 transition-all duration-300`}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-3xl">{action.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{action.title}</h3>
                      <p className="text-white/80">{action.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                      <span className="text-sm font-medium">{action.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <Button
                  className="w-full bg-gradient-to-r from-slate-100 to-white hover:from-slate-200 hover:to-slate-100 text-slate-700 border-0 rounded-2xl font-semibold py-3 transition-all duration-300"
                >
                  Start Session
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Access Music Section */}
      <Card className="bg-gradient-to-r from-violet-50 via-teal-50 to-blue-50 border-0 shadow-xl rounded-3xl overflow-hidden">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
              🎵 Mood-Based Music Selection
            </h3>
            <p className="text-slate-600">Curated playlists based on how you're feeling</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="ghost"
              className="h-20 flex flex-col items-center justify-center space-y-2 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl">🌊</span>
              <span className="text-sm font-medium text-slate-700">Ocean Waves</span>
            </Button>
            
            <Button
              variant="ghost"
              className="h-20 flex flex-col items-center justify-center space-y-2 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl">🌲</span>
              <span className="text-sm font-medium text-slate-700">Forest Sounds</span>
            </Button>
            
            <Button
              variant="ghost"
              className="h-20 flex flex-col items-center justify-center space-y-2 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl">🎹</span>
              <span className="text-sm font-medium text-slate-700">Soft Piano</span>
            </Button>
            
            <Button
              variant="ghost"
              className="h-20 flex flex-col items-center justify-center space-y-2 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/20 transition-all duration-300 hover:scale-105"
            >
              <span className="text-2xl">☔</span>
              <span className="text-sm font-medium text-slate-700">Rain Sounds</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}