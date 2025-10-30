"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { month: "Jan", revenue: 32000, users: 24764 },
  { month: "Feb", revenue: 39000, users: 28000 },
  { month: "Mar", revenue: 42000, users: 31000 },
  { month: "Apr", revenue: 38000, users: 29000 },
  { month: "May", revenue: 45000, users: 33000 },
  { month: "Jun", revenue: 41000, users: 30000 },
  { month: "Jul", revenue: 40000, users: 32000 },
]

export function RevenueChart() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Revenue Over Time</CardTitle>
        <CardDescription className="text-muted-foreground">Monthly revenue trends</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3b3b3b" />
            <XAxis dataKey="month" stroke="#666666" />
            <YAxis stroke="#666666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2c2c2c",
                border: "1px solid #3b3b3b",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              labelStyle={{ color: "#ffffff" }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#ffffff"
              strokeWidth={2}
              dot={{ fill: "#ffffff", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
