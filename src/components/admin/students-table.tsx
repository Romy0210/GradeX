import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Student } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const riskVariantMap: { [key: string]: "secondary" | "outline" | "destructive" } = {
  Low: "secondary",
  Medium: "outline",
  High: "destructive",
};

export function StudentsTable({ students }: { students: Student[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Roster</CardTitle>
        <CardDescription>An overview of all students in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-center">Risk Level</TableHead>
                <TableHead className="text-right">GPA</TableHead>
                <TableHead className="w-[100px] text-right">Details</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {students.map((student) => (
                <TableRow key={student.id}>
                    <TableCell>
                    <div className="flex items-center gap-4">
                        <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell className="text-center">
                    <Badge variant={riskVariantMap[student.predictions?.riskLevel || 'Low']}>
                        {student.predictions?.riskLevel}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{student.academicRecords.gpa.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                    <Button asChild variant="ghost" size="icon">
                        <Link href={`/admin/students/${student.id}`}>
                        <ArrowRight className="h-4 w-4" />
                        <span className="sr-only">View Student</span>
                        </Link>
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
