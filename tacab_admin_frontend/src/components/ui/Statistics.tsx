'use client'

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { getStatistics } from '@/react-query/dashboard.hooks'
import Loading from '../Loading'

export const description = 'A line chart with a label'

const chartConfig = {
  Uploads: {
    label: 'Uploads:',
    color: 'var(--chart-3)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function Statistics() {
  const { data, isLoading } = getStatistics()

  const chartData = data?.data
    .map((d) => {
      return {
        month: d.date,
        Uploads: d.total,
      }
    })
    .reverse()

  return isLoading ? (
    <Loading />
  ) : (
    <Card className='w-full h-fill'>
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
              dataKey='month'
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              padding={{ left: 2 }}
              tickFormatter={(value) => value.slice(5, 7)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Line
              dataKey='Uploads'
              type='natural'
              stroke='var(--color-Uploads)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-Uploads)',
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position='top'
                offset={12}
                className='fill-foreground'
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
