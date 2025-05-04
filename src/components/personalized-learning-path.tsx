'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  generatePersonalizedLearningPath,
  type GeneratePersonalizedLearningPathInput,
  type GeneratePersonalizedLearningPathOutput,
} from '@/ai/flows/generate-personalized-learning-path'; // Ensure this path is correct

const formSchema = z.object({
  currentKnowledge: z.string().min(10, {
    message: 'Please describe your current knowledge in at least 10 characters.',
  }).max(500, { message: 'Description must be 500 characters or less.'}),
  learningGoals: z.string().min(10, {
    message: 'Please describe your learning goals in at least 10 characters.',
  }).max(500, { message: 'Goals must be 500 characters or less.'}),
});

export function PersonalizedLearningPath() {
  const [isLoading, setIsLoading] = useState(false);
  const [learningPath, setLearningPath] = useState<GeneratePersonalizedLearningPathOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentKnowledge: '',
      learningGoals: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setLearningPath(null);

    try {
      const input: GeneratePersonalizedLearningPathInput = {
        currentKnowledge: values.currentKnowledge,
        learningGoals: values.learningGoals,
      };
      const result = await generatePersonalizedLearningPath(input);
      setLearningPath(result);
    } catch (err) {
      console.error('Error generating learning path:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg border border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
           <Wand2 className="text-primary"/>
           Generate Your Personalized Solana Learning Path
        </CardTitle>
        <CardDescription>
          Tell us where you are and where you want to go, and we'll craft a custom learning journey for you.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentKnowledge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Current Solana Knowledge</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Complete beginner, know what a blockchain is', 'Familiar with basic transactions and wallets', 'Deployed simple programs with Anchor'"
                      {...field}
                      rows={3}
                      aria-describedby="current-knowledge-description"
                    />
                  </FormControl>
                  <FormDescription id="current-knowledge-description">
                    Be honest about your starting point.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="learningGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Learning Goals</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'Understand how NFTs work', 'Build a DeFi application', 'Contribute to Solana core protocols', 'Launch my own token'"
                      {...field}
                      rows={3}
                       aria-describedby="learning-goals-description"
                    />
                  </FormControl>
                   <FormDescription id="learning-goals-description">
                    What do you want to achieve?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="btn-glow-primary">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                 <Wand2 className="mr-2 h-4 w-4" />
                  Generate Path
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>

      {error && (
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      )}

      {learningPath && (
        <CardContent>
          <Card className="bg-muted/50 p-4">
           <CardHeader>
             <CardTitle className="text-lg">Your Custom Learning Path:</CardTitle>
           </CardHeader>
           <CardContent>
             {/* Format the learning path string for better readability */}
             <div className="prose prose-invert max-w-none text-foreground space-y-4 whitespace-pre-wrap">
                {learningPath.learningPath}
             </div>
           </CardContent>
          </Card>
        </CardContent>
      )}
    </Card>
  );
}
