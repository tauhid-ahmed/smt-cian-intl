"use client";

import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  variants: number | string;
  price: string;
  stock: number | string;
  status: "Active" | "Inactive";
}

const ProductCatalogTab = () => {
  // Dynamic data
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Vinyl Record - Jazz Collection",
      variants: 3,
      price: "$29.99",
      stock: 45,
      status: "Active",
    },
    {
      id: 2,
      name: "Artist T-Shirt - Limited Ed",
      variants: 5,
      price: "$24.99",
      stock: 120,
      status: "Active",
    },
    {
      id: 3,
      name: "Exclusive Art Print",
      variants: 2,
      price: "$39.99",
      stock: 67,
      status: "Active",
    },
    {
      id: 4,
      name: "Concert Ticket Bundle",
      variants: 1,
      price: "$89.99",
      stock: 234,
      status: "Active",
    },
    {
      id: 5,
      name: "Premium Membership",
      variants: 3,
      price: "$99.99",
      stock: "Digital",
      status: "Active",
    },
  ]);

  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left text-white">
            <h1 className="font-semibold text-base sm:text-lg">
              Product Catalog
            </h1>
            <h2 className="text-sm text-[#F2F2F2]">
              Add and edit products, variants, and pricing
            </h2>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                className="bg-[#1a1a1a] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 w-full sm:w-64"
              />
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#EFEFEF]">
                <th className="text-left text-white text-base font-semibold pb-2 pr-4">
                  Product Name
                </th>
                <th className="text-left text-white text-base font-semibold pb-2 pr-4">
                  Variants
                </th>
                <th className="text-left text-white text-base font-semibold pb-2 pr-4">
                  Price
                </th>
                <th className="text-left text-white text-base font-semibold pb-2 pr-4">
                  Stock
                </th>
                <th className="text-left text-white text-base font-semibold pb-2 pr-4">
                  Status
                </th>
                <th className="text-end text-white text-base font-semibold pb-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#EFEFEF] hover:bg-[#414141]/40 ">
                  <td className="py-4 pr-4 text-white text-sm">
                    {product.name}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {product.variants}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {product.price}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {product.stock}
                  </td>
                  <td className="py-4 pr-4">
                    <span className="bg-[#89FF7233] text-[#22FF00] border border-[#22FF00] px-3 py-1 rounded-full text-xs font-medium">
                      {product.status}
                    </span>
                  </td>
                  <td className="pl-4 pt-4 pb-4 flex justify-end">
                    <button className="text-white hover:text-gray-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-white font-medium text-sm">
                  {product.name}
                </h3>
                <button className="text-white hover:text-gray-300">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-400">Variants:</span>
                  <span className="text-white ml-2">{product.variants}</span>
                </div>
                <div>
                  <span className="text-gray-400">Price:</span>
                  <span className="text-white ml-2">{product.price}</span>
                </div>
                <div>
                  <span className="text-gray-400">Stock:</span>
                  <span className="text-white ml-2">{product.stock}</span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full text-xs font-medium ml-2">
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogTab;
