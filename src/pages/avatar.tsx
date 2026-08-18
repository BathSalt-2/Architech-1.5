import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

const HAIR_STYLES = ["short", "medium", "long", "mohawk", "afro", "bald"];
const HAIR_COLORS = ["black", "brown", "blonde", "red", "blue", "green", "purple", "pink"];
const FACE_TYPES = ["round", "oval", "square", "heart"];
const CLOTHING_STYLES = ["casual", "punk", "metal", "glam", "goth", "hippie"];
const CLOTHING_COLORS = ["black", "white", "red", "blue", "purple", "green"];
const ACCESSORIES = ["sunglasses", "earrings", "necklace", "tattoos", "piercings", "none"];

export default function AvatarPage() {
  const { toast } = useToast();
  const [avatar, setAvatar] = useState({
    gender: "male",
    hairStyle: HAIR_STYLES[0],
    hairColor: HAIR_COLORS[0],
    faceType: FACE_TYPES[0],
    skinTone: 50,
    clothingStyle: CLOTHING_STYLES[0],
    clothingColor: CLOTHING_COLORS[0],
    accessories: ACCESSORIES[0],
  });

  const handleChange = (field: string, value: string | number) => {
    setAvatar((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would save to a database
    toast({
      title: "Avatar Saved!",
      description: "Your rockstar avatar has been created successfully.",
    });
  };

  const cycleOption = (field: string, options: string[], direction: 1 | -1) => {
    const currentValue = avatar[field as keyof typeof avatar] as string;
    const currentIndex = options.indexOf(currentValue);
    const newIndex = (currentIndex + direction + options.length) % options.length;
    handleChange(field, options[newIndex]);
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-950 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Create Your Rockstar</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Preview */}
            <div className="lg:col-span-1">
              <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-b from-purple-800 to-indigo-900 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center p-4">
                      <div className="w-48 h-48 mx-auto bg-gray-800 rounded-full mb-4 relative overflow-hidden">
                        {/* This would be replaced with actual avatar rendering */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg">Avatar Preview</span>
                        </div>
                      </div>
                      <p className="text-lg font-medium">Your {avatar.gender} rockstar with {avatar.hairColor} {avatar.hairStyle} hair</p>
                      <p className="text-sm text-gray-300">{avatar.clothingStyle} style, {avatar.clothingColor} outfit</p>
                    </div>
                  </div>
                  
                  <Button onClick={handleSave} className="w-full bg-gradient-to-r from-pink-600 to-purple-600">
                    <Save className="mr-2 h-4 w-4" />
                    Save Avatar
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Customization Options */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="basics" className="w-full">
                <TabsList className="w-full bg-purple-900 bg-opacity-20">
                  <TabsTrigger value="basics" className="flex-1">Basics</TabsTrigger>
                  <TabsTrigger value="hair" className="flex-1">Hair</TabsTrigger>
                  <TabsTrigger value="face" className="flex-1">Face</TabsTrigger>
                  <TabsTrigger value="clothing" className="flex-1">Clothing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="basics" className="mt-4">
                  <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label className="text-lg mb-2 block">Gender</Label>
                        <RadioGroup 
                          value={avatar.gender} 
                          onValueChange={(value) => handleChange("gender", value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nonbinary" id="nonbinary" />
                            <Label htmlFor="nonbinary">Non-binary</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div>
                        <Label className="text-lg mb-2 block">Skin Tone</Label>
                        <Slider
                          value={[avatar.skinTone]}
                          onValueChange={(value) => handleChange("skinTone", value[0])}
                          max={100}
                          step={1}
                          className="py-4"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="hair" className="mt-4">
                  <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label className="text-lg mb-2 block">Hair Style</Label>
                        <div className="flex items-center space-x-4">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => cycleOption("hairStyle", HAIR_STYLES, -1)}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="flex-1 text-center font-medium capitalize">
                            {avatar.hairStyle}
                          </div>
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => cycleOption("hairStyle", HAIR_STYLES, 1)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-lg mb-2 block">Hair Color</Label>
                        <div className="grid grid-cols-4 gap-2">
                          {HAIR_COLORS.map((color) => (
                            <Button
                              key={color}
                              variant={avatar.hairColor === color ? "default" : "outline"}
                              className={`capitalize ${avatar.hairColor === color ? "bg-purple-700" : ""}`}
                              onClick={() => handleChange("hairColor", color)}
                            >
                              {color}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="face" className="mt-4">
                  <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label className="text-lg mb-2 block">Face Type</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {FACE_TYPES.map((type) => (
                            <Button
                              key={type}
                              variant={avatar.faceType === type ? "default" : "outline"}
                              className={`capitalize ${avatar.faceType === type ? "bg-purple-700" : ""}`}
                              onClick={() => handleChange("faceType", type)}
                            >
                              {type}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-lg mb-2 block">Accessories</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {ACCESSORIES.map((item) => (
                            <Button
                              key={item}
                              variant={avatar.accessories === item ? "default" : "outline"}
                              className={`capitalize ${avatar.accessories === item ? "bg-purple-700" : ""}`}
                              onClick={() => handleChange("accessories", item)}
                            >
                              {item}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="clothing" className="mt-4">
                  <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label className="text-lg mb-2 block">Clothing Style</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {CLOTHING_STYLES.map((style) => (
                            <Button
                              key={style}
                              variant={avatar.clothingStyle === style ? "default" : "outline"}
                              className={`capitalize ${avatar.clothingStyle === style ? "bg-purple-700" : ""}`}
                              onClick={() => handleChange("clothingStyle", style)}
                            >
                              {style}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-lg mb-2 block">Clothing Color</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {CLOTHING_COLORS.map((color) => (
                            <Button
                              key={color}
                              variant={avatar.clothingColor === color ? "default" : "outline"}
                              className={`capitalize ${avatar.clothingColor === color ? "bg-purple-700" : ""}`}
                              onClick={() => handleChange("clothingColor", color)}
                            >
                              {color}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}