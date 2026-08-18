import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Plus, Mail } from "lucide-react";

export default function TeamPage() {
  const teamMembers = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Admin",
      avatar: "",
    },
    {
      id: "2",
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "Editor",
      avatar: "",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Viewer",
      avatar: "",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Team Management</h1>
          <p className="text-gray-400 mt-1">Manage team members and collaboration settings</p>
        </div>
        <Button asChild className="gradient-bg text-black">
          <a href="/team/invite">
            <Plus className="mr-2 h-4 w-4" /> Invite Member
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-[#1a1a3a] rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-r from-[#5ee7ff] to-[#8a5fff]">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-[#0a1029] text-xs rounded-full">
                        {member.role}
                      </span>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0a1029] border-[#2a2a4a] mt-8">
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>Invitations that have not been accepted yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="h-12 w-12 rounded-full bg-[#1a1a3a] flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-400 text-center">
                  No pending invitations
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-[#0a1029] border-[#2a2a4a]">
            <CardHeader>
              <CardTitle>Invite New Member</CardTitle>
              <CardDescription>Send an invitation to join your team</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="colleague@example.com" 
                    className="bg-[#1a1a3a] border-[#2a2a4a]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select className="w-full h-10 px-3 rounded-md bg-[#1a1a3a] border border-[#2a2a4a] focus:outline-none focus:ring-2 focus:ring-[#5ee7ff]">
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="pt-2">
                  <Button className="w-full gradient-bg text-black">
                    Send Invitation
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-[#0a1029] border-[#2a2a4a] mt-8">
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>Configure team-wide settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Team Name</span>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Default Access Level</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Billing & Subscription</span>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}