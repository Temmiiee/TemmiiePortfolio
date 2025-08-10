'use server';
/**
 * @fileOverview An AI flow to generate website ideas based on a user's business description.
 *
 * - generateProjectIdea - A function that generates a website concept.
 * - ProjectIdeaInput - The input type for the generateProjectIdea function.
 * - ProjectIdeaOutput - The return type for the generateProjectIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectIdeaInputSchema = z.object({
  description: z.string().describe('The user\'s description of their business or project idea.'),
});
export type ProjectIdeaInput = z.infer<typeof ProjectIdeaInputSchema>;

const ProjectIdeaOutputSchema = z.object({
    title: z.string().describe("A catchy, short title for the website concept (e.g., 'Artisan Bakery Website', 'Personal Trainer Hub')."),
    concept: z.string().describe("A one-sentence summary of the website's main purpose."),
    features: z.array(z.string()).describe('A list of 3-5 key features for the website (e.g., "Online Booking", "Photo Gallery", "Contact Form").'),
});
export type ProjectIdeaOutput = z.infer<typeof ProjectIdeaOutputSchema>;


const ideaPrompt = ai.definePrompt({
    name: 'ideaPrompt',
    input: {schema: ProjectIdeaInputSchema},
    output: {schema: ProjectIdeaOutputSchema},
    prompt: `You are a web development expert who is great at brainstorming website ideas for clients.
    
A potential client has provided the following description of their business:
"{{{description}}}"

Based on this description, generate a simple but compelling website concept for them.
The tone should be encouraging and professional.
Generate a title for the idea, a one-sentence concept, and a list of 3 to 5 essential features.
Keep the feature descriptions short and to the point.`,
});


const ideaGeneratorFlow = ai.defineFlow(
  {
    name: 'ideaGeneratorFlow',
    inputSchema: ProjectIdeaInputSchema,
    outputSchema: ProjectIdeaOutputSchema,
  },
  async (input) => {
    const { output } = await ideaPrompt(input);
    return output!;
  }
);


export async function generateProjectIdea(input: ProjectIdeaInput): Promise<ProjectIdeaOutput> {
  return ideaGeneratorFlow(input);
}
