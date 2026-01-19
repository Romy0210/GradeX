
"use client";
import { useParams, notFound } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { runStudentPrediction, runRecommendationGeneration } from "@/app/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Lightbulb, Loader2, Book, ShieldAlert, TrendingUp, Save } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useStudentData } from "@/hooks/use-student-data";
import { type Student } from "@/lib/data";
import { Skeleton } from "@/components/ui/skeleton";


const riskVariantMap: { [key: string]: "secondary" | "outline" | "destructive" } = {
  Low: "secondary",
  Medium: "outline",
  High: "destructive",
};

export default function StudentDetailPage() {
  const { toast } = useToast();
  const params = useParams();
  const studentId = params.id as string;
  const [isPending, startTransition] = useTransition();
  const { getStudentById, updateStudent, isLoading } = useStudentData();
  const [student, setStudent] = useState<Student | null | undefined>(undefined);

  useEffect(() => {
    if (!isLoading) {
      const foundStudent = getStudentById(studentId);
      setStudent(foundStudent);
    }
  }, [studentId, isLoading, getStudentById]);

  if (isLoading || student === undefined) {
    return (
       <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-64" />
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-64 lg:col-span-1" />
          <Skeleton className="h-48 lg:col-span-2" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
          <Skeleton className="h-56" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (student === null) {
    notFound();
  }
  
  const handleFieldChange = (category: keyof Student, field: string, value: string) => {
    setStudent(prev => {
      if (!prev) return null;

      const newStudent = { ...prev };
      const keys = category.split('.');
      let current: any = newStudent;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      const finalKey = keys[keys.length - 1];
      const targetField = (current as any)[finalKey];
      let fieldObject: any;
      
      if(typeof targetField === 'object' && targetField !== null && !Array.isArray(targetField)) {
        fieldObject = (current as any)[finalKey];
      } else {
        fieldObject = current;
        field = finalKey;
      }

      const originalValue = fieldObject[field];
      if (typeof originalValue === 'number') {
        fieldObject[field] = value === "" ? 0 : parseFloat(value);
      } else {
        fieldObject[field] = value;
      }
      
      return newStudent;
    });
  };

  const handleSaveChanges = () => {
    if (student) {
        updateStudent(student);
        toast({
            title: "Changes Saved",
            description: "Student data has been successfully updated.",
        });
    }
  };

  const handleRunAnalysis = () => {
    if (!student) return;
    startTransition(async () => {
      const predictionResult = await runStudentPrediction(student);

      if ('error' in predictionResult || !predictionResult) {
        toast({ variant: "destructive", title: "Analysis Failed", description: predictionResult.error || "Could not generate prediction." });
        return;
      }

      const updatedStudentWithPrediction = { ...student, predictions: predictionResult };
      
      const recommendationResult = await runRecommendationGeneration(updatedStudentWithPrediction);
      
      if ('error' in recommendationResult || !recommendationResult) {
        toast({ variant: "destructive", title: "Analysis Failed", description: recommendationResult.error || "Could not generate recommendations." });
        const finalStudentState = updatedStudentWithPrediction;
        setStudent(finalStudentState);
        updateStudent(finalStudentState);
      } else {
        const finalStudentState = { ...updatedStudentWithPrediction, recommendations: recommendationResult };
        setStudent(finalStudentState);
        updateStudent(finalStudentState);
        toast({ title: "Analysis Complete", description: "Student predictions and recommendations have been updated." });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <AvatarImage src={student.avatar} alt={student.name} />
          <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold font-headline">{student.name}</h1>
          <p className="text-muted-foreground">{student.email}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
           <Button onClick={handleSaveChanges} variant="outline" disabled={isPending}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
          <Button onClick={handleRunAnalysis} disabled={isPending}>
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
            Run AI Analysis
          </Button>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Performance Snapshot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="gpa">GPA</Label>
                <Input type="number" id="gpa" value={student.academicRecords.gpa} onChange={(e) => handleFieldChange('academicRecords', 'gpa', e.target.value)} min="0" max="10" step="0.1" />
            </div>
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subjectMarks">Avg. Marks (%)</Label>
                <Input type="number" id="subjectMarks" value={student.academicRecords.subjectMarks} onChange={(e) => handleFieldChange('academicRecords','subjectMarks', e.target.value)} />
            </div>
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="internalAssessments">Internal Assessments (%)</Label>
                <Input type="number" id="internalAssessments" value={student.academicRecords.internalAssessments} onChange={(e) => handleFieldChange('academicRecords','internalAssessments', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Prediction</CardTitle>
            <CardDescription>Based on current data</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Risk Level</span>
              <Badge variant={riskVariantMap[student.predictions?.riskLevel || "Low"]} className="w-fit">{student.predictions?.riskLevel || "N/A"}</Badge>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Outcome</span>
              <span className="font-semibold">{student.predictions?.passFailOutcome || "N/A"}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Grade Category</span>
              <span className="font-semibold">{student.predictions?.gradeCategory || "N/A"}</span>
            </div>
             <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Confidence</span>
              <span className="font-semibold">{student.predictions ? `${(student.predictions.confidenceScore * 100).toFixed(0)}%` : "N/A"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
                <CardTitle>Attendance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="attendance">Attendance (%)</Label>
                    <Input type="number" id="attendance" value={student.attendance.percentage} onChange={(e) => handleFieldChange('attendance', 'percentage', e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="participation">Lecture Participation (1-5)</Label>
                    <Input type="number" id="participation" value={student.attendance.lectureParticipation} onChange={(e) => handleFieldChange('attendance','lectureParticipation', e.target.value)} />
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Behavioral Indicators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="assignmentCompletion">Assignment Completion (%)</Label>
                    <Input type="number" id="assignmentCompletion" value={student.behavioral.assignmentCompletion} onChange={(e) => handleFieldChange('behavioral', 'assignmentCompletion', e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="classEngagement">Class Engagement (1-5)</Label>
                    <Input type="number" id="classEngagement" value={student.behavioral.classEngagement} onChange={(e) => handleFieldChange('behavioral', 'classEngagement', e.target.value)} />
                </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
                <CardTitle>Demographics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={student.name} onChange={(e) => handleFieldChange('name', 'name', e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="age">Age</Label>
                    <Input type="number" id="age" value={student.demographics.age} onChange={(e) => handleFieldChange('demographics','age', e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="gender">Gender</Label>
                    <Input id="gender" value={student.demographics.gender} onChange={(e) => handleFieldChange('demographics', 'gender', e.target.value)} />
                </div>
                 <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="background">Educational Background</Label>
                    <Input id="background" value={student.demographics.educationalBackground} onChange={(e) => handleFieldChange('demographics', 'educationalBackground', e.target.value)} />
                </div>
            </CardContent>
          </Card>
      </div>
      
      <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb className="text-accent" /> AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {student.recommendations ? (
              <>
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><Book size={18} /> Academic</h3>
                  <p className="text-muted-foreground">{student.recommendations.academic}</p>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><ShieldAlert size={18} /> Interventions</h3>
                  <p className="text-muted-foreground">{student.recommendations.interventions}</p>
                </div>
                 <div>
                  <h3 className="font-semibold flex items-center gap-2 mb-2"><TrendingUp size={18} /> Behavioral</h3>
                  <p className="text-muted-foreground">{student.recommendations.behavioral}</p>
                </div>
              </>
            ) : (
                <p className="text-muted-foreground text-center py-4">Run AI analysis to generate recommendations.</p>
            )}
          </CardContent>
      </Card>
    </div>
  );

    