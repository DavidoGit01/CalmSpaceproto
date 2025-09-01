import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIAssistantPanelProps {
  selectedMood: string;
  selectedTriggers: string[];
}

export default function AIAssistantPanel({ selectedMood, selectedTriggers }: AIAssistantPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `I can see you're feeling ${selectedMood} today. I'm here to help you find the right path to wellness. What would you like to explore?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const suggestions = [
    { id: 'breathing', text: 'Breathing Exercise', icon: '🌬️' },
    { id: 'meditation', text: 'Guided Meditation', icon: '🧘' },
    { id: 'journaling', text: 'Journaling', icon: '📝' },
    { id: 'music', text: 'Music Therapy', icon: '🎵' }
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue, selectedMood),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string, mood: string) => {
    const responses = {
      breathing: "Perfect choice! Let's start with a simple 4-7-8 breathing technique. Breathe in for 4 counts, hold for 7, and exhale for 8. This helps activate your parasympathetic nervous system.",
      meditation: "Meditation is wonderful for your current state. I recommend starting with a 5-minute guided session focusing on body awareness. Would you like me to guide you through it?",
      journaling: "Journaling can help process your feelings. Try writing about what's on your mind for just 5 minutes without editing yourself. Sometimes getting thoughts out of your head and onto paper provides clarity.",
      music: "Music therapy is excellent for mood regulation. Based on how you're feeling, I suggest starting with some nature sounds or soft instrumental music. Shall I recommend some specific tracks?"
    };

    if (userInput.toLowerCase().includes('breathing')) return responses.breathing;
    if (userInput.toLowerCase().includes('meditat')) return responses.meditation;
    if (userInput.toLowerCase().includes('journal')) return responses.journaling;
    if (userInput.toLowerCase().includes('music')) return responses.music;

    return `I understand you're looking for support. Based on your ${mood} mood, I'd recommend starting with some deep breathing or a quick mindfulness exercise. What feels most appealing to you right now?`;
  };

  const handleSuggestionClick = (suggestion: { text: string; icon: string }) => {
    setInputValue(suggestion.text);
    handleSendMessage();
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-xl">🤖</span>
          </div>
          <span className="bg-gradient-to-r from-violet-600 to-teal-600 bg-clip-text text-transparent">
            AI Wellness Assistant
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto space-y-3 p-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-xs px-4 py-3 rounded-2xl text-sm
                  ${message.type === 'user'
                    ? 'bg-gradient-to-r from-violet-500 to-teal-500 text-white'
                    : 'bg-gradient-to-r from-slate-100 to-white text-slate-700 border border-slate-200'
                  }
                `}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-3">
          <p className="text-sm text-slate-600 font-medium">Quick suggestions:</p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                variant="ghost"
                size="sm"
                className="h-12 flex items-center justify-start space-x-2 rounded-xl bg-gradient-to-r from-slate-50 to-white hover:from-slate-100 hover:to-slate-50 border border-slate-200 transition-all duration-300 hover:scale-105"
              >
                <span className="text-lg">{suggestion.icon}</span>
                <span className="text-sm font-medium text-slate-700">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about wellness..."
            className="rounded-xl border-slate-200 focus:border-violet-400 focus:ring-violet-400"
          />
          <Button
            onClick={handleSendMessage}
            size="sm"
            className="px-4 rounded-xl bg-gradient-to-r from-violet-500 to-teal-500 hover:from-violet-600 hover:to-teal-600 text-white border-0"
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}