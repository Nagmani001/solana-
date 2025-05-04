'use server';

/**
 * @fileOverview A flow for generating personalized Solana learning paths based on user input.
 *
 * - generatePersonalizedLearningPath - A function that generates a personalized learning path.
 * - GeneratePersonalizedLearningPathInput - The input type for the generatePersonalizedLearningPath function.
 * - GeneratePersonalizedLearningPathOutput - The return type for the generatePersonalizedLearningPath function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GeneratePersonalizedLearningPathInputSchema = z.object({
  currentKnowledge: z
    .string()
    .describe('The user\'s current knowledge level of Solana development.'),
  learningGoals: z.string().describe('The user\'s learning goals for Solana development.'),
});
export type GeneratePersonalizedLearningPathInput = z.infer<typeof GeneratePersonalizedLearningPathInputSchema>;

const GeneratePersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .string()
    .describe(
      'A personalized learning path recommending specific modules and tasks to achieve the user\'s objectives.'
    ),
});
export type GeneratePersonalizedLearningPathOutput = z.infer<typeof GeneratePersonalizedLearningPathOutputSchema>;

export async function generatePersonalizedLearningPath(
  input: GeneratePersonalizedLearningPathInput
): Promise<GeneratePersonalizedLearningPathOutput> {
  return generatePersonalizedLearningPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedLearningPathPrompt',
  input: {
    schema: z.object({
      currentKnowledge: z
        .string()
        .describe('The user\'s current knowledge level of Solana development.'),
      learningGoals: z.string().describe('The user\'s learning goals for Solana development.'),
    }),
  },
  output: {
    schema: z.object({
      learningPath: z
        .string()
        .describe(
          'A personalized learning path recommending specific modules and tasks to achieve the user\'s objectives.'
        ),
    }),
  },
  prompt: `You are an expert in Solana development education. A user will provide their current Solana knowledge level and their learning goals. Based on this information, you will generate a personalized learning path for the user, recommending specific modules and tasks to achieve their objectives. Structure the response with clear level-based recommendations.

User's Current Knowledge: {{{currentKnowledge}}}
User's Learning Goals: {{{learningGoals}}}

Personalized Learning Path:`, // Use triple curly braces for the entire learning path to avoid escaping
});

const generatePersonalizedLearningPathFlow = ai.defineFlow<
  typeof GeneratePersonalizedLearningPathInputSchema,
  typeof GeneratePersonalizedLearningPathOutputSchema
>(
  {
    name: 'generatePersonalizedLearningPathFlow',
    inputSchema: GeneratePersonalizedLearningPathInputSchema,
    outputSchema: GeneratePersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
