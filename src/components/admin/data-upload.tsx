
"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useStudentData } from "@/hooks/use-student-data";
import Papa from "papaparse";
import type { Student } from "@/lib/data";

export function DataUpload() {
    const { toast } = useToast();
    const { addStudents } = useStudentData();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (!file) {
            toast({
                variant: "destructive",
                title: "No File Selected",
                description: "Please select a CSV file to upload.",
            });
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                try {
                    const newStudents = results.data.map((row: any) => {
                         // A basic validation to check if essential fields exist
                        if (!row.id || !row.name || !row.email) {
                            throw new Error(`Missing required fields in row: ${JSON.stringify(row)}`);
                        }
                        return {
                            id: row.id,
                            name: row.name,
                            avatar: row.avatar || `https://picsum.photos/seed/${row.id}/100/100`,
                            email: row.email,
                            password: row.password || 'password123',
                            academicRecords: {
                                subjectMarks: Number(row.avg_marks_pct) || 0,
                                gpa: Number(row.gpa) || 0,
                                internalAssessments: Number(row.internal_assessments_pct) || 0,
                            },
                            attendance: {
                                percentage: Number(row.attendance_pct) || 0,
                                lectureParticipation: Number(row.lecture_participation_score) || 0,
                            },
                            behavioral: {
                                assignmentCompletion: Number(row.assignment_completion_pct) || 0,
                                classEngagement: Number(row.class_engagement_score) || 0,
                            },
                            demographics: {
                                age: Number(row.age) || 0,
                                gender: row.gender || 'Other',
                                educationalBackground: row.educational_background || 'N/A',
                            },
                        } as Student;
                    });
                    
                    addStudents(newStudents);

                    toast({
                        title: "File Uploaded Successfully",
                        description: `${newStudents.length} student records have been processed.`,
                    });
                } catch(error: any) {
                     toast({
                        variant: "destructive",
                        title: "Error Processing File",
                        description: error.message || "Could not parse student data from CSV.",
                    });
                }
            },
            error: (error: any) => {
                 toast({
                    variant: "destructive",
                    title: "File Read Error",
                    description: error.message || "An error occurred while reading the file.",
                });
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload Student Data</CardTitle>
                <CardDescription>Upload a CSV file with new or updated student records.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Input type="file" accept=".csv" className="flex-1" onChange={handleFileChange} />
                <Button onClick={handleUpload} className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload and Process
                </Button>
            </CardContent>
        </Card>
    )
}
