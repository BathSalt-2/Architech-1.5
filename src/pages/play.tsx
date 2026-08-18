import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Star, Music, Play, Pause, SkipForward, Volume2, Award, Crown } from "lucide-react";

// Mock song data
const SONGS = [
  {
    id: "song1",
    title: "Rock Revolution",
    artist: "The Virtual Band",
    difficulty: 2,
    duration: "3:45",
    unlocked: true,
    highScore: 85,
    image: "/images/song1.jpg"
  },
  {
    id: "song2",
    title: "Electric Dreams",
    artist: "Synth Warriors",
    difficulty: 3,
    duration: "4:20",
    unlocked: true,
    highScore: 72,
    image: "/images/song2.jpg"
  },
  {
    id: "song3",
    title: "Midnight Jam",
    artist: "The Groove Masters",
    difficulty: 4,
    duration: "5:10",
    unlocked: false,
    highScore: 0,
    image: "/images/song3.jpg"
  },
  {
    id: "song4",
    title: "Stadium Anthem",
    artist: "Crowd Pleasers",
    difficulty: 3,
    duration: "3:30",
    unlocked: false,
    highScore: 0,
    image: "/images/song4.jpg"
  },
  {
    id: "song5",
    title: "Neon Lights",
    artist: "Retro Wave",
    difficulty: 5,
    duration: "4:55",
    unlocked: false,
    highScore: 0,
    image: "/images/song5.jpg"
  }
];

export default function PlayPage() {
  const { toast } = useToast();
  const [selectedSong, setSelectedSong] = useState<typeof SONGS[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameProgress, setGameProgress] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [notePositions, setNotePositions] = useState<number[]>([]);

  const handleSelectSong = (song: typeof SONGS[0]) => {
    if (!song.unlocked) {
      toast({
        title: "Song Locked",
        description: "Complete more songs to unlock this track!",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedSong(song);
    setIsPlaying(false);
    setGameProgress(0);
    setCurrentScore(0);
    setGameActive(false);
    setNotePositions([]);
  };

  const handleStartGame = () => {
    if (!selectedSong) return;
    
    toast({
      title: "Game Started",
      description: `Playing ${selectedSong.title}. Get ready!`,
    });
    
    setIsPlaying(true);
    setGameActive(true);
    setGameProgress(0);
    setCurrentScore(0);
    
    // Simulate game progress
    const interval = setInterval(() => {
      setGameProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleGameEnd();
          return 100;
        }
        return prev + 1;
      });
      
      // Randomly generate notes
      if (Math.random() > 0.8) {
        setNotePositions(prev => [...prev, Math.floor(Math.random() * 4)]);
      }
      
      // Update score randomly
      setCurrentScore(prev => Math.min(100, prev + Math.random() * 2));
    }, 100);
    
    return () => clearInterval(interval);
  };

  const handleGameEnd = () => {
    setIsPlaying(false);
    setGameActive(false);
    
    toast({
      title: "Song Complete!",
      description: `You scored ${Math.floor(currentScore)}%!`,
    });
  };

  const handleNoteHit = (index: number) => {
    if (!gameActive) return;
    
    // Remove the note and increase score
    setNotePositions(prev => prev.filter((_, i) => i !== index));
    setCurrentScore(prev => Math.min(100, prev + 5));
  };

  // Clean up notes that go off screen
  useEffect(() => {
    if (!gameActive) return;
    
    const timer = setTimeout(() => {
      setNotePositions(prev => {
        if (prev.length > 0) {
          return prev.slice(1);
        }
        return prev;
      });
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [notePositions, gameActive]);

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-950 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Play the Game</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Song List */}
            <div className="lg:col-span-1">
              <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                <CardHeader>
                  <CardTitle>Song Library</CardTitle>
                  <CardDescription>Select a song to play</CardDescription>
                </CardHeader>
                <CardContent className="max-h-[500px] overflow-y-auto">
                  <div className="space-y-2">
                    {SONGS.map((song) => (
                      <div 
                        key={song.id}
                        className={`p-3 rounded-md cursor-pointer transition-all ${
                          selectedSong?.id === song.id 
                            ? "bg-purple-700" 
                            : "bg-purple-900 bg-opacity-40 hover:bg-purple-800"
                        } ${!song.unlocked ? "opacity-60" : ""}`}
                        onClick={() => handleSelectSong(song)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-800 to-indigo-900 rounded flex items-center justify-center">
                            <Music className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium flex items-center gap-2">
                              {song.title}
                              {!song.unlocked && <Crown className="h-4 w-4 text-yellow-500" />}
                            </h3>
                            <p className="text-sm text-gray-300">{song.artist}</p>
                            <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                              <span>
                                Difficulty: {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`inline h-3 w-3 ${i < song.difficulty ? "text-yellow-500" : "text-gray-600"}`} 
                                  />
                                ))}
                              </span>
                              <span>{song.duration}</span>
                            </div>
                          </div>
                        </div>
                        {song.highScore > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">High Score: {song.highScore}%</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Game Area */}
            <div className="lg:col-span-2">
              <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                <CardHeader>
                  <CardTitle>
                    {selectedSong ? selectedSong.title : "Select a Song"}
                  </CardTitle>
                  <CardDescription>
                    {selectedSong ? `By ${selectedSong.artist}` : "Choose from the library"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSong ? (
                    <div>
                      {/* Game Display */}
                      <div className="aspect-video bg-black rounded-lg mb-4 relative overflow-hidden">
                        {gameActive ? (
                          <div className="w-full h-full relative">
                            {/* Game Background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black opacity-50"></div>
                            
                            {/* Note Highway */}
                            <div className="absolute inset-0 flex">
                              {[0, 1, 2, 3].map((lane) => (
                                <div key={lane} className="flex-1 border-r border-gray-800 relative">
                                  {notePositions.map((pos, index) => (
                                    pos === lane && (
                                      <div 
                                        key={index}
                                        className="absolute w-full h-12 bg-gradient-to-b from-pink-500 to-purple-700 rounded-md animate-note-fall"
                                        onClick={() => handleNoteHit(index)}
                                      />
                                    )
                                  ))}
                                </div>
                              ))}
                            </div>
                            
                            {/* Hit Zone */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 border-t-2 border-white border-opacity-50 flex">
                              {[0, 1, 2, 3].map((lane) => (
                                <button
                                  key={lane}
                                  className="flex-1 border-r border-gray-800 bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all"
                                  onClick={() => {
                                    const noteIndex = notePositions.findIndex(pos => pos === lane);
                                    if (noteIndex !== -1) handleNoteHit(noteIndex);
                                  }}
                                >
                                  <span className="sr-only">Lane {lane + 1}</span>
                                </button>
                              ))}
                            </div>
                            
                            {/* Score Display */}
                            <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full">
                              <span className="font-bold">{Math.floor(currentScore)}%</span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Button 
                              onClick={handleStartGame}
                              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                              size="lg"
                            >
                              <Play className="mr-2 h-5 w-5" />
                              Start Playing
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => setIsPlaying(!isPlaying)}
                            disabled={!gameActive}
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button variant="outline" size="icon" disabled={!gameActive}>
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-sm">
                          {gameActive ? `${Math.floor(gameProgress)}% Complete` : selectedSong.duration}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <Progress value={gameProgress} className="h-2" />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center">
                      <p className="text-xl">Select a song from the library to start playing</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div>
                    {selectedSong && (
                      <div className="text-sm text-gray-300">
                        Difficulty: {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`inline h-4 w-4 ${i < (selectedSong?.difficulty || 0) ? "text-yellow-500" : "text-gray-600"}`} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedSong && !gameActive && (
                    <Button 
                      onClick={handleStartGame}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Play Song
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}