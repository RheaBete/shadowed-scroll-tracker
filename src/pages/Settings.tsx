import { Settings as SettingsIcon, User, Bell, Lock, Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-4xl font-serif font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <User className="h-5 w-5 text-crimson" />
              Profile
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Self Tracker User" className="bg-secondary/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@selftracker.app" className="bg-secondary/50" />
            </div>
            <Button className="w-full bg-crimson hover:bg-crimson/90">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Bell className="h-5 w-5 text-violet" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="goal-reminders">Goal Reminders</Label>
                <p className="text-xs text-muted-foreground">Daily check-in notifications</p>
              </div>
              <Switch id="goal-reminders" defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="budget-alerts">Budget Alerts</Label>
                <p className="text-xs text-muted-foreground">When approaching budget limit</p>
              </div>
              <Switch id="budget-alerts" defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="journal-reminders">Journal Reminders</Label>
                <p className="text-xs text-muted-foreground">Daily reflection prompts</p>
              </div>
              <Switch id="journal-reminders" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Lock className="h-5 w-5 text-crimson" />
              Security
            </CardTitle>
            <CardDescription>Manage your password and security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="bg-secondary/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" className="bg-secondary/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" className="bg-secondary/50" />
            </div>
            <Button className="w-full bg-crimson hover:bg-crimson/90">Update Password</Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-serif flex items-center gap-2">
              <Palette className="h-5 w-5 text-violet" />
              Appearance
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Gothic Theme</Label>
                <p className="text-xs text-muted-foreground">Dark, elegant aesthetic (default)</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animations</Label>
                <p className="text-xs text-muted-foreground">Enable smooth transitions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-xs text-muted-foreground">Reduce spacing and padding</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Management */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="font-serif">Data Management</CardTitle>
          <CardDescription>Export or delete your data</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" className="border-violet text-violet hover:bg-violet/10">
            Export All Data
          </Button>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
