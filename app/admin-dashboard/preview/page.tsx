"use client";

import { useState, useMemo } from "react";
import { DataTable, type Column } from "@/components/features/data-table";
import { StatusDropdown } from "@/components/features/status-dropdown";

// Mock data types
interface InventoryItem {
  id: string;
  product: string;
  sku: string;
  stockLevel: string;
  reorderPoint: string;
  status: "ok" | "low-stock" | "critical";
}

interface OrderItem {
  id: string;
  orderId: string;
  customer: string;
  items: number;
  total: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
}

// Mock data
const initialInventoryData: InventoryItem[] = [
  {
    id: "1",
    product: "Vinyl Record - Jazz Collection",
    sku: "VIN-001",
    stockLevel: "45 units",
    reorderPoint: "20 units",
    status: "ok",
  },
  {
    id: "2",
    product: "Artist T-Shirt - Limited Ed.35",
    sku: "TSH-002",
    stockLevel: "8 units",
    reorderPoint: "15 units",
    status: "low-stock",
  },
  {
    id: "3",
    product: "Exclusive Art Print",
    sku: "ART-003",
    stockLevel: "67 units",
    reorderPoint: "25 units",
    status: "ok",
  },
  {
    id: "4",
    product: "Concert Ticket Bundle",
    sku: "TKT-004",
    stockLevel: "234 units",
    reorderPoint: "50 units",
    status: "ok",
  },
  {
    id: "5",
    product: "Signed Album Cover",
    sku: "ALB-005",
    stockLevel: "3 units",
    reorderPoint: "10 units",
    status: "critical",
  },
  {
    id: "6",
    product: "Merchandise Bundle",
    sku: "MER-006",
    stockLevel: "12 units",
    reorderPoint: "20 units",
    status: "low-stock",
  },
  {
    id: "7",
    product: "Limited Edition Poster",
    sku: "POS-007",
    stockLevel: "89 units",
    reorderPoint: "30 units",
    status: "ok",
  },
  {
    id: "8",
    product: "Collector's Box Set",
    sku: "BOX-008",
    stockLevel: "2 units",
    reorderPoint: "5 units",
    status: "critical",
  },
];

const initialOrderData: OrderItem[] = [
  {
    id: "1",
    orderId: "#ORD-1234",
    customer: "John Doe",
    items: 3,
    total: "$124.97",
    status: "pending",
    date: "2025-10-20",
  },
  {
    id: "2",
    orderId: "#ORD-1235",
    customer: "Jane Smith",
    items: 1,
    total: "$29.99",
    status: "shipped",
    date: "2025-10-20",
  },
  {
    id: "3",
    orderId: "#ORD-1236",
    customer: "Mike Johnson",
    items: 5,
    total: "$289.95",
    status: "processing",
    date: "2025-10-19",
  },
  {
    id: "4",
    orderId: "#ORD-1237",
    customer: "Sarah Wilson",
    items: 2,
    total: "$69.98",
    status: "delivered",
    date: "2025-10-19",
  },
  {
    id: "5",
    orderId: "#ORD-1238",
    customer: "Tom Brown",
    items: 1,
    total: "$99.99",
    status: "pending",
    date: "2025-10-18",
  },
  {
    id: "6",
    orderId: "#ORD-1239",
    customer: "Emma Davis",
    items: 4,
    total: "$199.96",
    status: "delivered",
    date: "2025-10-18",
  },
  {
    id: "7",
    orderId: "#ORD-1240",
    customer: "Alex Martinez",
    items: 2,
    total: "$79.98",
    status: "processing",
    date: "2025-10-17",
  },
  {
    id: "8",
    orderId: "#ORD-1241",
    customer: "Lisa Anderson",
    items: 3,
    total: "$149.97",
    status: "shipped",
    date: "2025-10-17",
  },
];

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const [activeTab, setActiveTab] = useState<"inventory" | "orders">(
    "inventory"
  );
  const [inventoryPage, setInventoryPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState(initialInventoryData);
  const [orderData, setOrderData] = useState(initialOrderData);

  // Pagination logic
  const inventoryPaginated = useMemo(() => {
    const start = (inventoryPage - 1) * ITEMS_PER_PAGE;
    return inventoryData.slice(start, start + ITEMS_PER_PAGE);
  }, [inventoryPage, inventoryData]);

  const ordersPaginated = useMemo(() => {
    const start = (ordersPage - 1) * ITEMS_PER_PAGE;
    return orderData.slice(start, start + ITEMS_PER_PAGE);
  }, [ordersPage, orderData]);

  const inventoryColumns: Column<InventoryItem>[] = [
    { key: "product", label: "Product" },
    { key: "sku", label: "SKU" },
    { key: "stockLevel", label: "Stock Level" },
    { key: "reorderPoint", label: "Reorder Point" },
    {
      key: "status",
      label: "Status",
      render: (value, row) => (
        <StatusDropdown
          status={value}
          options={[
            { value: "ok", label: "✓ Ok", variant: "success" },
            { value: "low-stock", label: "⚠ Low Stock", variant: "warning" },
            { value: "critical", label: "⚠ Critical", variant: "error" },
          ]}
          onChange={(newStatus) => {
            setInventoryData((prev) =>
              prev.map((item) =>
                item.id === row.id
                  ? { ...item, status: newStatus as InventoryItem["status"] }
                  : item
              )
            );
          }}
        />
      ),
    },
  ];

  const orderColumns: Column<OrderItem>[] = [
    { key: "orderId", label: "Order ID" },
    { key: "customer", label: "Customer" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total" },
    {
      key: "status",
      label: "Status",
      render: (value, row) => (
        <StatusDropdown
          status={value}
          options={[
            { value: "pending", label: "Pending", variant: "warning" },
            { value: "processing", label: "Processing", variant: "info" },
            { value: "shipped", label: "Shipped", variant: "info" },
            { value: "delivered", label: "Delivered", variant: "success" },
          ]}
          onChange={(newStatus) => {
            setOrderData((prev) =>
              prev.map((item) =>
                item.id === row.id
                  ? { ...item, status: newStatus as OrderItem["status"] }
                  : item
              )
            );
          }}
        />
      ),
    },
    { key: "date", label: "Date" },
  ];

  const handleAction = (row: InventoryItem | OrderItem) => {
    console.log("Action clicked for:", row);
    // Handle action - could open a modal, navigate, etc.
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 200);
    if (activeTab === "inventory") {
      setInventoryPage(page);
    } else {
      setOrdersPage(page);
    }
  };

  return (
    <main className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your inventory and orders</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border rounded border-white    inline-block ">
          {[
            { id: "inventory", label: "Inventory Management" },
            { id: "orders", label: "Order Processing" },
            { id: "subscription", label: "Subscription Management" },
            { id: "support", label: "Customer Support" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as "inventory" | "orders");
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 200);
              }}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white-500/20 text-white-400 border border-white-500/50"
                  : "text-gray-400 hover:text-gray-300"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="border border-white  rounded-lg bg-black p-4 md:p-6">
          {activeTab === "inventory" && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Inventory Management
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Monitor stock levels and receive reorder alerts
              </p>
              <DataTable
                columns={inventoryColumns}
                data={inventoryPaginated}
                isLoading={isLoading}
                currentPage={inventoryPage}
                totalPages={Math.ceil(inventoryData.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
                onAction={handleAction}
                rowKey="id"
              />
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Order Processing
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                View, fulfill, and track orders
              </p>
              <DataTable
                columns={orderColumns}
                data={ordersPaginated}
                isLoading={isLoading}
                currentPage={ordersPage}
                totalPages={Math.ceil(orderData.length / ITEMS_PER_PAGE)}
                onPageChange={handlePageChange}
                onAction={handleAction}
                rowKey="id"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
