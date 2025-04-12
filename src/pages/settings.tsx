import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/components/layout/theme-provider";
import { Save, Volume, Music, Bell, Moon, Sun, Smartphone } from "lucide-react";

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    username: "RockStar123",
    email: "player@example.com",
    musicVolume: 80,
    sfxVolume: 70,
    notifications: true,
    vibration: true,
    autoSave: true,
    showTutorials: true,
    highPerformanceMode: false,
  });

  const handleChange = (field: string, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-purple-950 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Settings</h1>
          
          <div className="space-y-6">
            {/* Profile Settings */}
            <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    value={settings.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className="bg-purple-950 border-purple-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-purple-950 border-purple-700"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Audio Settings */}
            <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
                <CardDescription>Adjust volume levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="musicVolume" className="flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      Music Volume
                    </Label>
                    <span>{settings.musicVolume}%</span>
                  </div>
                  <Slider
                    id="musicVolume"
                    value={[settings.musicVolume]}
                    onValueChange={(value) => handleChange("musicVolume", value[0])}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sfxVolume" className="flex items-center gap-2">
                      <Volume className="h-4 w-4" />
                      Sound Effects Volume
                    </Label>
                    <span>{settings.sfxVolume}%</span>
                  </div>
                  <Slider
                    id="sfxVolume"
                    value={[settings.sfxVolume]}
                    onValueChange={(value) => handleChange("sfxVolume", value[0])}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Notification Settings */}
            <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Enable Notifications
                  </Label>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => handleChange("notifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Enable Vibration
                  </Label>
                  <Switch
                    id="vibration"
                    checked={settings.vibration}
                    onCheckedChange={(checked) => handleChange("vibration", checked)}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Game Settings */}
            <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
              <CardHeader>
                <CardTitle>Game Settings</CardTitle>
                <CardDescription>Configure gameplay preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoSave">Auto-Save Progress</Label>
                  <Switch
                    id="autoSave"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleChange("autoSave", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showTutorials">Show Tutorials</Label>
                  <Switch
                    id="showTutorials"
                    checked={settings.showTutorials}
                    onCheckedChange={(checked) => handleChange("showTutorials", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="highPerformanceMode">High Performance Mode</Label>
                  <Switch
                    id="highPerformanceMode"
                    checked={settings.highPerformanceMode}
                    onCheckedChange={(checked) => handleChange("highPerformanceMode", checked)}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Theme Settings */}
            <Card className="bg-purple-900 bg-opacity-20 border-purple-800">
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the app appearance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label>App Theme</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className={theme === "light" ? "bg-purple-700" : ""}
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={theme === "dark" ? "bg-purple-700" : ""}
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className={theme === "system" ? "bg-purple-700" : ""}
                      onClick={() => setTheme("system")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}