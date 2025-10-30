"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const products = [
  { name: "Vinyl Record - Jazz Collection", units: 342, revenue: "$10,260" },
  { name: "Artist T-Shirt - Limited Ed.", units: 289, revenue: "$8,670" },
  { name: "Premium Membership", units: 156, revenue: "$15,600" },
  { name: "Concert Ticket Bundle", units: 234, revenue: "$14,040" },
  { name: "Exclusive Art Print", units: 198, revenue: "$5,940" },
]

export function TopProductsCard() {
  return (
    <Card className="border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Top Products</CardTitle>
        <CardDescription className="text-muted-foreground">Best selling products by revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors duration-200 cursor-pointer"
            >
              <div>
                <p className="font-medium text-sm text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{product.units} units sold</p>
              </div>
              <p className="font-semibold text-sm text-foreground">{product.revenue}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
