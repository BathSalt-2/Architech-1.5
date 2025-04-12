import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fine } from "@/lib/fine";

export default function SettingsPage() {
  const { data: session } = fine.auth.useSession();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="bg-[#1a1a3a]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-[#0a1029] border-[#2a2a4a]">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          defaultValue={session?.user?.name || ""} 
                          className="bg-[#1a1a3a] border-[#2a2a4a]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={session?.user?.email || ""} 
                          disabled
                          className="bg-[#1a1a3a] border-[#2a2a4a]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        rows={4} 
                        className="w-full p-3 rounded-md bg-[#1a1a3a] border border-[#2a2a4a] focus:outline-none focus:ring-2 focus:ring-[#5ee7ff]"
                        placeholder="Tell us about yourself"
                      />
                    </div>
                    <Button className="gradient-bg text-black">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-[#0a1029] border-[#2a2a4a] mt-8">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Update your password</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        className="bg-[#1a1a3a] border-[#2a2a4a]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          className="bg-[#1a1a3a] border-[#2a2a4a]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          className="bg-[#1a1a3a] border-[#2a2a4a]"
                        />
                      </div>
                    </div>
                    <Button className="gradient-bg text-black">
                      Update Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-[#0a1029] border-[#2a2a4a]">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Upload a new profile picture</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-6">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                    <AvatarFallback className="bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff] text-4xl">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-4 w-full">
                    <Button variant="outline" className="w-full border-[#5ee7ff] text-[#5ee7ff]">
                      Upload New Image
                    </Button>
                    <Button variant="outline" className="w-full">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0a1029] border-[#2a2a4a] mt-8">
                <CardHeader>
                  <CardTitle>Danger Zone</CardTitle>
                  <CardDescription>Irreversible account actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how Arch1tech looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-[#5ee7ff] rounded-lg p-4 flex flex-col items-center">
                    <div className="h-20 w-full bg-[#0a0a1f] rounded mb-4 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Dark</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Selected
                    </Button>
                  </div>
                  <div className="border border-[#2a2a4a] rounded-lg p-4 flex flex-col items-center">
                    <div className="h-20 w-full bg-white rounded mb-4 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Light</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Select
                    </Button>
                  </div>
                  <div className="border border-[#2a2a4a] rounded-lg p-4 flex flex-col items-center">
                    <div className="h-20 w-full bg-gradient-to-b from-white to-[#0a0a1f] rounded mb-4 flex items-center justify-center">
                      <span className="text-xs text-gray-600">System</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Select
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accent Color</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-[#5ee7ff] rounded-lg p-2 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff]"></div>
                  </div>
                  <div className="border border-[#2a2a4a] rounded-lg p-2 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#ff5e7f] to-[#ff8a5f]"></div>
                  </div>
                  <div className="border border-[#2a2a4a] rounded-lg p-2 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#5eff8a] to-[#5ee7ff]"></div>
                  </div>
                  <div className="border border-[#2a2a4a] rounded-lg p-2 flex items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[#ffcc5e] to-[#ff5e7f]"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interface Density</h3>
                <div className="flex items-center space-x-4">
                  <Button variant="outline" className="border-[#5ee7ff] text-[#5ee7ff]">
                    Compact
                  </Button>
                  <Button variant="outline">
                    Comfortable
                  </Button>
                </div>
              </div>

              <Button className="gradient-bg text-black">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for external integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your API Keys</h3>
                  <div className="p-4 bg-[#1a1a3a] rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-medium">Primary API Key</h4>
                        <p className="text-sm text-gray-400">Created on Jan 15, 2023</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reveal
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Generate New API Key</h3>
                  <div className="space-y-2">
                    <Label htmlFor="key-name">Key Name</Label>
                    <Input 
                      id="key-name" 
                      placeholder="e.g., Development Key" 
                      className="bg-[#1a1a3a] border-[#2a2a4a]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-expiry">Expiration</Label>
                    <select 
                      id="key-expiry" 
                      className="w-full h-10 px-3 rounded-md bg-[#1a1a3a] border border-[#2a2a4a] focus:outline-none focus:ring-2 focus:ring-[#5ee7ff]"
                    >
                      <option value="never">Never</option>
                      <option value="30d">30 days</option>
                      <option value="90d">90 days</option>
                      <option value="1y">1 year</option>
                    </select>
                  </div>
                  <Button className="gradient-bg text-black">
                    Generate API Key
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-agent-updates">Agent updates and status changes</Label>
                      <Switch id="email-agent-updates" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-workflow-completion">Workflow completion</Label>
                      <Switch id="email-workflow-completion" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-team-invites">Team invitations</Label>
                      <Switch id="email-team-invites" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-marketing">Marketing and product updates</Label>
                      <Switch id="email-marketing" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inapp-agent-updates">Agent updates and status changes</Label>
                      <Switch id="inapp-agent-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inapp-workflow-completion">Workflow completion</Label>
                      <Switch id="inapp-workflow-completion" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inapp-team-activity">Team activity</Label>
                      <Switch id="inapp-team-activity" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inapp-marketplace-updates">Marketplace updates</Label>
                      <Switch id="inapp-marketplace-updates" />
                    </div>
                  </div>
                </div>

                <Button className="gradient-bg text-black">
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}