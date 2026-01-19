'use server';

/**
 * @fileOverview Identifies students at risk of poor academic performance and provides
 * recommendations.
 *
 * - identifyAtRiskStudents - A function that identifies at-risk students.
 * - IdentifyAtRiskStudentsInput - The input type for the identifyAtRiskStudents function.
 * - IdentifyAtRiskStudentsOutput - The return type for the identifyAtRiskStudents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyAtRiskStudentsInputSchema = z.object({
  studentData: z.string().describe('Structured student data, including academic records, attendance, and behavioral indicators.'),
  prediction: z.object({
      gradeCategory: z.string().describe('Predicted grade category for the student.'),
      passFailOutcome: z.string().describe('Predicted pass/fail outcome for the student.'),
      riskLevel: z.string().describe('Predicted risk level (Low, Medium, High) for the student.'),
      confidenceScore: z.number().describe('Confidence score for the prediction (0-1).')
  }).describe('The ML prediction for the student')
});
export type IdentifyAtRiskStudentsInput = z.infer<typeof IdentifyAtRiskStudentsInputSchema>;

const IdentifyAtRiskStudentsOutputSchema = z.object({
  isAtRisk: z.boolean().describe('Whether the student is identified as at risk.'),
  riskFactors: z.array(z.string()).describe('Specific risk factors contributing to the risk assessment.'),
  recommendations: z.array(z.string()).describe('Personalized recommendations for the student.'),
  rationale: z.string().describe('Explanation of why the student is considered at risk.'),
});
export type IdentifyAtRiskStudentsOutput = z.infer<typeof IdentifyAtRiskStudentsOutputSchema>;

export async function identifyAtRiskStudents(input: IdentifyAtRiskStudentsInput): Promise<IdentifyAtRiskStudentsOutput> {
  return identifyAtRiskStudentsFlow(input);
}

const identifyAtRiskStudentsPrompt = ai.definePrompt({
  name: 'identifyAtRiskStudentsPrompt',
  input: {schema: IdentifyAtRiskStudentsInputSchema},
  output: {schema: IdentifyAtRiskStudentsOutputSchema},
  prompt: `You are an AI assistant designed to identify students who are at risk of academic failure based on their academic data and ML prediction.

  Analyze the following student data and prediction to determine if the student is at risk.
  Student Data: {{{studentData}}}
  Prediction: Grade Category: {{{prediction.gradeCategory}}}, Pass/Fail: {{{prediction.passFailOutcome}}}, Risk Level: {{{prediction.riskLevel}}}, Confidence: {{{prediction.confidenceScore}}}

  Based on the data and prediction, determine the risk factors, and provide recommendations.
  Set isAtRisk to true if the student is at medium or high risk.  Otherwise set to false.
  Explain your reasoning in the rationale field.

  Example output:
  {
    "isAtRisk": true,
    "riskFactors": ["Low attendance", "Poor performance in exams"],
    "recommendations": ["Attend tutoring sessions", "Improve study habits"],
    "rationale": "The student has low attendance and poor exam performance, indicating they are at risk."
  }`,
});

const identifyAtRiskStudentsFlow = ai.defineFlow(
  {
    name: 'identifyAtRiskStudentsFlow',
    inputSchema: IdentifyAtRiskStudentsInputSchema,
    outputSchema: IdentifyAtRiskStudentsOutputSchema,
  },
  async input => {
    const {output} = await identifyAtRiskStudentsPrompt(input);
    return output!;
  }
);
