
"use client";
import { StudentsTable } from '@/components/admin/students-table';
import { useStudentData } from '@/hooks/use-student-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function StudentsPage() {
    const { students, isLoading } = useStudentData();
    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline text-foreground">Student Management</h1>
                <p className="text-muted-foreground">View, manage, and analyze student data.</p>
            </div>
            {isLoading ? <Skeleton className="h-[400px]" /> : <StudentsTable students={students} />}
        </div>
    )
}
