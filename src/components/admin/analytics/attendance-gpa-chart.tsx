"use client"

import { Scatter, ScatterChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { Student } from "@/lib/data"

const chartConfig = {
  gpa: {
    label: "GPA",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function AttendanceGpaScatterPlot({ students }: { students: Student[] }) {
  const chartData = students.map(student => ({
    attendance: student.attendance.percentage,
    gpa: student.academicRecords.gpa,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Attendance vs. GPA</CardTitle>
        <CardDescription>Correlation between attendance percentage and GPA</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ScatterChart
            margin={{
              left: -20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis type="number" dataKey="gpa" name="GPA" unit="" tickLine={false} axisLine={false} tickMargin={10} domain={[0, 4]}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Scatter data={chartData} fill="var(--color-gpa)" />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
