"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A line chart with a label"

const chartData = [
  { Courses: "Networking", Students: 25, mobile: 80 },
  { Courses: "Web design", Students: 33, mobile: 200 },
  { Courses: "Database", Students: 12, mobile: 120 },
  { Courses: "Programing", Students: 22, mobile: 190 },
  { Courses: "A+", Students: 18, mobile: 130 },
  { Courses: "Multimedia", Students: 33, mobile: 140 },
]

const chartConfig = {
  Students: {
    label: "Students:",
    color: "var(--chart-3)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function Statistics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Courses"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              padding={{left: 2}}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="Students"
              type="natural"
              stroke="var(--color-Students)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-Students)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this Courses <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 Coursess
        </div>
      </CardFooter>
    </Card>
  )
}
