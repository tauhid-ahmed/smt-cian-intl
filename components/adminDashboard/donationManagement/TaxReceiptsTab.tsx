"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NotepadTextDashed } from "lucide-react";
const donations = [
  {
    id: 1,
    donor: "John Smith",
    date: "2024-01-15",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: 2,
    donor: "Sarah Johnson",
    date: "2024-01-14",
    amount: "$150.00",
    status: "Pending",
  },
  {
    id: 3,
    donor: "Michael Brown",
    date: "2024-01-13",
    amount: "$500.00",
    status: "Completed",
  },
  {
    id: 4,
    donor: "Emily Davis",
    date: "2024-01-12",
    amount: "$75.00",
    status: "Failed",
  },
  {
    id: 5,
    donor: "Robert Wilson",
    date: "2024-01-11",
    amount: "$300.00",
    status: "Completed",
  },
];
// Define the form schema with Zod
const receiptFormSchema = z.object({
  donorName: z.string().min(1, "Donor name is required"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid amount"),
  taxYear: z
    .string()
    .min(1, "Tax year is required")
    .regex(/^\d{4}$/, "Please enter a valid year (YYYY)"),
});

type ReceiptFormData = z.infer<typeof receiptFormSchema>;

const TaxReceiptsTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: {
      donorName: "",
      amount: "",
      taxYear: "",
    },
  });

  const onSubmit = (data: ReceiptFormData) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    alert("Receipt generated successfully!");
    reset();
  };

  return (
    <div>
      <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
        <div className="text-left text-white">
          <h1 className="font-semibold text-base sm:text-lg">
            Generate New Receipt
          </h1>
          <h2 className="text-sm text-[#F2F2F2]">
            Create a tax receipt for a donation
          </h2>
        </div>

        {/* Form */}
        <div className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Donor Name Field */}
            <div className="space-y-2">
              <label className="block text-white font-medium text-sm">
                Donor Name
              </label>
              <div className="flex flex-col">
                <input
                  {...register("donorName")}
                  type="text"
                  placeholder="Enter Donor name"
                  className="bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors w-full"
                />
                {errors.donorName && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.donorName.message}
                  </span>
                )}
              </div>
            </div>

            {/* Amount Field */}
            <div className="space-y-2">
              <label className="block text-white font-medium text-sm">
                Amount
              </label>
              <div className="flex flex-col">
                <input
                  {...register("amount")}
                  type="text"
                  placeholder="Enter amount"
                  className="bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors w-full"
                />
                {errors.amount && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.amount.message}
                  </span>
                )}
              </div>
            </div>

            {/* Tax Year Field */}
            <div className="space-y-2">
              <label className="block text-white font-medium text-sm">
                Tax Year
              </label>
              <div className="flex flex-col">
                <input
                  {...register("taxYear")}
                  type="text"
                  placeholder="Enter tax year"
                  className="bg-transparent border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors w-full"
                />
                {errors.taxYear && (
                  <span className="text-red-400 text-xs mt-1">
                    {errors.taxYear.message}
                  </span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 w-full inline-flex items-center gap-2 justify-center">
              <NotepadTextDashed size={18} />
              Generate Receipt
            </button>
          </form>
        </div>

        {/* Recent History */}
        <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full mt-8">
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="text-left text-white">
                <h1 className="font-semibold text-base sm:text-lg">
                  Recent Donation
                </h1>
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
                    placeholder="Search donations..."
                    className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                    <th className="py-4 pr-4">Donor</th>
                    <th className="py-4 pr-4">Date</th>
                    <th className="py-4 pr-4">Amount</th>
                    <th className="py-4 pr-4">Status</th>
                    <th className="py-4 pr-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr
                      key={donation.id}
                      className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                      <td className="py-4 pr-4 text-white text-sm">
                        {donation.donor}
                      </td>
                      <td className="py-4 pr-4 text-white text-sm">
                        {donation.date}
                      </td>
                      <td className="py-4 pr-4 text-white text-sm">
                        {donation.amount}
                      </td>
                      <td className="py-4 pr-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            donation.status === "Completed"
                              ? "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]"
                              : donation.status === "Pending"
                              ? "bg-[#FFF27233] text-[#FFD700] border border-[#FFD700]"
                              : "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]"
                          }`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-end">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 text-white hover:bg-[#414141] rounded transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </button>
                          <button className="p-1.5 text-white hover:bg-[#414141] rounded transition-colors">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card */}
            <div className="md:hidden space-y-3">
              {donations.map((donation) => (
                <div
                  key={donation.id}
                  className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-medium text-sm">
                      {donation.donor}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === "Completed"
                          ? "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]"
                          : donation.status === "Pending"
                          ? "bg-[#FFF27233] text-[#FFD700] border border-[#FFD700]"
                          : "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]"
                      }`}>
                      {donation.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white ml-2">{donation.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white ml-2">{donation.amount}</span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button className="p-1.5 text-white hover:bg-[#414141] rounded transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </button>
                    <button className="p-1.5 text-white hover:bg-[#414141] rounded transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxReceiptsTab;
