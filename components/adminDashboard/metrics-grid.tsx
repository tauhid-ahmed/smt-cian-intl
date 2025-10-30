"use client"

import { TrendingUp, Users, ShoppingBag, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
  {
    title: "Total Revenue",
    value: "$109,000",
    icon: TrendingUp,
    change: "+12.5%",
    positive: true,
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    icon: Users,
    change: "+2.1%",
    positive: true,
  },
  {
    title: "Total Orders",
    value: "1,261",
    icon: ShoppingBag,
    change: "+8.3%",
    positive: true,
  },
  {
    title: "Review",
    value: "4.8",
    icon: Star,
    change: "+0.3",
    positive: true,
  },
]

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card
            key={metric.title}
            className="border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className={`text-xs mt-2 ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                    {metric.change} from last period
                  </p>
                </div>
                <Icon className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
