
"use client";

import { useAuth } from "@/hooks/use-auth";
import { StudentDashboard } from "@/components/student/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import type { Student } from "@/lib/data";

export default function StudentDashboardPage() {
    const { user, isLoading } = useAuth();

    if (isLoading || !user || !('name' in user)) {
        return (
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                    <Skeleton className="h-40 rounded-lg" />
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                     <Skeleton className="h-64 rounded-lg" />
                     <Skeleton className="h-64 rounded-lg" />
                </div>
            </div>
        )
    }
    
    // The user object from useAuth is live, so we can cast it directly.
    return <StudentDashboard student={user as Student} />
}
