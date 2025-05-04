'use client';

import React from 'react';
import { Leaderboard } from '@/components/leaderboard';
import { UserProfile } from '@/components/user-profile';
import { useProfile } from '@/contexts/profile-context';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton for loading state

export function HomePageClientContent() {
  const { profileData, isLoading } = useProfile();

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <section id="leaderboard" className="space-y-4">
        <h2 className="text-2xl font-semibold">Top Explorers</h2>
        <Leaderboard />
      </section>

      <section id="profile" className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Progress</h2>
        {isLoading ? (
          // Show skeleton while profile data is loading
          <Card className="shadow-md w-full">
            <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                 <div className="flex-1 text-center sm:text-left space-y-2">
                    <Skeleton className="h-6 w-3/4 mx-auto sm:mx-0" />
                    <Skeleton className="h-4 w-1/2 mx-auto sm:mx-0" />
                 </div>
            </CardHeader>
             <CardContent className="space-y-4 pt-4">
                 <Skeleton className="h-px w-full" />
                 <Skeleton className="h-6 w-full rounded-lg" />
                 <Skeleton className="h-6 w-full rounded-lg" />
                 <Skeleton className="h-px w-full" />
                 <Skeleton className="h-24 w-full rounded-lg" />
             </CardContent>
          </Card>
        ) : (
          // Pass profileData once loaded
          <UserProfile profileData={profileData} />
        )}
      </section>
    </div>
  );
}

// Need to add Card, CardHeader, CardContent locally as they are used in the Skeleton
import { Card, CardContent, CardHeader } from '@/components/ui/card';
