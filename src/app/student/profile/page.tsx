"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useStudentData } from "@/hooks/use-student-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Student } from "@/lib/data";

export default function ProfilePage() {
    const { user, isLoading: authLoading } = useAuth();
    const { updateStudent, isLoading: dataLoading } = useStudentData();
    const { toast } = useToast();
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        if (user && 'name' in user) {
            setStudent(user as Student);
        }
    }, [user]);

    const handleInputChange = (field: keyof Student['demographics'] | 'name', value: string | number) => {
        if (!student) return;

        setStudent(prev => {
            if (!prev) return null;
            const newStudent = { ...prev };
            if (field === 'name') {
                newStudent.name = value as string;
            } else {
                const originalValue = newStudent.demographics[field];
                newStudent.demographics = {
                    ...newStudent.demographics,
                    [field]: typeof originalValue === 'number' ? Number(value) : value
                };
            }
            return newStudent;
        });
    };

    const handleSaveChanges = () => {
        if (student) {
            updateStudent(student);
            toast({
                title: "Profile Updated",
                description: "Your information has been successfully saved.",
            });
        }
    };
    
    if (authLoading || dataLoading || !student) {
         return (
             <div className="space-y-6">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-5 w-1/2" />
                </div>
                 <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Skeleton className="h-20 w-20 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-32" />
                             <Skeleton className="h-4 w-48" />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                             <Skeleton className="h-4 w-16" />
                             <Skeleton className="h-10 w-full" />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                         <Skeleton className="h-10 w-32" />
                    </CardContent>
                 </Card>
            </div>
         )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline text-foreground">My Profile</h1>
                <p className="text-muted-foreground">View and manage your personal information.</p>
            </div>
            <Card>
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
                     <Avatar className="h-20 w-20 border-2 border-primary">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <CardTitle className="text-2xl">{student.name}</CardTitle>
                        <CardDescription>{student.email}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={student.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Input type="number" id="age" value={student.demographics.age} onChange={(e) => handleInputChange('age', e.target.value)} />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="gender">Gender</Label>
                            <Input id="gender" value={student.demographics.gender} onChange={(e) => handleInputChange('gender', e.target.value)} />
                        </div>
                    </div>
                     <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="background">Educational Background</Label>
                        <Input id="background" value={student.demographics.educationalBackground} onChange={(e) => handleInputChange('educationalBackground', e.target.value)} />
                    </div>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
