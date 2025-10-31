"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, Ban, Search, User2 } from "lucide-react";
import { usersData, User } from "@/data/usersData";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  // Filter users based on search term
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Status badge components
  const KycBadge = ({ status }: { status: User["kycStatus"] }) => {
    const styles = {
      verified: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200"
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  const AccountStatusBadge = ({ status }: { status: User["accountStatus"] }) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      suspended: "bg-red-100 text-red-800 border-red-200"
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  // Format NID to show only last 5 digits
  const formatNID = (nid: string) => {
    return `***${nid.slice(-5)}`;
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900">
        View and Manage User Accounts
      </h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by name, username, or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page when searching
          }}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Container with shadow */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4">
                  User
                </TableHead>
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4">
                  Contact
                </TableHead>
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4">
                  NID
                </TableHead>
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4">
                  KYC Status
                </TableHead>
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4">
                  Account Status
                </TableHead>
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4">
                  Wallet Balance
                </TableHead>
                <TableHead className="text-gray-900 uppercase text-xs font-semibold py-4 px-4 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors border-0"
                >
                  {/* User Column */}
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Contact Column */}
                  <TableCell className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{user.email}</p>
                      <p className="text-sm text-gray-500">{user.phone}</p>
                    </div>
                  </TableCell>

                  {/* NID Column */}
                  <TableCell className="text-sm text-gray-900 py-4 px-4">
                    {formatNID(user.nid)}
                  </TableCell>

                  {/* KYC Status Column */}
                  <TableCell className="py-4 px-4">
                    <KycBadge status={user.kycStatus} />
                  </TableCell>

                  {/* Account Status Column */}
                  <TableCell className="py-4 px-4">
                    <AccountStatusBadge status={user.accountStatus} />
                  </TableCell>

                  {/* Wallet Balance Column */}
                  <TableCell className="text-sm font-medium text-gray-900 py-4 px-4">
                    ${user.walletBalance.toFixed(2)}
                  </TableCell>

                  {/* Actions Column */}
                  <TableCell className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/accounts/${user.id}`}
                        className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View User"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Block User"
                        onClick={() => console.log(`Block user: ${user.id}`)}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-white border-t border-gray-200">
          <div className="text-sm text-gray-700">
            {startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm border rounded-md transition-colors shadow-sm ${
                  currentPage === page
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}