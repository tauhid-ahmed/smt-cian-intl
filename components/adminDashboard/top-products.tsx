"use client";

interface Product {
  name: string;
  units: number;
  revenue: string;
}

interface TopProductsCardProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function TopProductsCard({
  products,
  title = "Top Products",
  subtitle = "Best selling products by revenue",
}: TopProductsCardProps) {
  return (
    <div className="bg-[#181818] rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-4">
        <div className="text-left text-white mb-4">
          <h1 className="font-semibold text-base sm:text-lg">{title}</h1>
          <h2 className="text-sm text-[#F2F2F2]">{subtitle}</h2>
        </div>
        {products.map((product, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors duration-200">
            <div>
              <p className="font-medium text-sm text-white mb-1">
                {product.name}
              </p>
              <p className="text-xs text-[#F2F2F2]">
                {product.units} units sold
              </p>
            </div>
            <p className="font-normal text-sm text-[#F2F2F2]">
              {product.revenue}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
