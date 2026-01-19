'use server';

import { generatePersonalizedRecommendations } from '@/ai/flows/generate-personalized-recommendations';
import { predictStudentPerformance } from '@/ai/flows/predict-student-performance';
import type { Student } from '@/lib/data';

export async function runStudentPrediction(student: Student) {
    const input = {
        subjectMarks: student.academicRecords.subjectMarks,
        gpa: student.academicRecords.gpa,
        attendancePercentage: student.attendance.percentage,
        assignmentCompletion: student.behavioral.assignmentCompletion,
        classEngagement: student.behavioral.classEngagement,
        age: student.demographics.age,
        gender: student.demographics.gender,
        educationalBackground: student.demographics.educationalBackground,
    };
    try {
        const prediction = await predictStudentPerformance(input);
        return prediction;
    } catch (error) {
        console.error("Error in predictStudentPerformance:", error);
        return { error: 'Failed to generate prediction.' };
    }
}

export async function runRecommendationGeneration(student: Student) {
    if (!student.predictions) {
        return { error: "Cannot generate recommendations without a prediction." };
    }
    const input = {
        gradeCategory: student.predictions.gradeCategory,
        passFailOutcome: student.predictions.passFailOutcome,
        riskLevel: student.predictions.riskLevel,
        confidenceScore: student.predictions.confidenceScore,
        academicPerformance: `GPA: ${student.academicRecords.gpa}, Marks: ${student.academicRecords.subjectMarks}`,
        behavioralIndicators: `Attendance: ${student.attendance.percentage}%, Engagement: ${student.behavioral.classEngagement}/5`
    };
    try {
        const recommendations = await generatePersonalizedRecommendations(input);
        return {
            academic: recommendations.academicRecommendations,
            behavioral: recommendations.behavioralRecommendations,
            interventions: recommendations.riskBasedInterventions
        };
    } catch (error) {
        console.error("Error in generatePersonalizedRecommendations:", error);
        return { error: 'Failed to generate recommendations.' };
    }
}
