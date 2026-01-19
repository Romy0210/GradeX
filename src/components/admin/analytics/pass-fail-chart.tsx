"use client"

import * as React from "react"
import { Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import type { Student } from "@/lib/data"

const chartConfig = {
  students: {
    label: "Students",
  },
  Pass: {
    label: "Pass",
    color: "hsl(var(--chart-2))",
  },
  Fail: {
    label: "Fail",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig

export function PassFailDistributionChart({ students }: { students: Student[] }) {
    const outcomeData = students.reduce(
        (acc, student) => {
            const outcome = student.predictions?.passFailOutcome || "N/A";
            if (outcome === 'Pass') acc.Pass++;
            else if (outcome === 'Fail') acc.Fail++;
            return acc;
        },
        { Pass: 0, Fail: 0 }
    );

    const chartData = [
        { outcome: "Pass", students: outcomeData.Pass, fill: "var(--color-Pass)" },
        { outcome: "Fail", students: outcomeData.Fail, fill: "var(--color-Fail)" },
    ];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pass/Fail Outcome</CardTitle>
        <CardDescription>Predicted student outcomes</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="students"
              nameKey="outcome"
              innerRadius={60}
              strokeWidth={5}
            >
            </Pie>
             <ChartLegend
              content={<ChartLegendContent nameKey="outcome" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
