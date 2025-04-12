import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Lock, Star } from "lucide-react";

const INSTRUMENTS = [
  {
    id: "guitar",
    name: "Electric Guitar",
    description: "The classic rock instrument. Shred solos and power chords.",
    difficulty: 3,
    unlocked: true,
    image: "/images/guitar.jpg"
  },
  {
    id: "bass",
    name: "Bass Guitar",
    description: "Hold down the groove with deep, rhythmic basslines.",
    difficulty: 2,
    unlocked: true,
    image: "/images/bass.jpg"
  },
  {
    id: "drums",
    name: "Drums",
    description: "Keep the beat and drive the band with powerful percussion.",
    difficulty: 4,
    unlocked: false,
    image: "/images/drums.jpg"
  },
  {
    id: "keyboard",
    name: "Keyboard",
    description: "Add melody and harmony with piano, synths, and organs.",
    difficulty: 3,
    unlocked: false,
    image: "/images/keyboard.jpg"
  },
  {
    id: "vocals",
    name: "Vocals",
    description: "Belt out lyrics and melodies as the frontperson.",
    difficulty: 2,
    unlocked: false,
    image: "/images/vocals.jpg"
  }
];

export default function InstrumentsPage() {
  const { toast } = useToast();
  const [selectedInstrument, setSelectedInstrument] = useState(0);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(INSTRUMENTS[0].id);

  const handleSelect = (instrument: typeof INSTRUMENTS[0]) => {
    if (!instrument.unlocked) {
      toast({
        title: "Instrument Locked",
        description: "Complete more songs to unlock this instrument!",
        variant: "destructive"
      });
      return;
    }

    setSelectedInstrumentId(instrument.id);
    toast({
      title: "Instrument Selected",
      description: `You've selected the ${instrument.name}!`,
    });
  };

  const handlePrevious = () => {
    setSelectedInstrument((prev) => (prev - 1 + INSTRUMENTS.length) % INSTRUMENTS.length);
  };

  const handleNext = () => {
    setSelectedInstrument((prev) => (prev + 1) % INSTRUMENTS.length);
  };

  const currentInstrument = INSTRUMENTS[selectedInstrument];

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-950 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Choose Your Instrument</h1>
          
          <div className="flex flex-col items-center">
            {/* Instrument Carousel */}
            <div className="relative w-full max-w-3xl mb-8">
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-0 z-10 bg-black bg-opacity-50 rounded-full"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                
                <div className="w-full overflow-hidden">
                  <div className="flex justify-center">
                    <Card className="w-full max-w-2xl bg-purple-900 bg-opacity-20 border-purple-800">
                      <CardHeader>
                        <CardTitle className="text-2xl flex items-center justify-between">
                          {currentInstrument.name}
                          {!currentInstrument.unlocked && (
                            <Lock className="h-5 w-5 text-yellow-500" />
                          )}
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Difficulty: {Array(5).fill(0).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`inline h-4 w-4 ${i < currentInstrument.difficulty ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}`} 
                            />
                          ))}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-black rounded-md mb-4 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center">
                            <span className="text-xl">{currentInstrument.name}</span>
                          </div>
                        </div>
                        <p>{currentInstrument.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          onClick={() => handleSelect(currentInstrument)}
                          disabled={!currentInstrument.unlocked}
                          className={`w-full ${currentInstrument.unlocked ? "bg-gradient-to-r from-pink-600 to-purple-600" : "bg-gray-700"}`}
                        >
                          {currentInstrument.unlocked ? "Select Instrument" : "Unlock Instrument"}
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 z-10 bg-black bg-opacity-50 rounded-full"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </div>
              
              {/* Instrument Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {INSTRUMENTS.map((instrument, index) => (
                  <button
                    key={instrument.id}
                    className={`w-3 h-3 rounded-full ${selectedInstrument === index ? "bg-purple-500" : "bg-gray-600"}`}
                    onClick={() => setSelectedInstrument(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Instrument Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
              {INSTRUMENTS.map((instrument) => (
                <Card 
                  key={instrument.id}
                  className={`bg-purple-900 bg-opacity-20 border-purple-800 cursor-pointer transition-all hover:scale-105 ${selectedInstrumentId === instrument.id ? "ring-2 ring-pink-500" : ""}`}
                  onClick={() => handleSelect(instrument)}
                >
                  <CardContent className="p-4 relative">
                    <div className="aspect-square bg-gradient-to-br from-purple-800 to-indigo-900 rounded-md mb-2 flex items-center justify-center">
                      <span>{instrument.name.split(" ")[0]}</span>
                      {!instrument.unlocked && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center">
                          <Lock className="h-8 w-8 text-yellow-500" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium text-center">{instrument.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}