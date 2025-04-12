import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { Guitar, Headphones, Music, Star, Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-white text-black">
      {/* Simple Header */}
      <header className="bg-purple-600 text-white p-4">
        <h1 className="text-2xl font-bold">RockStarAI</h1>
      </header>
      
      {/* Basic Content */}
      <main className="p-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Welcome to RockStarAI</h2>
          <p className="mb-4">
            Live your rockstar dreams! Choose your avatar, pick your instrument, and jam out to become a legend.
          </p>
          
          <div className="flex gap-4 mb-8">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <Link to="/play">Start Playing</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-600 text-purple-600">
              <Link to="/avatar">Create Avatar</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Customizable Avatar</h3>
              <p>Create and customize your own rockstar with unique outfits and accessories</p>
            </div>
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">Authentic Instruments</h3>
              <p>Play guitar, bass, drums, keyboard, and vocals with realistic gameplay</p>
            </div>
          </div>
          
          <p>
            RockStarAI requires iOS 11.0+ or Android 6.0+. The app can be downloaded for free from the App Store and Google Play Store.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;