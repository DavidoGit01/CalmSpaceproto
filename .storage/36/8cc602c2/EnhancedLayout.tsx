import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface EnhancedLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function EnhancedLayout({ children, activeTab, onTabChange }: EnhancedLayoutProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'relief', label: 'Relief Tools', icon: '🛠️' },
    { id: 'insights', label: 'Insights', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CS</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
                CalmSpace
              </h1>
            </div>
            
            {/* Navigation Tabs */}
            <nav className="hidden md:flex space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  variant="ghost"
                  size="sm"
                  className={`
                    px-4 py-2 rounded-xl transition-all duration-300
                    ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-violet-500 to-teal-500 text-white shadow-lg'
                      : 'text-slate-600 hover:bg-white/50 hover:text-violet-600'
                    }
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </Button>
              ))}
            </nav>

            <div className="text-sm text-slate-600">
              Your Digital Wellness Sanctuary
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-white/20 z-50">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              variant="ghost"
              size="sm"
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-violet-500 to-teal-500 text-white'
                  : 'text-slate-600'
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}