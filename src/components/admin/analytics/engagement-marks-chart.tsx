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
  marks: {
    label: "Avg. Marks",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function EngagementMarksScatterPlot({ students }: { students: Student[] }) {
  const chartData = students.map(student => ({
    engagement: student.behavioral.classEngagement,
    marks: student.academicRecords.subjectMarks,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Engagement vs. Average Marks</CardTitle>
        <CardDescription>Correlation between class engagement rating and subject marks</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ScatterChart
             margin={{
              left: -20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="engagement" name="Engagement (1-5)" tickLine={false} axisLine={false} tickMargin={10} domain={[0, 5]}/>
            <YAxis type="number" dataKey="marks" name="Avg. Marks" unit="%" tickLine={false} axisLine={false} tickMargin={10} domain={[0, 100]}/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Scatter data={chartData} fill="var(--color-marks)" />
          </ScatterChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
