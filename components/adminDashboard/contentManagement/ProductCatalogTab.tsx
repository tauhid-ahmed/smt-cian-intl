"use client";

import Link from "next/link";
import { Trash } from "lucide-react";
import { useGetProductsQuery } from "@/lib/api/adminApi";


const ProductCatalogTab = () => {

  const { data, isLoading, isError } = useGetProductsQuery(undefined);
  const products = Array.isArray(data?.data) ? data.data : [];

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
                viewBox="0 0 24 24"
              >
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
                className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72"
              />
            </div>

            <Link
              href={"/admin-dashboard/content/add-new-product"}
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </Link>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                <th className="py-4 pr-4">Product Name</th>
                <th className="py-4 pr-4">Variants</th>
                <th className="py-4 pr-4">Price</th>
                <th className="py-4 pr-4">Stock</th>
                <th className="py-4 pr-4">Status</th>
                <th className="py-4 pl-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="text-white py-6 text-center">
                    Loading...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={6} className="text-red-500 py-6 text-center">
                    Failed to load products
                  </td>
                </tr>
              )}
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#EFEFEF] hover:bg-[#414141]/40"
                >
                  <td className="py-4 pr-4 text-white text-sm">
                    {product.title}
                  </td>

                  <td className="py-4 pr-4 text-white text-sm">
                    {product.tracks.length}
                  </td>

                  <td className="py-4 pr-4 text-white text-sm">
                    ${product.price}
                  </td>

                  <td className="py-4 pr-4 text-white text-sm">
                    {product.stock}
                  </td>

                  <td className="py-4 pr-4">
                    <span className="bg-[#89FF7233] text-[#22FF00] border border-[#22FF00] px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </td>

                  <div className="flex justify-center items-center gap-4">
                    <td className="pl-4 pt-4 pb-4 flex justify-end">
                      <button className="text-white hover:text-gray-300">
                        <Trash />
                      </button>
                    </td>

                    <td className="pl-4 pt-4 pb-4 flex justify-end">
                      <Link
                        href={`/admin-dashboard/content/edit-new-product/${product.id}`}
                        className="text-white hover:text-gray-300"
                        title="Edit Product"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Link>
                    </td>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalogTab;
