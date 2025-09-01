import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SAMPLE_AUDIO_TRACKS } from '@/lib/constants';
import { AudioTrack } from '@/types/wellness';

export default function MusicPlayer() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const categories = ['all', 'nature', 'instrumental', 'meditation'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTracks = selectedCategory === 'all' 
    ? SAMPLE_AUDIO_TRACKS 
    : SAMPLE_AUDIO_TRACKS.filter(track => track.category === selectedCategory);

  const togglePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-2xl">🎵</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Music Player
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Selection */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tracks</SelectItem>
            <SelectItem value="nature">Nature Sounds</SelectItem>
            <SelectItem value="instrumental">Calming Instrumentals</SelectItem>
            <SelectItem value="meditation">Guided Meditation</SelectItem>
          </SelectContent>
        </Select>

        {/* Track List */}
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {filteredTracks.map((track) => (
            <div
              key={track.id}
              onClick={() => selectTrack(track)}
              className={`p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-slate-100 ${
                currentTrack?.id === track.id ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">{track.title}</span>
                <span className="text-xs text-slate-500">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Current Track Display */}
        {currentTrack && (
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-3 rounded-lg">
            <div className="text-sm font-medium text-slate-700 mb-2">
              Now Playing: {currentTrack.title}
            </div>
            
            {/* Controls */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={togglePlayPause}
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </Button>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-xs">🔊</span>
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs w-8">{volume}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element */}
        {currentTrack && (
          <audio
            ref={audioRef}
            src={currentTrack.url}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(e) => setCurrentTime((e.target as HTMLAudioElement).currentTime)}
            onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration)}
          />
        )}

        <div className="text-xs text-slate-500 text-center">
          Note: Audio tracks are simulated for demo purposes
        </div>
      </CardContent>
    </Card>
  );
}