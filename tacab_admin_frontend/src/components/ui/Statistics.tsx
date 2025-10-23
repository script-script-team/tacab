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
import { getStatistics } from "@/react-query/dashboard.hooks"
import Loading from "../Loading"

export const description = "A line chart with a label"

const chartConfig = {
  Uploads: {
    label: "Uploads:",
    color: "var(--chart-3)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig


export function Statistics() {

  const {data, isLoading} = getStatistics();
  
  const chartData = data?.data.map((d) => {
    return {
      month: d.date,
      Uploads: d.total
    }
  }).reverse()

  return isLoading ? <Loading />: (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Statistics</CardTitle>
        <CardDescription>{new Date().toDateString()}</CardDescription>
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
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              padding={{left: 2}}
              tickFormatter={(value) => value.slice(5, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="Uploads"
              type="natural"
              stroke="var(--color-Uploads)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-Uploads)",
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
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total uploads for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
