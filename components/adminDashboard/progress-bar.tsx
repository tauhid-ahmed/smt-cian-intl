"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProgressItem {
  label: string
  value: number
  color: string
}

const progressItems: ProgressItem[] = [
  { label: "Q1 Target", value: 75, color: "bg-chart-1" },
  { label: "Q2 Target", value: 60, color: "bg-chart-2" },
  { label: "Q3 Target", value: 85, color: "bg-chart-3" },
  { label: "Q4 Target", value: 45, color: "bg-chart-4" },
]

export function ProgressBarCard() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Quarterly Progress</CardTitle>
        <CardDescription>Target achievement by quarter</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {progressItems.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-sm text-muted-foreground">{item.value}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
