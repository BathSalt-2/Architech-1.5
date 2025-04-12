import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { Guitar, Headphones, Music, Star, Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/stage-background.jpg')] bg-cover bg-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          
          <div className="container mx-auto px-4 z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              RockStarAI
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Live your rockstar dreams! Choose your avatar, pick your instrument, and jam out to become a legend.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                <Link to="/play">Start Playing</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-950">
                <Link to="/avatar">Create Avatar</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-black bg-opacity-60">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Game Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<User className="h-10 w-10 text-pink-500" />}
                title="Customizable Avatar"
                description="Create and customize your own rockstar with unique outfits and accessories"
              />
              <FeatureCard 
                icon={<Guitar className="h-10 w-10 text-purple-500" />}
                title="Authentic Instruments"
                description="Play guitar, bass, drums, keyboard, and vocals with realistic gameplay"
              />
              <FeatureCard 
                icon={<Music className="h-10 w-10 text-indigo-500" />}
                title="Custom Music"
                description="Edit songs and create your own custom music to play and share"
              />
              <FeatureCard 
                icon={<Users className="h-10 w-10 text-blue-500" />}
                title="AI Band Members"
                description="Perform with AI-powered band members that react to your playing style"
              />
              <FeatureCard 
                icon={<Trophy className="h-10 w-10 text-yellow-500" />}
                title="Daily Challenges"
                description="Take on musical challenges and minigames to earn special rewards"
              />
              <FeatureCard 
                icon={<Star className="h-10 w-10 text-red-500" />}
                title="Become a Legend"
                description="Headline massive stadium concerts and build your fanbase to legendary status"
              />
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Getting Started</h2>
            <div className="max-w-3xl mx-auto bg-purple-900 bg-opacity-20 p-6 rounded-lg border border-purple-800">
              <p className="mb-4">
                RockStarAI requires iOS 11.0+ or Android 6.0+. The app can be downloaded for free from the App Store and Google Play Store.
              </p>
              <p className="mb-4">
                Upon opening the app for the first time, you will be able to create your rockstar, customize their look and choose their first instrument. The tutorial will guide you through the basics of how to play songs in the rhythm game portion of RockStarAI.
              </p>
              <p>
                From there, you can start unlocking new items and features by successfully completing songs, accumulating fans, and levelling up your skills. The journey from amateur to rock god awaits!
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Rock?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Start your journey to stardom today and show the world your musical talent!
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
              <Link to="/play">Play Now</Link>
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-black bg-opacity-80 border-t border-purple-900">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} RockStarAI. All rights reserved.
            </p>
            <p className="text-gray-500 mt-2">
              Licensed under the MIT License.
            </p>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
};

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-purple-900 bg-opacity-20 p-6 rounded-lg border border-purple-800 hover:border-purple-600 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function User(props: any) {
  return <Users {...props} />;
}

export default Index;