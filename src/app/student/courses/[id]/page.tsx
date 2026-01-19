'use client';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookCopy, MessageSquare, Video, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Mock data, same as in the courses list page
const courses = [
  {
    id: "cs101",
    title: "Introduction to Computer Science",
    instructor: "Dr. Alan Turing",
    progress: 75,
    description: "A foundational course on programming principles, algorithms, and data structures.",
    modules: [
        { title: "Module 1: Introduction to Python", completed: true },
        { title: "Module 2: Data Structures", completed: true },
        { title: "Module 3: Algorithms", completed: false },
        { title: "Module 4: Final Project", completed: false },
    ]
  },
  {
    id: "ma202",
    title: "Calculus II",
    instructor: "Dr. Isaac Newton",
    progress: 62,
    description: "Exploring advanced integration techniques, sequences, and series.",
     modules: [
        { title: "Module 1: Integration by Parts", completed: true },
        { title: "Module 2: Sequences and Series", completed: true },
        { title: "Module 3: Parametric Equations", completed: false },
        { title: "Module 4: Polar Coordinates", completed: false },
    ]
  },
  {
    id: "ph150",
    title: "Physics for Engineers",
    instructor: "Dr. Marie Curie",
    progress: 88,
    description: "Covering mechanics, electricity, and magnetism with an engineering focus.",
     modules: [
        { title: "Module 1: Kinematics", completed: true },
        { title: "Module 2: Dynamics", completed: true },
        { title: "Module 3: Electromagnetism", completed: true },
        { title: "Module 4: Optics", completed: false },
    ]
  },
    {
    id: "en110",
    title: "Academic Writing",
    instructor: "Dr. Virginia Woolf",
    progress: 95,
    description: "Developing skills in critical reading, argumentation, and scholarly writing.",
     modules: [
        { title: "Module 1: The Art of the Thesis", completed: true },
        { title: "Module 2: Structuring Arguments", completed: true },
        { title: "Module 3: Research and Citation", completed: true },
        { title: "Module 4: Final Essay", completed: true },
    ]
  },
];


export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.id as string;
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        notFound();
    }

    return (
        <div className="space-y-6">
             <Button asChild variant="outline" size="sm" className="mb-4">
                <Link href="/student/courses">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                </Link>
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">{course.title}</CardTitle>
                    <CardDescription>Instructor: {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">{course.description}</p>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} aria-label={`${course.progress}% course progress`} />
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <BookCopy className="h-8 w-8 text-accent" />
                        <CardTitle>Course Materials</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full mb-2"><FileText className="mr-2"/>Syllabus.pdf</Button>
                        <Button variant="secondary" className="w-full"><Video className="mr-2"/>Lecture Recordings</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                         <MessageSquare className="h-8 w-8 text-accent" />
                        <CardTitle>Communication</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full mb-2">Announcements</Button>
                        <Button variant="secondary" className="w-full">Discussion Forum</Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                         <FileText className="h-8 w-8 text-accent" />
                        <CardTitle>Assignments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full mb-2">Upcoming Deadlines</Button>
                        <Button variant="secondary" className="w-full">Submit Work</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
