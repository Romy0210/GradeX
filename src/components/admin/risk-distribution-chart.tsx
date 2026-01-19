"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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

export function RiskDistributionChart({ students }: { students: Student[] }) {
  const riskData = students.reduce(
    (acc, student) => {
      const riskLevel = student.predictions?.riskLevel || "Unknown"
      if (riskLevel === "Low") acc.Low++
      if (riskLevel === "Medium") acc.Medium++
      if (riskLevel === "High") acc.High++
      return acc
    },
    { Low: 0, Medium: 0, High: 0 }
  )

  const chartData = [
    { risk: "Low", students: riskData.Low, fill: "var(--color-low)" },
    { risk: "Medium", students: riskData.Medium, fill: "var(--color-medium)" },
    { risk: "High", students: riskData.High, fill: "var(--color-high)" },
  ]

  const chartConfig = {
    students: {
      label: "Students",
    },
    low: {
      label: "Low",
      color: "hsl(var(--chart-2))",
    },
    medium: {
      label: "Medium",
      color: "hsl(var(--chart-4))",
    },
    high: {
      label: "High",
      color: "hsl(var(--destructive))",
    },
  } satisfies ChartConfig

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
        <CardDescription>Number of students per risk category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="risk"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--foreground))"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="students" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
