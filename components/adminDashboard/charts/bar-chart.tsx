"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { category: "Electronics", sales: 4000, returns: 240 },
  { category: "Clothing", sales: 3000, returns: 221 },
  { category: "Books", sales: 2000, returns: 229 },
  { category: "Home", sales: 2780, returns: 200 },
  { category: "Sports", sales: 1890, returns: 229 },
]

export function BarChartCard() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Sales by Category</CardTitle>
        <CardDescription className="text-muted-foreground">Sales vs Returns comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3b3b3b" />
            <XAxis dataKey="category" stroke="#666666" />
            <YAxis stroke="#666666" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#2c2c2c",
                border: "1px solid #3b3b3b",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              labelStyle={{ color: "#ffffff" }}
            />
            <Legend wrapperStyle={{ color: "#ffffff" }} />
            <Bar dataKey="sales" fill="#488bf9" radius={[8, 8, 0, 0]} />
            <Bar dataKey="returns" fill="#b1e5fc" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
