export type Student = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password?: string;
  academicRecords: {
    subjectMarks: number;
    gpa: number;
    internalAssessments: number;
  };
  attendance: {
    percentage: number;
    lectureParticipation: number;
  };
  behavioral: {
    assignmentCompletion: number;
    classEngagement: number;
  };
  demographics: {
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    educationalBackground: string;
  };
  predictions?: {
    gradeCategory: string;
    passFailOutcome: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    confidenceScore: number;
  };
  recommendations?: {
    academic: string;
    behavioral: string;
    interventions: string;
  };
};

export const students: Student[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    avatar: 'https://picsum.photos/seed/s1/100/100',
    email: 'alex.j@example.com',
    password: 'password123',
    academicRecords: { subjectMarks: 85, gpa: 3.5, internalAssessments: 88 },
    attendance: { percentage: 92, lectureParticipation: 4 },
    behavioral: { assignmentCompletion: 95, classEngagement: 4 },
    demographics: { age: 20, gender: 'Male', educationalBackground: 'High School Diploma' },
    predictions: {
      gradeCategory: 'A',
      passFailOutcome: 'Pass',
      riskLevel: 'Low',
      confidenceScore: 0.95
    },
     recommendations: {
      academic: "Maintain your strong study habits. Consider taking advanced placement courses to challenge yourself further.",
      behavioral: "Your class engagement is good. Try to lead a study group to help your peers.",
      interventions: "No immediate interventions required. Monitor progress and offer enrichment opportunities."
    }
  },
  {
    id: 's2',
    name: 'Maria Garcia',
    avatar: 'https://picsum.photos/seed/s2/100/100',
    email: 'maria.g@example.com',
    password: 'password123',
    academicRecords: { subjectMarks: 62, gpa: 2.3, internalAssessments: 70 },
    attendance: { percentage: 75, lectureParticipation: 2 },
    behavioral: { assignmentCompletion: 80, classEngagement: 3 },
    demographics: { age: 19, gender: 'Female', educationalBackground: 'High School Diploma' },
    predictions: {
      gradeCategory: 'C',
      passFailOutcome: 'Pass',
      riskLevel: 'Medium',
      confidenceScore: 0.78
    },
    recommendations: {
        academic: "Focus on improving your scores in weaker subjects. Attend supplemental instruction sessions.",
        behavioral: "Your attendance is dropping. Make it a priority to attend all classes to not miss important concepts.",
        interventions: "Schedule a meeting with an academic advisor. Consider a peer mentor."
    }
  },
  {
    id: 's3',
    name: 'David Smith',
    avatar: 'https://picsum.photos/seed/s3/100/100',
    email: 'david.s@example.com',
    password: 'password123',
    academicRecords: { subjectMarks: 45, gpa: 1.8, internalAssessments: 55 },
    attendance: { percentage: 60, lectureParticipation: 1 },
    behavioral: { assignmentCompletion: 65, classEngagement: 2 },
    demographics: { age: 21, gender: 'Male', educationalBackground: 'Some College' },
    predictions: {
      gradeCategory: 'F',
      passFailOutcome: 'Fail',
      riskLevel: 'High',
      confidenceScore: 0.89
    },
    recommendations: {
      academic: "Urgent action needed. Meet with your professor and a tutor for each subject immediately.",
      behavioral: "Your engagement and attendance are critically low. It's essential to participate more and seek help.",
      interventions: "Mandatory academic counseling. Enrollment in a student success program is highly recommended."
    }
  },
  {
    id: 's4',
    name: 'Sophia Chen',
    avatar: 'https://picsum.photos/seed/s4/100/100',
    email: 'sophia.c@example.com',
    password: 'password123',
    academicRecords: { subjectMarks: 91, gpa: 3.8, internalAssessments: 94 },
    attendance: { percentage: 98, lectureParticipation: 5 },
    behavioral: { assignmentCompletion: 100, classEngagement: 5 },
    demographics: { age: 20, gender: 'Female', educationalBackground: 'High School Diploma' },
    predictions: {
      gradeCategory: 'A',
      passFailOutcome: 'Pass',
      riskLevel: 'Low',
      confidenceScore: 0.98
    },
    recommendations: {
        academic: "Excellent work. Explore research opportunities or honors thesis projects in your field of interest.",
        behavioral: "Continue your exemplary participation. You are a model student for your peers.",
        interventions: "Consider becoming a peer tutor or mentor for other students."
    }
  },
  {
    id: 's5',
    name: 'Michael Brown',
    avatar: 'https://picsum.photos/seed/s5/100/100',
    email: 'michael.b@example.com',
    password: 'password123',
    academicRecords: { subjectMarks: 78, gpa: 3.1, internalAssessments: 82 },
    attendance: { percentage: 88, lectureParticipation: 3 },
    behavioral: { assignmentCompletion: 90, classEngagement: 4 },
    demographics: { age: 22, gender: 'Male', educationalBackground: 'Associate Degree' },
    predictions: {
      gradeCategory: 'B',
      passFailOutcome: 'Pass',
      riskLevel: 'Low',
      confidenceScore: 0.91
    },
     recommendations: {
      academic: "Solid performance. To reach the next level, identify one or two areas for improvement and seek targeted resources.",
      behavioral: "Good engagement. Try to ask more questions in class to deepen your understanding.",
      interventions: "No immediate interventions required. Check in with an advisor mid-semester to stay on track."
    }
  }
];

export const admin = {
  email: 'admin@gradex.pro',
  password: 'adminpassword'
};
