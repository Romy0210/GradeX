
"use client";

import { Overview } from '@/components/admin/overview';
import { RiskDistributionChart } from '@/components/admin/risk-distribution-chart';
import { StudentsTable } from '@/components/admin/students-table';
import { DataUpload } from '@/components/admin/data-upload';
import { Separator } from '@/components/ui/separator';
import { useStudentData } from '@/hooks/use-student-data';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
    const { students, isLoading } = useStudentData();

    if (isLoading) {
        return (
             <div className="flex flex-col gap-6">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-5 w-3/4" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                    <Skeleton className="h-28" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    <div className="lg:col-span-3">
                        <Skeleton className="h-80" />
                    </div>
                    <div className="lg:col-span-2">
                        <Skeleton className="h-48" />
                    </div>
                </div>
                <Separator />
                <Skeleton className="h-[400px]" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">A complete overview of student performance and system analytics.</p>
            </div>
            <Overview students={students} />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <RiskDistributionChart students={students} />
                </div>
                <div className="lg:col-span-2">
                    <DataUpload />
                </div>
            </div>
            <Separator />
            <StudentsTable students={students} />
        </div>
    );
}
