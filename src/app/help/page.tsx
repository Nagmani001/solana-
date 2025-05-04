import { Separator } from '@/components/ui/separator';
import { LifeBuoy } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <LifeBuoy className="text-primary" /> Help & Support
        </h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions and get help with SolanaQuest.
        </p>
      </header>

      <Separator />

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Quick answers to common queries.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                   <AccordionItem value="item-1">
                     <AccordionTrigger>How do I earn SOL Points?</AccordionTrigger>
                     <AccordionContent>
                       You earn SOL Points by completing tasks and challenges within the learning modules. Each task specifies the points awarded upon successful completion.
                     </AccordionContent>
                   </AccordionItem>
                   <AccordionItem value="item-2">
                     <AccordionTrigger>What are badges and certificates for?</AccordionTrigger>
                     <AccordionContent>
                       Badges represent milestones and achievements you unlock. Certificates are awarded upon completing entire learning levels (Beginner, Intermediate, Advanced) and can be shared.
                     </AccordionContent>
                   </AccordionItem>
                   <AccordionItem value="item-3">
                     <AccordionTrigger>My on-chain task isn't verifying.</AccordionTrigger>
                     <AccordionContent>
                       Ensure you are connected to the correct network (usually Devnet for tasks), have enough SOL for transaction fees, and that the transaction completed successfully on the blockchain explorer. If issues persist, check the specific task instructions or contact support.
                     </AccordionContent>
                   </AccordionItem>
                      <AccordionItem value="item-4">
                     <AccordionTrigger>How is the personalized learning path generated?</AccordionTrigger>
                     <AccordionContent>
                       We use an AI model trained on Solana development education. It takes your self-assessed knowledge and learning goals to recommend a sequence of modules and tasks tailored to you.
                     </AccordionContent>
                   </AccordionItem>
                 </Accordion>
            </CardContent>
         </Card>

          <Card>
            <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Need more help? Reach out to us.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    If you can't find the answer you're looking for, please contact our support team via email at <a href="mailto:support@solanaquest.app" className="text-primary hover:underline">support@solanaquest.app</a> or join our community Discord server (link coming soon!).
                </p>
                 {/* Add contact form or Discord link here later */}
            </CardContent>
         </Card>
       </div>
    </div>
  );
}
