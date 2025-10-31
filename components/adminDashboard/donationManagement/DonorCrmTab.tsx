"use client";

// Mock data for donors
const donors = [
  {
    id: 1,
    name: "John Smith",
    contact: "john.smith@email.com",
    location: "New York, NY",
    totalAmount: "$2,500.00",
    lastDonation: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    contact: "(555) 123-4567",
    location: "Los Angeles, CA",
    totalAmount: "$1,800.00",
    lastDonation: "2024-01-10",
  },
  {
    id: 3,
    name: "Michael Chen",
    contact: "michael.c@company.com",
    location: "Chicago, IL",
    totalAmount: "$3,200.00",
    lastDonation: "2024-01-08",
  },
  {
    id: 4,
    name: "Emily Davis",
    contact: "(555) 987-6543",
    location: "Houston, TX",
    totalAmount: "$950.00",
    lastDonation: "2024-01-12",
  },
  {
    id: 5,
    name: "Robert Wilson",
    contact: "rwilson@email.com",
    location: "Phoenix, AZ",
    totalAmount: "$4,100.00",
    lastDonation: "2024-01-05",
  },
];

// Handle edit function (you can implement your edit logic here)
const handleEdit = (donor) => {
  console.log("Editing donor:", donor);
  // Add your edit modal or navigation logic here
};

const DonorCrmTab = () => {
  return (
    <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-left text-white">
            <h1 className="font-semibold text-base sm:text-lg">
              Donor Management
            </h1>
            <h2 className="text-sm text-[#F2F2F2]">
              View and manage donor information and donation history
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
                placeholder="Search donors..."
                className="bg-[#414141] rounded-[10px] pl-10 pr-4 py-2.5 text-white text-sm font-medium placeholder-[#818181] focus:outline-none focus:border-gray-500 w-full sm:w-72"
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
              Add Donor
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                <th className="py-4 pr-4">Name</th>
                <th className="py-4 pr-4">Contact</th>
                <th className="py-4 pr-4">Location</th>
                <th className="py-4 pr-4">Total Amount</th>
                <th className="py-4 pr-4 text-right">Last Donation</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr
                  key={donor.id}
                  className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                  <td className="py-4 pr-4 text-white text-sm">{donor.name}</td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {donor.contact}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {donor.location}
                  </td>
                  <td className="py-4 pr-4 text-white text-sm">
                    {donor.totalAmount}
                  </td>
                  <td className="py-4 pr-4 text-white text-right text-sm">
                    {donor.lastDonation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card - Improved Responsive Layout */}
        <div className="md:hidden space-y-3">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm truncate">
                    {donor.name}
                  </h3>
                  <p className="text-gray-400 text-xs mt-1 truncate">
                    {donor.contact}
                  </p>
                </div>
                <button
                  className="text-white hover:text-gray-300 ml-2 shrink-0"
                  onClick={() => handleEdit(donor)}>
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

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Location:</span>
                  <span className="text-white text-xs text-right truncate ml-2 max-w-[60%]">
                    {donor.location}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Total Amount:</span>
                  <span className="text-white text-xs font-medium">
                    {donor.totalAmount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">Last Donation:</span>
                  <span className="text-white text-xs">
                    {donor.lastDonation}
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

export default DonorCrmTab;
