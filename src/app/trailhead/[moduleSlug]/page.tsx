'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check, CheckCircle, Circle, ExternalLink, Play, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast'; // Import useToast

// Mock Data Source - In a real app, this would be fetched based on the slug
const allModulesData = {
  'blockchain-101-wallets': {
    level: 'Beginner',
    title: 'Blockchain 101 & Wallets',
    description: 'Understand blockchain basics and set up your first Solana wallet. Learn about keys, addresses, and networks.',
    tasks: [
      { id: 'task-1', name: 'Task 1: What is a Blockchain?', points: 10, completed: false, type: 'reading', link: 'https://coingeek.com/blockchain101/blockchain-basics-key-things-to-know-as-a-beginner/' },
      { id: 'task-2', name: 'Task 2: Create a Solana Wallet (Phantom)', points: 50, completed: false, type: 'action', link: 'https://phantom.com/learn/guides/how-to-create-a-new-wallet' },
      { id: 'task-3', name: 'Task 3: Secure Your Seed Phrase', points: 15, completed: false, type: 'reading', link: 'https://help.solflare.com/en/articles/9259281-understanding-recovery-phrase-security-with-solana-snap-and-metamask' },
      { id: 'task-4', name: 'Task 4: Connect to Devnet', points: 20, completed: false, type: 'action', link: 'https://medium.com/future-vision/how-to-switch-to-solana-devnet-in-phantom-wallet-c1515625d78e' },
      { id: 'task-5', name: 'Task 5: Get Devnet SOL', points: 25, completed: false, type: 'action', link: 'https://faucet.solana.com/' },
      { id: 'task-6', name: 'Task 6: Send Your First Devnet Transaction', points: 25, completed: false, type: 'action', link: 'https://www.quicknode.com/guides/solana-development/transactions/how-to-send-a-transaction-on-solana-using-javascript' },
      { id: 'task-7', name: 'Task 7: View Transaction on Explorer', points: 15, completed: false, type: 'action', link: 'https://explorer.solana.com/?cluster=devnet' },
    ],
    image: 'https://picsum.photos/800/300?random=1',
    imageHint: 'blockchain network nodes',
    badge: 'Wallet Master',
    estimatedTime: '1 hour',
    prerequisites: 'None',
    docsLink: 'https://solana.com/docs/getstarted/overview', // General Solana Get Started
  },
  'solana-cli-programs': {
    level: 'Intermediate',
    title: 'Solana CLI & Programs',
    description: 'Install the Solana Command Line Interface, learn the basics of Anchor framework, and deploy your first "Hello World" program to the Devnet.',
     tasks: [
      { id: 'task-8', name: 'Task 1: Install Solana CLI Tools', points: 75, completed: false, type: 'action', link: 'https://solana.com/docs/intro/installation' },
      { id: 'task-9', name: 'Task 2: Introduction to Anchor Framework', points: 50, completed: false, type: 'reading', link: 'https://solana.com/developers/courses/onchain-development/intro-to-anchor' },
      { id: 'task-10', name: 'Task 3: Set up Anchor Project', points: 50, completed: false, type: 'action', link: 'https://solana.com/docs/toolkit/projects/anchor-init' },
      { id: 'task-11', name: 'Task 4: Write "Hello World" Program Logic', points: 100, completed: false, type: 'coding', link: 'https://www.quicknode.com/guides/solana-development/anchor/how-to-write-your-first-anchor-program-in-solana-part-1' },
      { id: 'task-12', name: 'Task 5: Build and Deploy Program', points: 150, completed: false, type: 'action', link: 'https://solana.com/docs/intro/quick-start/deploying-programs' },
      { id: 'task-13', name: 'Task 6: Interact with Deployed Program via CLI', points: 75, completed: false, type: 'action', link: 'https://solana.stackexchange.com/questions/8005/call-a-function-in-a-smart-contract-from-solana-cli' },
    ],
    image: 'https://picsum.photos/800/300?random=2',
    imageHint: 'code editor terminal commands',
    badge: 'Devnet Champion',
    estimatedTime: '3 hours',
    prerequisites: 'Beginner Level Completion',
    docsLink: 'https://solana.com/docs/cli/install', // CLI Docs Link
  },
   'nft-creation-with-metaplex': {
      level: 'Intermediate',
      title: 'NFT Creation with Metaplex',
      description: 'Dive into NFTs, Metaplex standards, and mint your own collection.',
      tasks: [
        { id: 'task-14', name: 'Task 1: Understand Metaplex Standards', points: 50, completed: false, type: 'reading', link: 'https://developers.metaplex.com/token-metadata' },
        { id: 'task-15', name: 'Task 2: Set up Candy Machine', points: 100, completed: false, type: 'action', link: 'https://developers.metaplex.com/candy-machine' },
        { id: 'task-16', name: 'Task 3: Mint an NFT Collection', points: 200, completed: false, type: 'action', link: 'https://developers.metaplex.com/candy-machine/mint' },
      ],
      image: 'https://picsum.photos/800/300?random=3',
      imageHint: 'NFT art collection crypto',
      badge: 'Mint Maestro',
      estimatedTime: '4 hours',
      prerequisites: 'Solana CLI & Programs',
      docsLink: 'https://developers.metaplex.com/', // Metaplex Docs Link
    },
    // Add dApp & DeFi Integration Module
     'dapp-defi-integration': {
        level: 'Advanced',
        title: 'dApp & DeFi Integration',
        description: 'Build a web app interacting with Solana DeFi protocols like Raydium.',
        tasks: [
          { id: 'task-17', name: 'Task 1: Connect Wallet to Frontend', points: 100, completed: false, type: 'coding', link: 'https://solana.com/docs/clients/javascript' }, // General JS Client Docs
          { id: 'task-18', name: 'Task 2: Integrate Raydium Swap SDK', points: 250, completed: false, type: 'coding', link: 'https://docs.raydium.io/raydium/' }, // Placeholder link, assuming Raydium has SDK docs
          { id: 'task-19', name: 'Task 3: Handle Transaction Signing & Submission', points: 150, completed: false, type: 'coding', link: 'https://solana.com/docs/clients/javascript/transactions' }, // JS Transaction Docs
        ],
        image: 'https://picsum.photos/800/300?random=4',
        imageHint: 'DeFi dashboard cryptocurrency charts',
        badge: 'DeFi Devotee',
        estimatedTime: '6 hours',
        prerequisites: 'NFT Creation with Metaplex',
        docsLink: 'https://solana.com/developers', // General Developer Portal
      },
      // Add Advanced Dev & Security Module
      'advanced-dev-security': {
        level: 'Advanced',
        title: 'Advanced Dev & Security',
        description: 'Explore multi-sig, CPIs, security audits, and optimization.',
        tasks: [
          { id: 'task-20', name: 'Task 1: Understanding Multi-Sig Wallets', points: 150, completed: false, type: 'reading', link: 'https://solana.com/docs/advanced/multisig' }, // Multisig Docs
          { id: 'task-21', name: 'Task 2: Implement Cross-Program Invocation (CPI)', points: 200, completed: false, type: 'coding', link: 'https://solana.com/docs/core/cpi' }, // CPI Docs
          { id: 'task-22', name: 'Task 3: Solana Security Best Practices', points: 100, completed: false, type: 'reading', link: 'https://solana.com/docs/programs/security' }, // Security Docs
          { id: 'task-23', name: 'Task 4: Program Optimization Techniques', points: 150, completed: false, type: 'reading', link: 'https://solana.com/docs/programs/optimization' }, // Optimization Docs
        ],
        image: 'https://picsum.photos/800/300?random=5',
        imageHint: 'security shield code lock blockchain',
        badge: 'Solana Sensei',
        estimatedTime: '8 hours',
        prerequisites: 'dApp & DeFi Integration',
        docsLink: 'https://solana.com/docs/core/overview', // Core Concepts Overview
      },
};


type TaskType = 'quiz' | 'action' | 'reading' | 'coding';

interface Task {
    id: string;
    name: string;
    points: number;
    completed: boolean;
    type: TaskType;
    link?: string;
}

interface ModuleData {
    level: string;
    title: string;
    description: string;
    tasks: Task[];
    image: string;
    imageHint: string;
    badge: string;
    estimatedTime: string;
    prerequisites: string;
    docsLink?: string;
}


const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/50';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getTaskIcon = (completed: boolean) => {
    if (completed) {
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
}

export default function ModulePage() {
  const params = useParams();
  const moduleSlug = typeof params.moduleSlug === 'string' ? params.moduleSlug : undefined;
  const { toast } = useToast();

  // State for the module data and tasks
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [progress, setProgress] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completedPoints, setCompletedPoints] = useState(0);
  const [taskLoading, setTaskLoading] = useState<string | null>(null); // Track loading state per task

  useEffect(() => {
    if (moduleSlug && allModulesData[moduleSlug as keyof typeof allModulesData]) {
      // Deep copy the module data to avoid modifying the original mock object
      // Reset task completion status on load
      const currentModuleRaw = allModulesData[moduleSlug as keyof typeof allModulesData];
      const currentModule = JSON.parse(JSON.stringify(currentModuleRaw));
      currentModule.tasks.forEach((task: Task) => task.completed = false); // Reset completion here

      setModuleData(currentModule);
      setTasks(currentModule.tasks);
    } else {
      setModuleData(null); // Handle module not found
      setTasks([]);
    }
  }, [moduleSlug]);

  // Recalculate progress whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.completed).length;
      const newProgress = (completedTasks / tasks.length) * 100;
      const newTotalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
      const newCompletedPoints = tasks.filter(t => t.completed).reduce((sum, task) => sum + task.points, 0);

      setProgress(newProgress);
      setTotalPoints(newTotalPoints);
      setCompletedPoints(newCompletedPoints);
    } else {
        setProgress(0);
        setTotalPoints(0);
        setCompletedPoints(0);
    }
  }, [tasks]);

  const handleStartTask = async (taskId: string) => {
     const task = tasks.find(t => t.id === taskId);
     if (!task || task.completed) return;

      setTaskLoading(taskId); // Start loading indicator for this task

     console.log(`Starting task: ${task.name}`);
     // TODO: Implement actual task logic based on type
     // - For 'quiz': Show quiz component/modal
     // - For 'action': Guide user, potentially verify on-chain action
     // - For 'reading': Mark as complete after viewing/acknowledging
     // - For 'coding': Provide editor/instructions, maybe run tests

     // --- MOCK TASK COMPLETION (replace with real logic) ---
     console.log(`Simulating completion for task: ${task.name}`);
     // Introduce a delay to simulate doing work
     await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate work/API call

     // Update task state
     setTasks(currentTasks =>
        currentTasks.map(t =>
            t.id === taskId ? { ...t, completed: true } : t
        )
     );

     setTaskLoading(null); // Stop loading indicator

     toast({
        title: "Task Completed!",
        description: `You earned ${task.points} SOL Points for completing "${task.name}".`,
        variant: "default",
     });

      // Use a functional update for checking completion to ensure latest state
      setTasks(currentTasks => {
         const allComplete = currentTasks.every(t => t.completed);
         if(allComplete && moduleData) { // Check moduleData exists
             toast({
                 title: "Module Complete!",
                 description: `Congratulations! You've mastered "${moduleData.title}" and earned the ${moduleData.badge} badge!`,
                 variant: "default", // Use default, maybe a success variant later
             });
              // TODO: Award badge, potentially unlock next module
         }
         return currentTasks; // Return the state for the setter
      });
     // --- END MOCK TASK COMPLETION ---
  };


  const handleContinueNext = () => {
      // Find the first incomplete task and simulate clicking its "Start Task" button
      const nextTask = tasks.find(t => !t.completed);
      if (nextTask) {
          handleStartTask(nextTask.id);
      } else {
           // Optionally handle the case where all tasks are complete
           console.log("All tasks in this module are complete!");
           toast({
                title: "Module Already Completed",
                description: "You've finished all tasks in this module.",
                variant: "default",
           });
      }
  };


  if (!moduleData) {
    // Initial load or module not found
    return (
        <div className="container mx-auto p-4 md:p-8 text-center">
             {moduleSlug === undefined ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-4"/>
                    <p>Loading module...</p>
                  </div>
             ) : (
                 <>
                    <h1 className="text-2xl font-bold">Module Not Found</h1>
                    <p className="text-muted-foreground">Could not find the requested learning module.</p>
                    <Button asChild variant="link" className="mt-4">
                      <Link href="/trailhead"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Trailhead</Link>
                    </Button>
                 </>
             )}
        </div>
    );
  }


  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
       <Button asChild variant="outline" size="sm" className="mb-4">
           <Link href="/trailhead"><ArrowLeft className="mr-2 h-4 w-4"/> Back to Trailhead</Link>
       </Button>

      <Card className="overflow-hidden shadow-lg border border-primary/10">
        <CardHeader className="relative p-0">
            <Image
                src={moduleData.image}
                alt={moduleData.title}
                width={800}
                height={300}
                className="w-full h-48 md:h-64 object-cover"
                data-ai-hint={moduleData.imageHint}
                priority // Load image faster
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
             <div className="absolute bottom-0 left-0 p-6 text-white">
                 <Badge variant="outline" className={`${getLevelColor(moduleData.level)} backdrop-blur-sm mb-2`}>
                  {moduleData.level}
                </Badge>
                <CardTitle className="text-2xl md:text-4xl font-bold drop-shadow-lg">{moduleData.title}</CardTitle>
             </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                 <CardDescription className="text-base max-w-prose">{moduleData.description}</CardDescription>
                 <div className="flex-shrink-0 space-y-2 text-sm text-right">
                    <p className="text-muted-foreground">Est. Time: {moduleData.estimatedTime}</p>
                     <p className="text-muted-foreground">Prerequisites: {moduleData.prerequisites}</p>
                     <p className="text-muted-foreground">Reward: {totalPoints} SOL Points + {moduleData.badge} Badge</p>
                      {moduleData.docsLink && (
                         <Button asChild variant="link" size="sm" className="text-primary p-0 h-auto">
                             <Link href={moduleData.docsLink} target="_blank" rel="noopener noreferrer">
                                 View Solana Docs <ExternalLink className="ml-1 h-3 w-3"/>
                             </Link>
                         </Button>
                       )}
                 </div>
            </div>

            <Separator />

             <div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-lg font-semibold">Module Progress</span>
                 <span className="text-sm text-muted-foreground">{completedPoints}/{totalPoints} Points | {Math.round(progress)}% Complete</span>
               </div>
               <Progress value={progress} aria-label={`${moduleData.title} progress: ${Math.round(progress)}%`} className="h-3"/>
             </div>

            <Separator />

             <div>
                <h3 className="text-xl font-semibold mb-4">Tasks</h3>
                 <ul className="space-y-3">
                    {tasks.map((task) => (
                         <li key={task.id} className={`flex items-center justify-between p-3 rounded-md border transition-colors ${task.completed ? 'bg-green-500/10 border-green-500/30' : 'bg-muted/30 hover:bg-muted/60'}`}>
                            <div className="flex items-center gap-3">
                                {getTaskIcon(task.completed)}
                                <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.name}</span>
                                {task.link && !task.completed && (
                                    <Button asChild variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                                        <Link href={task.link} target="_blank" rel="noopener noreferrer" title="Open task resource">
                                            <ExternalLink className="h-4 w-4"/>
                                        </Link>
                                    </Button>
                                )}
                             </div>
                              <div className="flex items-center gap-4">
                                 <Badge variant="secondary" className="font-mono">{task.points} pts</Badge>
                                 <Button
                                    variant={task.completed ? "ghost" : "default"}
                                    size="sm"
                                    disabled={task.completed || taskLoading === task.id} // Disable if completed or currently loading
                                    className={`w-[110px] justify-center ${!task.completed ? 'btn-glow-primary' : ''}`} // Add glow only to start button
                                    onClick={() => handleStartTask(task.id)}
                                 >
                                     {taskLoading === task.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin"/>
                                     ) : task.completed ? (
                                        <Check className="h-4 w-4"/>
                                     ) : (
                                         <Play className="h-4 w-4 mr-1"/>
                                     )}
                                     {taskLoading === task.id ? '' : task.completed ? 'Completed' : 'Start Task'}
                                 </Button>
                             </div>
                         </li>
                    ))}
                 </ul>
             </div>
        </CardContent>
        <CardFooter className="p-6 border-t flex justify-end">
            {progress === 100 ? (
                <Button variant="secondary" disabled>
                    <CheckCircle className="mr-2 h-4 w-4" /> Module Complete!
                </Button>
            ) : (
                 <Button
                    size="lg"
                    className="btn-glow-primary"
                    onClick={handleContinueNext}
                    disabled={taskLoading !== null || tasks.every(t => t.completed)} // Disable if any task is loading or all are complete
                 >
                    {taskLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4"/>}
                    {tasks.find(t => !t.completed) ? 'Continue Next Task' : 'Module Finished'}
                 </Button>
             )}
        </CardFooter>
      </Card>
    </div>
  );
}
