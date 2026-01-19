import type { Student } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Book, ShieldAlert, CheckCircle, TrendingUp, BarChart, AlertTriangle, Users } from "lucide-react";

const riskVariantMap: { [key: string]: "secondary" | "outline" | "destructive" } = {
  Low: "secondary",
  Medium: "outline",
  High: "destructive",
};

export function StudentDashboard({ student }: { student: Student }) {
    const predictions = student.predictions;
    const recommendations = student.recommendations;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold font-headline text-foreground">Welcome, {student.name.split(' ')[0]}!</h1>
                    <p className="text-muted-foreground">Here's your performance overview and personalized recommendations.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">AI Risk Prediction</CardTitle>
                        {predictions?.riskLevel === 'Low' && <CheckCircle className="text-green-500" />}
                        {predictions?.riskLevel === 'Medium' && <AlertTriangle className="text-yellow-500" />}
                        {predictions?.riskLevel === 'High' && <AlertTriangle className="text-red-500" />}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{predictions?.riskLevel} Risk</div>
                        <p className="text-xs text-muted-foreground">Based on your current academic trajectory</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Predicted Grade</CardTitle>
                        <BarChart className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Category "{predictions?.gradeCategory}"</div>
                        <p className="text-xs text-muted-foreground">Outcome: {predictions?.passFailOutcome}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <Users className="text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{student.attendance.percentage}%</div>
                        <Progress value={student.attendance.percentage} className="mt-2 h-2" />
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Lightbulb className="text-accent"/> Academic Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{recommendations?.academic || "No recommendations available."}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><TrendingUp className="text-accent"/> Behavioral Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{recommendations?.behavioral || "No recommendations available."}</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-accent"/> Suggested Interventions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{recommendations?.interventions || "No interventions suggested at this time."}</p>
                </CardContent>
            </Card>
        </div>
    );
}
