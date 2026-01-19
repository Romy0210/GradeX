
"use client";

import { useState, useEffect, useCallback } from 'react';
import { students as initialStudents, type Student } from '@/lib/data';
import { useSettings } from './use-settings';

const STUDENTS_STORAGE_KEY = 'gradex_students';

export function useStudentData() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { settings, isLoading: settingsLoading } = useSettings();

  const calculateRiskLevel = useCallback((gpa: number): 'Low' | 'Medium' | 'High' => {
      if (gpa < settings.highRiskThreshold) {
          return 'High';
      } else if (gpa < settings.mediumRiskThreshold) {
          return 'Medium';
      } else {
          return 'Low';
      }
  }, [settings]);


  useEffect(() => {
    if(settingsLoading) return;

    try {
      const storedStudents = localStorage.getItem(STUDENTS_STORAGE_KEY);
      let studentsData: Student[];
      if (storedStudents) {
        studentsData = JSON.parse(storedStudents);
      } else {
        studentsData = initialStudents;
      }
      
      // Recalculate predictions based on settings
      const updatedStudents = studentsData.map(student => {
        if (student.predictions) {
          return {
            ...student,
            predictions: {
              ...student.predictions,
              riskLevel: calculateRiskLevel(student.academicRecords.gpa)
            }
          };
        }
        return student;
      });

      setStudents(updatedStudents);
      if (!storedStudents) {
         localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(updatedStudents));
      }

    } catch (error) {
      console.error("Failed to load or parse student data from localStorage", error);
      setStudents(initialStudents);
    } finally {
        setIsLoading(false);
    }
  }, [settings, settingsLoading, calculateRiskLevel]);

  const updateStudent = (updatedStudent: Student) => {
    // Also recalculate risk on manual update
    if (updatedStudent.predictions) {
        updatedStudent.predictions.riskLevel = calculateRiskLevel(updatedStudent.academicRecords.gpa);
    }

    setStudents(prevStudents => {
      const newStudents = prevStudents.map(s => 
        s.id === updatedStudent.id ? updatedStudent : s
      );
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(newStudents));
      return newStudents;
    });
  };

  const getStudentById = (id: string): Student | undefined => {
    return students.find(s => s.id === id);
  };
  
  const addStudents = (newStudents: Student[]) => {
     setStudents(prevStudents => {
      const studentMap = new Map(prevStudents.map(s => [s.id, s]));
      newStudents.forEach(newStudent => {
        // Recalculate risk for new/updated students
        if (newStudent.predictions) {
          newStudent.predictions.riskLevel = calculateRiskLevel(newStudent.academicRecords.gpa);
        }
        studentMap.set(newStudent.id, newStudent);
      });
      const updatedStudents = Array.from(studentMap.values());
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(updatedStudents));
      return updatedStudents;
    });
  }

  return { students, isLoading, updateStudent, getStudentById, addStudents };
}
