import { PersonalizedLearningPath } from '@/components/personalized-learning-path';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket } from 'lucide-react';

export default function MyPathPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
           <Rocket className="text-primary" /> My Personalized Learning Path
        </h1>
        <p className="text-lg text-muted-foreground">
          Your custom-generated Solana learning journey based on your goals and experience.
        </p>
      </header>

      <Separator />

      <section id="path-generator" className="space-y-6">
         <p className="text-muted-foreground">
            Need a new path or want to refine your current one? Use the generator below. Your latest generated path will be displayed here.
         </p>
        <PersonalizedLearningPath />

        {/* Placeholder for displaying the saved/current path */}
        <Card className="mt-8 border-dashed border-accent">
             <CardHeader>
                 <CardTitle>Your Current Path</CardTitle>
                 <CardDescription>This is the learning path currently active for your account. (Display generated path here)</CardDescription>
             </CardHeader>
             <CardContent>
                <p className="text-muted-foreground italic">
                    Generate a path above to see it displayed here. In a full application, your previously generated path would be saved and shown automatically.
                </p>
                 {/* TODO: Fetch and display the user's saved learning path */}
             </CardContent>
         </Card>

      </section>
    </div>
  );
}
