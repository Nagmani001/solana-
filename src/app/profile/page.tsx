'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile } from '@/components/user-profile';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Share2, Save, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useProfile, type UserProfileData } from '@/contexts/profile-context'; // Import context
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

export default function ProfilePage() {
  const { profileData, updateProfileData, isLoading } = useProfile(); // Use context
  const [isEditing, setIsEditing] = useState(false);
  const [localProfileData, setLocalProfileData] = useState<UserProfileData>(profileData); // Local state for editing form
  const { toast } = useToast();

  // Effect to sync local state when context data loads or changes, or when exiting edit mode
  useEffect(() => {
    if (!isLoading) {
      // Only update local state if not currently editing, to avoid overwriting user input
      if (!isEditing) {
        setLocalProfileData(profileData);
      }
      // Start in editing mode if the profile is considered "new" (default name and no username)
      if (profileData.name === 'Quest Explorer' && !profileData.username && !isEditing) {
          setIsEditing(true);
          toast({
            title: "Welcome to SolanaQuest!",
            description: "Let's get your profile set up.",
            variant: "default",
          });
      }
    }
  }, [profileData, isLoading, isEditing, toast]); // Add isEditing to dependency array


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalProfileData(prev => ({ ...prev, [name]: value }));
  };

   const handleSaveDetails = (e: React.FormEvent) => {
     e.preventDefault();
     updateProfileData(localProfileData); // Update context
     setIsEditing(false); // Exit editing mode after save
     toast({
        title: "Profile Updated",
        description: "Your details have been saved.",
        variant: "default",
     });
   };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset local form data to the current context data
        setLocalProfileData(profileData);
         toast({
            title: "Changes Cancelled",
            description: "Your profile details remain unchanged.",
            variant: "destructive",
        });
    };

   if (isLoading) {
        return (
             <div className="container mx-auto p-4 md:p-8 space-y-8">
                 <header className="flex justify-between items-center">
                     <div className="space-y-2">
                        <Skeleton className="h-8 w-48"/>
                        <Skeleton className="h-5 w-72"/>
                     </div>
                      <div className="flex gap-2">
                         <Skeleton className="h-10 w-10" />
                         <Skeleton className="h-10 w-10" />
                      </div>
                 </header>
                  <Separator />
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <div className="lg:col-span-2 space-y-8">
                         <Skeleton className="h-64 w-full rounded-lg" />
                         <Skeleton className="h-96 w-full rounded-lg" />
                     </div>
                     <div className="space-y-6">
                         <Skeleton className="h-48 w-full rounded-lg" />
                         <Skeleton className="h-32 w-full rounded-lg" />
                         <Skeleton className="h-32 w-full rounded-lg" />
                     </div>
                  </div>
             </div>
        );
   }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="flex justify-between items-center">
         <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Profile
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your progress, view achievements, and manage your settings.
            </p>
          </div>
          <div className="flex gap-2">
             {/* TODO: Implement Share/Settings functionality */}
             <Button variant="outline" size="icon" aria-label="Share Profile" disabled><Share2 className="h-4 w-4"/></Button>
             <Button variant="outline" size="icon" aria-label="Profile Settings" disabled><Settings className="h-4 w-4"/></Button>
          </div>
      </header>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Profile Summary & Details Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Pass current profile data from context */}
            <UserProfile profileData={profileData} />

            {/* User Details Form Card */}
            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <div>
                      <CardTitle>{isEditing ? 'Edit Your Details' : 'Your Details'}</CardTitle>
                      <CardDescription>{isEditing ? 'Update your public profile information.' : 'View your profile information.'}</CardDescription>
                    </div>
                     {!isEditing && (
                       <Button variant="outline" size="sm" onClick={() => {
                            setLocalProfileData(profileData); // Ensure form starts with current data
                            setIsEditing(true);
                       }}>Edit Details</Button>
                     )}
                </CardHeader>
                <form onSubmit={handleSaveDetails}>
                  <CardContent className="space-y-4">
                      <div className="space-y-1">
                          <Label htmlFor="name">Display Name *</Label>
                          <Input id="name" name="name" value={localProfileData.name} onChange={handleInputChange} disabled={!isEditing} required placeholder="e.g., Jane Doe" />
                      </div>
                      <div className="space-y-1">
                          <Label htmlFor="username">Username *</Label>
                          <Input id="username" name="username" value={localProfileData.username} onChange={handleInputChange} disabled={!isEditing} required placeholder="e.g., jane_solana"/>
                      </div>
                       <div className="space-y-1">
                          <Label htmlFor="bio">Short Bio</Label>
                          <Textarea
                              id="bio"
                              name="bio"
                              value={localProfileData.bio}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              rows={3}
                              placeholder="Tell us a little about yourself..."
                          />
                      </div>
                      <div className="space-y-1">
                          <Label htmlFor="github">GitHub Profile URL</Label>
                          <Input id="github" name="github" value={localProfileData.github} onChange={handleInputChange} disabled={!isEditing} placeholder="https://github.com/yourusername"/>
                      </div>
                      <div className="space-y-1">
                          <Label htmlFor="twitter">Twitter Profile URL</Label>
                          <Input id="twitter" name="twitter" value={localProfileData.twitter} onChange={handleInputChange} disabled={!isEditing} placeholder="https://twitter.com/yourusername"/>
                      </div>
                  </CardContent>
                  {isEditing && (
                     <CardFooter className="justify-end space-x-2">
                         <Button type="button" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                         <Button type="submit"><Save className="mr-2 h-4 w-4"/> Save Details</Button>
                     </CardFooter>
                  )}
                </form>
             </Card>
          </div>

          {/* Right Column: Existing Cards (Details, Certificates, NFTs) - Use data from context */}
           <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Account Info</CardTitle>
                    <CardDescription>Joined date and last activity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p><strong>Joined:</strong> {profileData.joinedDate ?? 'Loading...'}</p>
                    <p><strong>Last Active:</strong> {profileData.lastActive}</p>
                    {profileData.github ? (
                        <p><strong>GitHub:</strong> <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">View Profile</a></p>
                    ): (
                         <p className="text-muted-foreground italic">GitHub link not provided.</p>
                    )}
                    {profileData.twitter ? (
                        <p><strong>Twitter:</strong> <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">View Profile</a></p>
                    ) : (
                         <p className="text-muted-foreground italic">Twitter link not provided.</p>
                    )}
                </CardContent>
             </Card>

             <Card>
                 <CardHeader>
                    <CardTitle>Certificates</CardTitle>
                 </CardHeader>
                 <CardContent>
                    {profileData.certificates?.length > 0 ? (
                        <ul className="space-y-2">
                            {profileData.certificates.map((cert: any) => (
                                <li key={cert.name} className="text-sm">
                                    <a href={cert.url || '#'} className="text-primary hover:underline">{cert.name}</a> - Earned {cert.date}
                                </li>
                            ))}
                        </ul>
                    ) : <p className="text-sm text-muted-foreground">No certificates earned yet.</p>}
                 </CardContent>
             </Card>

             <Card>
                 <CardHeader>
                     <CardTitle>NFT Rewards</CardTitle>
                 </CardHeader>
                 <CardContent>
                     {profileData.nftsEarned?.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                            {profileData.nftsEarned.map((nft: any) => (
                                <img key={nft.name} src={nft.imageUrl} alt={nft.name} data-ai-hint="nft reward digital art" className="w-16 h-16 rounded-md border border-border object-cover" />
                            ))}
                        </div>
                     ) : <p className="text-sm text-muted-foreground">No NFTs earned yet.</p>}
                 </CardContent>
             </Card>
           </div>
      </div>
    </div>
  );
}
