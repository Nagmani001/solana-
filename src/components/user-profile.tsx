'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { UserProfileData } from '@/contexts/profile-context'; // Import type from context


const getInitials = (name: string) => {
    if (!name) return 'QE'; // Default initials if name is empty
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

const getLevelBadge = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50">Beginner</Badge>;
    case 'intermediate': return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">Intermediate</Badge>;
    case 'advanced': return <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/50">Advanced</Badge>;
    default: return <Badge variant="outline">{level || 'Beginner'}</Badge>; // Default to Beginner if level is missing
  }
}

// Accept full profileData as a required prop
export function UserProfile({ profileData }: { profileData: UserProfileData }) {
  // Use the passed-in profileData directly
  const { name, avatar, level, levelProgress, solPoints, achievements, completedModules, totalModules, bio } = profileData;

  // Calculate progress safely
  const moduleProgress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <Card className="shadow-md w-full">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          {avatar && <AvatarImage src={avatar} alt={name} data-ai-hint="profile picture user avatar" />}
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <CardTitle className="text-xl">{name || 'Quest Explorer'}</CardTitle>
           <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 justify-center sm:justify-start">
             {getLevelBadge(level)}
             <div className="flex items-center justify-center sm:justify-start text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 mr-1 text-primary" />
                {solPoints.toLocaleString()} SOL Points
             </div>
           </div>
            {bio && <CardDescription className="mt-2 text-sm text-muted-foreground">{bio}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
         <Separator />
         <div>
           <div className="flex justify-between items-center mb-1">
             <span className="text-sm font-medium">Level Progress</span>
             <span className="text-xs text-muted-foreground">{Math.round(levelProgress)}% to next level</span>
           </div>
           <Progress value={levelProgress} aria-label={`Progress to next level: ${levelProgress}%`} className="h-2" />
         </div>
         <div>
           <div className="flex justify-between items-center mb-1">
             <span className="text-sm font-medium">Modules Completed</span>
             <span className="text-xs text-muted-foreground">{completedModules} / {totalModules}</span>
           </div>
           <Progress value={moduleProgress} aria-label={`Modules completed: ${completedModules} of ${totalModules}`} className="h-2" />
         </div>
        <Separator />
        <div>
          <h3 className="text-md font-semibold mb-2">Achievements</h3>
          {achievements.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {achievements.map((ach) => (
                <div key={ach.name} className="flex flex-col items-center text-center p-2 rounded-md bg-muted/50 border border-border hover:bg-accent/20 transition-colors">
                  <ach.icon className={`h-8 w-8 mb-1 ${ach.color}`} />
                  <span className="text-xs font-medium">{ach.name}</span>
                   <p className="text-xs text-muted-foreground mt-1">{ach.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center">No achievements earned yet. <Link href="/trailhead" className="text-primary hover:underline">Start questing!</Link></p>
          )}
        </div>
      </CardContent>
      {/* Footer is managed by the parent page (e.g., ProfilePage) */}
    </Card>
  );
}
