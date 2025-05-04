import { Leaderboard } from '@/components/leaderboard';
import { Separator } from '@/components/ui/separator';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Leaderboard Rankings
        </h1>
        <p className="text-lg text-muted-foreground">
          Check your rank and see who's topping the charts in SolanaQuest.
        </p>
      </header>

      <Separator />

      <section id="leaderboard-view">
        <Leaderboard />
      </section>
    </div>
  );
}
