"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Applied", value: 25, color: "hsl(var(--chart-1))" },
  { name: "Screening", value: 12, color: "hsl(var(--chart-2))" },
  { name: "Interview", value: 8, color: "hsl(var(--chart-3))" },
  { name: "Offer", value: 3, color: "hsl(var(--chart-4))" },
  { name: "Rejected", value: 15, color: "hsl(var(--chart-5))" },
]

export function ApplicationStatusChart() {
  return (
    <ChartContainer
      config={{
        Applied: {
          label: "Applied",
          color: "hsl(var(--chart-1))",
        },
        Screening: {
          label: "Screening",
          color: "hsl(var(--chart-2))",
        },
        Interview: {
          label: "Interview",
          color: "hsl(var(--chart-3))",
        },
        Offer: {
          label: "Offer",
          color: "hsl(var(--chart-4))",
        },
        Rejected: {
          label: "Rejected",
          color: "hsl(var(--chart-5))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

