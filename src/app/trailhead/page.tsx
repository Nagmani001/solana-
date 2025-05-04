import { LearningModules } from '@/components/learning-modules';
import { Separator } from '@/components/ui/separator';

export default function TrailheadPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          The Trailhead
        </h1>
        <p className="text-lg text-muted-foreground">
          Explore all available learning modules and challenges.
        </p>
      </header>

      <Separator />

      <section id="all-modules">
        <LearningModules />
      </section>
    </div>
  );
}
