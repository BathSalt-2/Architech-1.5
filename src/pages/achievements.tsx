import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Crown, Flame, Guitar, Headphones, Lock, Music, Star, Trophy, Users } from "lucide-react";

// Mock achievement data
const ACHIEVEMENTS = [
  {
    id: "ach1",
    title: "First Performance",
    description: "Complete your first song",
    icon: Music,
    progress: 100,
    completed: true,
    reward: "New outfit unlocked"
  },
  {
    id: "ach2",
    title: "Guitar Hero",
    description: "Score 90% or higher on a guitar song",
    icon: Guitar,
    progress: 75,
    completed: false,
    reward: "Custom guitar skin"
  },
  {
    id: "ach3",
    title: "Crowd Pleaser",
    description: "Gain 1,000 fans",
    icon: Users,
    progress: 45,
    completed: false,
    reward: "VIP venue access"
  },
  {
    id: "ach4",
    title: "Perfect Streak",
    description: "Hit 100 notes in a row without missing",
    icon: Flame,
    progress: 60,
    completed: false,
    reward: "Special effects package"
  },
  {
    id: "ach5",
    title: "Headliner",
    description: "Complete all songs in the main setlist",
    icon: Headphones,
    progress: 20,
    completed: false,
    reward: "Exclusive bonus track"
  }
];

// Mock stats data
const PLAYER_STATS = {
  level: 8,
  xp: 3450,
  xpToNextLevel: 5000,
  totalSongsPlayed: 24,
  highestScore: 92,
  totalPerformanceTime: "6h 45m",
  fans: 2840,
  favoriteInstrument: "Electric Guitar",
  achievements: {
    completed: 7,
    total: 25
  }
};

export default function AchievementsPage() {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-950 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Achievements & Stats</h1>
          
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="w-full max-w-md mx-auto bg-purple-900 bg-opacity-20 mb-8">
              <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">Player Stats</TabsTrigger>
              <TabsTrigger value="rewards" className="flex-1">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ACHIEVEMENTS.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`bg-purple-900 bg-opacity-20 border-purple-800 ${
                      achievement.completed ? "border-yellow-500" : ""
                    }`}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className={`p-2 rounded-full ${
                        achievement.completed 
                          ? "bg-yellow-500 bg-opacity-20" 
                          : "bg-purple-700 bg-opacity-30"
                      }`}>
                        <achievement.icon className={`h-8 w-8 ${
                          achievement.completed ? "text-yellow-500" : "text-purple-300"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {achievement.title}
                          {achievement.completed && (
                            <Trophy className="h-4 w-4 text-yellow-500" />
                          )}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          {achievement.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                        <div className="text-sm flex items-center gap-1 text-yellow-500">
                          <Award className="h-4 w-4" />
                          <span>Reward: {achievement.reward}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-300">
                  Complete achievements to unlock special rewards and boost your fan count!
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Player Level Card */}
                <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      Player Level
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center">
                        <span className="text-4xl font-bold">{PLAYER_STATS.level}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>XP Progress</span>
                        <span>{PLAYER_STATS.xp} / {PLAYER_STATS.xpToNextLevel} XP</span>
                      </div>
                      <Progress 
                        value={(PLAYER_STATS.xp / PLAYER_STATS.xpToNextLevel) * 100} 
                        className="h-2" 
                      />
                      <p className="text-center text-sm text-gray-300 mt-2">
                        {PLAYER_STATS.xpToNextLevel - PLAYER_STATS.xp} XP needed for next level
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Performance Stats Card */}
                <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5 text-purple-300" />
                      Performance Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <StatItem 
                        icon={<Headphones className="h-5 w-5 text-blue-400" />}
                        label="Total Songs Played"
                        value={PLAYER_STATS.totalSongsPlayed.toString()}
                      />
                      <StatItem 
                        icon={<Star className="h-5 w-5 text-yellow-500" />}
                        label="Highest Score"
                        value={`${PLAYER_STATS.highestScore}%`}
                      />
                      <StatItem 
                        icon={<Flame className="h-5 w-5 text-orange-500" />}
                        label="Total Performance Time"
                        value={PLAYER_STATS.totalPerformanceTime}
                      />
                      <StatItem 
                        icon={<Users className="h-5 w-5 text-green-400" />}
                        label="Total Fans"
                        value={PLAYER_STATS.fans.toLocaleString()}
                      />
                      <StatItem 
                        icon={<Guitar className="h-5 w-5 text-pink-400" />}
                        label="Favorite Instrument"
                        value={PLAYER_STATS.favoriteInstrument}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                {/* Achievements Progress Card */}
                <Card className="bg-purple-900 bg-opacity-20 border-purple-800 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      Achievement Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span>{PLAYER_STATS.achievements.completed} / {PLAYER_STATS.achievements.total}</span>
                      </div>
                      <Progress 
                        value={(PLAYER_STATS.achievements.completed / PLAYER_STATS.achievements.total) * 100} 
                        className="h-2" 
                      />
                      <p className="text-center text-sm text-gray-300 mt-2">
                        {PLAYER_STATS.achievements.total - PLAYER_STATS.achievements.completed} achievements remaining
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="rewards">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Unlocked Rewards */}
                <RewardCard 
                  title="Punk Outfit"
                  type="Clothing"
                  rarity="Common"
                  unlocked={true}
                />
                <RewardCard 
                  title="Flame Guitar"
                  type="Instrument Skin"
                  rarity="Rare"
                  unlocked={true}
                />
                <RewardCard 
                  title="Garage Venue"
                  type="Performance Location"
                  rarity="Common"
                  unlocked={true}
                />
                <RewardCard 
                  title="Pyro Effects"
                  type="Stage Effect"
                  rarity="Uncommon"
                  unlocked={true}
                />
                
                {/* Locked Rewards */}
                <RewardCard 
                  title="Rockstar Outfit"
                  type="Clothing"
                  rarity="Epic"
                  unlocked={false}
                />
                <RewardCard 
                  title="Golden Microphone"
                  type="Instrument Skin"
                  rarity="Legendary"
                  unlocked={false}
                />
                <RewardCard 
                  title="Stadium Arena"
                  type="Performance Location"
                  rarity="Epic"
                  unlocked={false}
                />
                <RewardCard 
                  title="Laser Light Show"
                  type="Stage Effect"
                  rarity="Rare"
                  unlocked={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function RewardCard({ title, type, rarity, unlocked }: { 
  title: string, 
  type: string, 
  rarity: "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary",
  unlocked: boolean
}) {
  const rarityColors = {
    Common: "text-gray-300",
    Uncommon: "text-green-400",
    Rare: "text-blue-400",
    Epic: "text-purple-400",
    Legendary: "text-yellow-500"
  };
  
  return (
    <Card className={`bg-purple-900 bg-opacity-20 ${unlocked ? "border-purple-600" : "border-gray-700"}`}>
      <CardContent className="p-4 relative">
        <div className="aspect-square bg-gradient-to-br from-purple-800 to-indigo-900 rounded-md mb-2 flex items-center justify-center">
          {!unlocked && (
            <div className="absolute inset-0 bg-black bg-opacity-70 rounded-md flex items-center justify-center">
              <Lock className="h-8 w-8 text-gray-400" />
            </div>
          )}
          <span className="text-center">{title}</span>
        </div>
        <h3 className="font-medium text-center">{title}</h3>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-gray-300">{type}</span>
          <span className={rarityColors[rarity]}>{rarity}</span>
        </div>
      </CardContent>
    </Card>
  );
}