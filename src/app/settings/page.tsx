import { Separator } from '@/components/ui/separator';
import { Settings, User, Bell, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  // Placeholder state for settings - replace with actual state management
  const settings = {
    username: 'Alex Solana',
    email: 'alex.solana@example.com',
    notifications: {
      email: true,
      inApp: true,
    },
    linkedWallet: 'abc...xyz', // Placeholder wallet address
    privacy: {
      showProfilePublicly: true,
      showLeaderboardRank: true,
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="text-primary" /> Settings
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your account, notification preferences, and privacy settings.
        </p>
      </header>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Settings */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Account</CardTitle>
            <CardDescription>Update your profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue={settings.username} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={settings.email} />
            </div>
            <div className="space-y-1">
              <Label>Linked Wallet</Label>
              <Input value={settings.linkedWallet} readOnly disabled />
              <Button variant="outline" size="sm" className="mt-2">Link New Wallet</Button> {/* Add functionality later */}
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notifications</CardTitle>
              <CardDescription>Choose how you receive updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                  <span>Email Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Receive updates via email.
                  </span>
                </Label>
                <Switch
                  id="email-notifications"
                  defaultChecked={settings.notifications.email}
                  aria-label="Email Notifications"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inapp-notifications" className="flex flex-col space-y-1">
                  <span>In-App Notifications</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get notified within the platform.
                  </span>
                </Label>
                <Switch
                  id="inapp-notifications"
                  defaultChecked={settings.notifications.inApp}
                  aria-label="In-App Notifications"
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> Privacy</CardTitle>
              <CardDescription>Control your profile visibility.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="public-profile" className="flex flex-col space-y-1">
                  <span>Public Profile</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Allow others to view your profile.
                  </span>
                </Label>
                <Switch id="public-profile" defaultChecked={settings.privacy.showProfilePublicly} aria-label="Public Profile Visibility" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="leaderboard-visibility" className="flex flex-col space-y-1">
                  <span>Show on Leaderboard</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Display your rank publicly.
                  </span>
                </Label>
                <Switch id="leaderboard-visibility" defaultChecked={settings.privacy.showLeaderboardRank} aria-label="Leaderboard Visibility" />
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
