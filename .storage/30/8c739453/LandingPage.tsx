import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-teal-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-violet-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="px-6 py-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CS</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
                CalmSpace
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8 text-slate-600">
              <a href="#features" className="hover:text-violet-600 transition-colors">Features</a>
              <a href="#about" className="hover:text-violet-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-violet-600 transition-colors">Contact</a>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-violet-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Find Calm,
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Anytime, Anywhere.
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Your AI-powered wellness companion that transforms stress into serenity through personalized relief tools and adaptive learning.
              </p>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="
                  px-12 py-6 text-lg font-semibold rounded-2xl
                  bg-gradient-to-r from-violet-500 via-teal-500 to-blue-500
                  hover:from-violet-600 hover:via-teal-600 hover:to-blue-600
                  shadow-2xl hover:shadow-3xl
                  transform hover:scale-105 transition-all duration-300
                  text-white border-0
                "
              >
                <span className="mr-2">✨</span>
                Start Your Session
              </Button>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section id="features" className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
              Your Wellness Journey Starts Here
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-slate-700">Trigger Detection</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Identify what's causing your stress with our intelligent root cause finder and personalized insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-slate-700">Personalized Relief</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Access instant relief through guided breathing, stretches, mindfulness, and curated music therapy.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-slate-700">Adaptive Learning</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Track your progress and receive AI-powered insights that adapt to your unique wellness patterns.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-violet-500/10 via-teal-500/10 to-blue-500/10 rounded-3xl p-12 backdrop-blur-sm border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
                Ready to Transform Your Stress?
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands who've found their calm with CalmSpace. Start your personalized wellness journey today.
              </p>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="
                  px-10 py-4 text-lg font-semibold rounded-2xl
                  bg-gradient-to-r from-violet-500 to-teal-500
                  hover:from-violet-600 hover:to-teal-600
                  shadow-xl hover:shadow-2xl
                  transform hover:scale-105 transition-all duration-300
                  text-white border-0
                "
              >
                Begin Your Journey
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}