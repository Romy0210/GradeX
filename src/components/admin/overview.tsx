import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Student } from "@/lib/data";
import { Users, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";

export function Overview({ students }: { students: Student[] }) {
  const totalStudents = students.length;
  const atRiskStudents = students.filter(s => s.predictions?.riskLevel === 'High' || s.predictions?.riskLevel === 'Medium').length;
  const avgPerformance = students.reduce((acc, s) => acc + s.academicRecords.subjectMarks, 0) / totalStudents;
  const passingStudents = students.filter(s => s.predictions?.passFailOutcome === 'Pass').length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">All enrolled students in the system</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Students At-Risk</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{atRiskStudents}</div>
          <p className="text-xs text-muted-foreground">Medium or High risk level</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{((passingStudents / totalStudents) * 100).toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">Students predicted to pass</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Performance</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Average subject marks</p>
        </CardContent>
      </Card>
    </div>
  );
}
