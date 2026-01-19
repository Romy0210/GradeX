'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "cs101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    progress: 75,
    description: "A foundational course on programming principles, algorithms, and data structures.",
  },
  {
    id: "ma202",
    title: "Calculus II",
    instructor: "Dr. Isaac Newton",
    progress: 62,
    description: "Exploring advanced integration techniques, sequences, and series.",
  },
  {
    id: "ph150",
    title: "Physics for Engineers",
    instructor: "Dr. Marie Curie",
    progress: 88,
    description: "Covering mechanics, electricity, and magnetism with an engineering focus.",
  },
    {
    id: "en110",
    title: "Academic Writing",
    instructor: "Dr. Virginia Woolf",
    progress: 95,
    description: "Developing skills in critical reading, argumentation, and scholarly writing.",
  },
];


export default function CoursesPage() {
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline text-foreground">My Courses</h1>
                <p className="text-muted-foreground">An overview of your enrolled courses and progress.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
                {courses.map((course) => (
                    <Card key={course.id}>
                        <CardHeader>
                            <CardTitle>{course.title}</CardTitle>
                            <CardDescription>Instructor: {course.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{course.description}</p>
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium">Progress</span>
                                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} aria-label={`${course.progress}% course progress`} />
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button asChild variant="outline" className="w-full">
                                <Link href={`/student/courses/${course.id}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    View Course Details
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
