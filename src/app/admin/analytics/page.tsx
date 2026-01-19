
"use client";

import { PassFailDistributionChart } from "@/components/admin/analytics/pass-fail-chart";
import { AttendanceGpaScatterPlot } from "@/components/admin/analytics/attendance-gpa-chart";
import { EngagementMarksScatterPlot } from "@/components/admin/analytics/engagement-marks-chart";
import { useStudentData } from "@/hooks/use-student-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsPage() {
    const { students, isLoading } = useStudentData();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="space-y-1">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-5 w-3/4" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Skeleton className="h-80" />
                    <Skeleton className="h-80" />
                </div>
                <div className="mt-6">
                    <Skeleton className="h-80" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-3xl font-bold font-headline text-foreground">Advanced Analytics</h1>
                <p className="text-muted-foreground">In-depth analysis of student performance trends.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <PassFailDistributionChart students={students} />
                <AttendanceGpaScatterPlot students={students} />
            </div>
             <div className="mt-6">
                <EngagementMarksScatterPlot students={students} />
            </div>
        </div>
    )
}
