"use client";

import Link from "next/link";
import { Plus, Trash } from "lucide-react";
import {
  useGetProductsQuery,
  useDeleteSingleProductMutation,
} from "@/lib/api/adminApi";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

const ProductCatalogTab = () => {
  const { data, isLoading, isError, refetch } = useGetProductsQuery(undefined);
  const [deleteSingleProduct] = useDeleteSingleProductMutation();
  const products = Array.isArray(data?.data) ? data.data : [];

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedProductId) return;

    setDeletingId(selectedProductId);

    try {
      await deleteSingleProduct(selectedProductId).unwrap();
      toast.success("Product deleted successfully!");
      refetch(); // refresh list
      setIsDialogOpen(false); // close modal
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product!");
    } finally {
      setDeletingId(null);
      setSelectedProductId(null);
    }
  };

  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <Toaster position="top-right" />
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
            <Link
              href={"/admin-dashboard/content/add-new-product"}
              className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={16} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Product Table */}
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

              {!isLoading && !isError && products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-white py-6 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17v-6h6v6m2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V17a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-gray-300 text-sm sm:text-base">
                        No products found. Please add a new product to get
                        started.
                      </p>
                    </div>
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
                  <td className="pl-4 pt-4 pb-4 flex justify-end gap-3">
                    {/* Delete Modal */}
                    <AlertDialog
                      open={isDialogOpen}
                      onOpenChange={setIsDialogOpen}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="text-white flex items-center gap-1"
                          onClick={() => {
                            setSelectedProductId(product.id);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Trash className="w-4 h-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Confirm Product Deletion
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to permanently delete this
                            product? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete}>
                            {deletingId === product.id
                              ? "Deleting..."
                              : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    {/* Edit Button */}
                    <Link
                      href={`/admin-dashboard/content/edit-new-product/${product.id}`}
                      passHref
                    >
                      <Button variant="outline" className="text-white">
                        Edit
                      </Button>
                    </Link>
                  </td>
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
