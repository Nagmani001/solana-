'use client'; // Required because HomePageClientContent uses client-side hooks

import { PersonalizedLearningPath } from '@/components/personalized-learning-path';
import { LearningModules } from '@/components/learning-modules';
import { Separator } from '@/components/ui/separator';
import { HomePageClientContent } from '@/components/home-page-client-content'; // Import the new client component

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent text-transparent bg-clip-text">
          Welcome to SolanaQuest!
        </h1>
        <p className="text-lg text-muted-foreground">
          Your gamified journey to mastering Solana development starts here.
        </p>
      </header>

      <Separator />

      <section id="personalized-path" className="space-y-4">
        <h2 className="text-2xl font-semibold">Forge Your Path</h2>
        <PersonalizedLearningPath />
      </section>

      <Separator />

      <section id="learning-modules" className="space-y-4">
        <h2 className="text-2xl font-semibold">Explore the Trailhead</h2>
        <LearningModules />
      </section>

      <Separator />

      {/* Use the client component wrapper for Leaderboard and UserProfile */}
      <HomePageClientContent />

    </div>
  );
}
