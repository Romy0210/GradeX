'use server';
/**
 * @fileOverview AI-powered personalized recommendation generator for students.
 *
 * - generatePersonalizedRecommendations - A function that generates personalized recommendations for students. input.
 * - GeneratePersonalizedRecommendationsInput - The input type for the generatePersonalizedRecommendations function.
 * - GeneratePersonalizedRecommendationsOutput - The return type for the generatePersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedRecommendationsInputSchema = z.object({
  gradeCategory: z.string().describe('The predicted grade category of the student.'),
  passFailOutcome: z.string().describe('The predicted pass/fail outcome of the student.'),
  riskLevel: z.string().describe('The predicted risk level of the student (Low, Medium, High).'),
  confidenceScore: z.number().describe('The confidence score of the prediction (0-1).'),
  academicPerformance: z.string().describe('Summary of the student\'s academic performance.'),
  behavioralIndicators: z.string().describe('Summary of the student\'s behavioral indicators.'),
});
export type GeneratePersonalizedRecommendationsInput = z.infer<typeof GeneratePersonalizedRecommendationsInputSchema>;

const GeneratePersonalizedRecommendationsOutputSchema = z.object({
  academicRecommendations: z.string().describe('Personalized academic recommendations for the student.'),
  behavioralRecommendations: z.string().describe('Personalized behavioral recommendations for the student.'),
  riskBasedInterventions: z.string().describe('Risk-based interventions for the student.'),
});
export type GeneratePersonalizedRecommendationsOutput = z.infer<typeof GeneratePersonalizedRecommendationsOutputSchema>;

export async function generatePersonalizedRecommendations(
  input: GeneratePersonalizedRecommendationsInput
): Promise<GeneratePersonalizedRecommendationsOutput> {
  return generatePersonalizedRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedRecommendationsPrompt',
  input: {schema: GeneratePersonalizedRecommendationsInputSchema},
  output: {schema: GeneratePersonalizedRecommendationsOutputSchema},
  prompt: `You are an AI-powered academic advisor. Based on the student's predicted performance, provide personalized recommendations.

Grade Category: {{{gradeCategory}}}
Pass/Fail Outcome: {{{passFailOutcome}}}
Risk Level: {{{riskLevel}}}
Confidence Score: {{{confidenceScore}}}
Academic Performance: {{{academicPerformance}}}
Behavioral Indicators: {{{behavioralIndicators}}}

Consider all factors to generate tailored academic, behavioral, and risk-based recommendations. Provide clear and actionable advice for the student to improve their performance.

Format the output in the following format:
Academic Recommendations: [recommendations]
Behavioral Recommendations: [recommendations]
Risk-Based Interventions: [recommendations]
`,
});

const generatePersonalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedRecommendationsFlow',
    inputSchema: GeneratePersonalizedRecommendationsInputSchema,
    outputSchema: GeneratePersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
