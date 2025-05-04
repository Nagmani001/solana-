'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle, ExternalLink, Lock } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

// Mock Data - Replace with actual data fetching and state management
const modules = [
  {
    level: 'Beginner',
    title: 'Blockchain 101 & Wallets',
    description: 'Understand blockchain basics and set up your first Solana wallet.',
    tasks: [
      { name: 'Create a Solana Wallet', points: 50, completed: false }, // Reset completion
      { name: 'Get Devnet SOL', points: 25, completed: false }, // Reset completion
      { name: 'Send Your First Transaction', points: 25, completed: false }, // Reset completion
    ],
    image: 'https://picsum.photos/300/150', // Adjusted height
    imageHint: 'blockchain abstract network',
    badge: 'Wallet Master',
    isLocked: false,
    docsLink: 'https://docs.solana.com/getstarted',
  },
  {
    level: 'Intermediate',
    title: 'Solana CLI & Programs',
    description: 'Install the Solana CLI, learn Anchor, and deploy your first program.',
    tasks: [
      { name: 'Install Solana CLI', points: 75, completed: false }, // Reset completion
      { name: 'Deploy "Hello World" Program', points: 150, completed: false }, // Reset completion
      { name: 'Interact with Your Program', points: 75, completed: false }, // Reset completion
    ],
    image: 'https://picsum.photos/300/150', // Adjusted height
    imageHint: 'code terminal command line',
    badge: 'Devnet Champion',
    isLocked: false, // Should depend on previous level completion in real app
    docsLink: 'https://docs.solana.com/cli',
  },
  {
    level: 'Intermediate',
    title: 'NFT Creation with Metaplex',
    description: 'Dive into NFTs, Metaplex standards, and mint your own collection.',
    tasks: [
      { name: 'Understand Metaplex Standards', points: 50, completed: false }, // Reset completion
      { name: 'Set up Candy Machine', points: 100, completed: false }, // Reset completion
      { name: 'Mint an NFT Collection', points: 200, completed: false }, // Reset completion
    ],
    image: 'https://picsum.photos/300/150', // Adjusted height
    imageHint: 'NFT digital art crypto',
    badge: 'Mint Maestro',
    isLocked: false, // Should depend on previous level completion in real app
    docsLink: 'https://docs.metaplex.com/programs/token-metadata/overview',
  },
  {
    level: 'Advanced',
    title: 'dApp & DeFi Integration',
    description: 'Build a web app interacting with Solana DeFi protocols like Raydium.',
    tasks: [
      { name: 'Connect Wallet to Frontend', points: 100, completed: false }, // Reset completion
      { name: 'Integrate Raydium Swap', points: 250, completed: false }, // Reset completion
      { name: 'Handle Transaction Signing', points: 150, completed: false }, // Reset completion
    ],
    image: 'https://picsum.photos/300/150', // Adjusted height
    imageHint: 'DeFi dashboard cryptocurrency',
    badge: 'DeFi Devotee',
    isLocked: true, // Should depend on previous level completion in real app
    docsLink: 'https://docs.solana.com/developers',
  },
    {
    level: 'Advanced',
    title: 'Advanced Dev & Security',
    description: 'Explore multi-sig, CPIs, security audits, and optimization.',
    tasks: [
      { name: 'Build a Multi-Sig Wallet', points: 300, completed: false }, // Reset completion
      { name: 'Implement Cross-Program Invocation', points: 200, completed: false }, // Reset completion
      { name: 'Learn Security Best Practices', points: 100, completed: false }, // Reset completion
    ],
    image: 'https://picsum.photos/300/150', // Adjusted height
    imageHint: 'security shield code lock',
    badge: 'Solana Sensei',
    isLocked: true, // Should depend on previous level completion in real app
    docsLink: 'https://docs.solana.com/developing/programming-model/overview',
  },
];

// Export the total number of modules
export const totalModulesCount = modules.length;


const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

export function LearningModules() {
  // Progress calculation needs actual state management based on user progress
  // This mock calculation assumes no tasks are completed initially
  const calculateProgress = (tasks: { completed: boolean }[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter(task => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => {
         // Calculate progress based on the initial (false) state
         const progress = calculateProgress(module.tasks);
         const isComplete = progress === 100;
         const moduleSlug = module.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
         const completedTaskCount = module.tasks.filter(t => t.completed).length; // Use initial state

        return (
        <Card
          key={module.title}
          className={`flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/50 ${module.isLocked ? 'opacity-60 cursor-not-allowed grayscale' : ''}`}
        >
          <div> {/* Wrapper for non-footer content */}
            <CardHeader className="relative p-0">
              <Image
                src={module.image}
                alt={module.title}
                width={300}
                height={150}
                className="w-full h-36 object-cover"
                data-ai-hint={module.imageHint}
              />
              <Badge variant="outline" className={`absolute top-2 right-2 ${getLevelColor(module.level)} backdrop-blur-sm`}>
                {module.level}
              </Badge>
              {module.isLocked && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Lock className="text-white h-10 w-10" />
                  </div>
                )}
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <CardTitle className="text-lg">{module.title}</CardTitle>
              <CardDescription className="text-sm min-h-[40px]">{module.description}</CardDescription>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} aria-label={`${module.title} progress: ${Math.round(progress)}%`} className="h-2"/>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Tasks: {completedTaskCount}/{module.tasks.length}</span>
                  {isComplete && <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground"><CheckCircle className="mr-1 h-3 w-3"/> Complete!</Badge>}
              </div>
               {module.docsLink && (
                   <>
                    <Separator className="my-2"/>
                     <Link href={module.docsLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1 transition-colors">
                         <ExternalLink className="h-3 w-3"/>
                         Solana Docs Resource
                     </Link>
                   </>
               )}
            </CardContent>
          </div>
          <CardFooter className="p-4 border-t mt-auto"> {/* Ensure footer is at the bottom */}
            <Button
              variant="default"
              size="sm"
              className="w-full btn-glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={module.isLocked}
              asChild
            >
               <Link href={`/trailhead/${moduleSlug}`}>
                 {module.isLocked ? 'Locked' : isComplete ? 'Review Module' : 'Start Module'}
                 {!module.isLocked && <ArrowRight className="ml-2 h-4 w-4" />}
               </Link>
            </Button>
          </CardFooter>
        </Card>
      )})}
    </div>
  );
}
