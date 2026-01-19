import { config } from 'dotenv';
config();

import '@/ai/flows/generate-personalized-recommendations.ts';
import '@/ai/flows/predict-student-performance.ts';
import '@/ai/flows/identify-at-risk-students.ts';