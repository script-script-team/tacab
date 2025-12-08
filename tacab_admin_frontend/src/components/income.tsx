"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
import { useComIncome, useItIncome } from "@/react-query/dashboard.hooks"
import { useEffect } from "react"
import { toast } from "sonner"
import Loading from "./Loading"

export const description = "A radial chart with stacked sections"

export function ToatalIncome() {

  const it = useItIncome();
  const com = useComIncome();

  const totalItIncome = it.data?.total.reduce((a, b) => a + b.total, 0);
  const totalComIncome = com.data?.total.reduce((a, b) => a + b.total, 0);
  const totalIncome = totalItIncome! + totalComIncome!;
  const currentIT = it.data?.total[0].total;
  const currentCOM = com.data?.total[0].total;
  const currentTotal = currentIT! + currentCOM!;
  const past = [...(it?.data?.total?.slice(1).map(i => i.total) ?? []), ...(com?.data?.total.slice(1).map(i => i.total) ?? []),];
  const avg = past.reduce((a, b) => a + b, 0) / past.length;
  const percentage = avg === 0 ? 100 : ((currentTotal - avg) / avg) * 100;

  const chartData = [{ month: "january", itIncome: totalItIncome, comIncome: totalComIncome }]

const chartConfig = {
  itIncome: {
    label: "IT: ",
    color: "var(--chart-3)",
  },
  comIncome: {
    label: "computer: ",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

  useEffect(() => {
    if(it.isError) toast.error(it.error.message);
    if(com.isError) toast.error(com.error.message);
  }, [it.isError, com.isError]);

  if(it.isLoading) return <div className="w-full h-[50vh] rounded-lg"><Loading /></div>

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total income - statistics</CardTitle>
        <CardDescription>{new Date().toDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          ${totalIncome.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Income
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="itIncome"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-itIncome)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="comIncome"
              fill="var(--color-comIncome)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by {percentage}% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total income for the last 8 months
        </div>
      </CardFooter>
    </Card>
  )
}
