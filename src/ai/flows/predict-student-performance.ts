'use server';

/**
 * @fileOverview Predicts student performance based on input data and provides a risk level assessment.
 *
 * Exports:
 * - `predictStudentPerformance`: Function to initiate the student performance prediction flow.
 * - `PredictStudentPerformanceInput`: Input type for the `predictStudentPerformance` function.
 * - `PredictStudentPerformanceOutput`: Output type for the `predictStudentPerformance` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictStudentPerformanceInputSchema = z.object({
  subjectMarks: z.number().describe('Marks obtained in various subjects.'),
  gpa: z.number().describe('Student GPA.'),
  attendancePercentage: z
    .number()
    .describe('Student attendance percentage.'),
  assignmentCompletion: z.number().describe('Assignment completion rate.'),
  classEngagement: z.number().describe('Level of student engagement in class.'),
  age: z.number().describe('Age of the student.'),
  gender: z.string().describe('Gender of the student.'),
  educationalBackground: z
    .string()
    .describe('Educational background of the student.'),
});

export type PredictStudentPerformanceInput = z.infer<
  typeof PredictStudentPerformanceInputSchema
>;

const PredictStudentPerformanceOutputSchema = z.object({
  gradeCategory: z.string().describe('Predicted grade category.'),
  passFailOutcome: z.string().describe('Predicted pass/fail outcome.'),
  riskLevel: z.string().describe('Risk level (Low/Medium/High).'),
  confidenceScore: z.number().describe('Confidence score of the prediction.'),
});

export type PredictStudentPerformanceOutput = z.infer<
  typeof PredictStudentPerformanceOutputSchema
>;

export async function predictStudentPerformance(
  input: PredictStudentPerformanceInput
): Promise<PredictStudentPerformanceOutput> {
  return predictStudentPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictStudentPerformancePrompt',
  input: {schema: PredictStudentPerformanceInputSchema},
  output: {schema: PredictStudentPerformanceOutputSchema},
  prompt: `Given the following student data, predict their performance:

Subject Marks: {{{subjectMarks}}}
GPA: {{{gpa}}}
Attendance Percentage: {{{attendancePercentage}}}
Assignment Completion: {{{assignmentCompletion}}}
Class Engagement: {{{classEngagement}}}
Age: {{{age}}}
Gender: {{{gender}}}
Educational Background: {{{educationalBackground}}}

Predict the grade category, pass/fail outcome, risk level (Low, Medium, High), and provide a confidence score (0-1). Output as JSON.  The risk level should be determined by the predicted outcomes. If the student is failing and is predicted to continue failing, their risk level is High. If they are passing, but at risk of failing, their risk level is Medium. If they are passing and predicted to continue to pass, their risk level is Low.  Make sure the output can be parsed by Javascript.

Example:
{
  "gradeCategory": "B",
  "passFailOutcome": "Pass",
  "riskLevel": "Low",
  "confidenceScore": 0.85
}`,
});

const predictStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'predictStudentPerformanceFlow',
    inputSchema: PredictStudentPerformanceInputSchema,
    outputSchema: PredictStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
