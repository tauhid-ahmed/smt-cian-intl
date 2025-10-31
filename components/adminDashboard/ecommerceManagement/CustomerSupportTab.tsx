import { toast } from "sonner";
import { MetricsGrid } from "../metrics-grid";
import { Eye } from "lucide-react";

const CustomerSupportTab = () => {
  // Mock metrics data
  const metricsData = [
    { title: "Open Tickets", value: "1,234" },
    { title: "Avg. Response Time", value: "2.5h" },
    { title: "Resolution Rate", value: "94%" },
    { title: "Customer Satisfaction", value: "4.6/5" },
  ];

  // Mock data for customer support tickets
  const supportTickets = [
    {
      id: "TKT-001",
      customer: "John Smith",
      email: "john.smith@email.com",
      subject: "Login issues",
      priority: "High",
      status: "Open",
      date: "2024-01-15",
    },
    {
      id: "TKT-002",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      subject: "Payment failed",
      priority: "High",
      status: "In Progress",
      date: "2024-01-14",
    },
    {
      id: "TKT-003",
      customer: "Mike Chen",
      email: "mike.chen@email.com",
      subject: "Feature request",
      priority: "Low",
      status: "Pending",
      date: "2024-01-13",
    },
    {
      id: "TKT-004",
      customer: "Emily Davis",
      email: "emily.davis@email.com",
      subject: "Account verification",
      priority: "Medium",
      status: "Resolved",
      date: "2024-01-12",
    },
    {
      id: "TKT-005",
      customer: "Robert Wilson",
      email: "robert.w@email.com",
      subject: "Bug report",
      priority: "High",
      status: "Open",
      date: "2024-01-11",
    },
    {
      id: "TKT-006",
      customer: "Lisa Brown",
      email: "lisa.brown@email.com",
      subject: "Billing inquiry",
      priority: "Medium",
      status: "Closed",
      date: "2024-01-10",
    },
  ];

  const handleEyeByStatus = (id: string) => {
    const ticket = supportTickets.find((t) => t.id === id);
    if (!ticket) return;

    let message = "";
    let variant: "success" | "warning" | "info" | "error" = "info";

    switch (ticket.status) {
      case "Open":
        message = `Ticket ${ticket.id} is currently open and awaiting assignment.`;
        variant = "warning";
        break;
      case "In Progress":
        message = `Ticket ${ticket.id} is being worked on by our support team.`;
        variant = "info";
        break;
      case "Pending":
        message = `Ticket ${ticket.id} is pending customer response.`;
        variant = "warning";
        break;
      case "Resolved":
        message = `Ticket ${ticket.id} has been resolved successfully.`;
        variant = "success";
        break;
      case "Closed":
        message = `Ticket ${ticket.id} has been closed.`;
        variant = "info";
        break;
      default:
        message = `Ticket ${ticket.id} status: ${ticket.status}`;
        variant = "info";
    }

    // Trigger toast dynamically with proper variant
    toast[variant](message, {
      description: `Customer: ${ticket.customer} | Subject: ${ticket.subject}`,
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]";
      case "In Progress":
        return "bg-[#FFF17233] text-[#FFD700] border border-[#FFD700]";
      case "Pending":
        return "bg-[#72BFFF33] text-[#007BFF] border border-[#007BFF]";
      case "Resolved":
        return "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]";
      case "Closed":
        return "bg-[#A0A0A033] text-[#808080] border border-[#808080]";
      default:
        return "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]";
    }
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]";
      case "Medium":
        return "bg-[#FFF17233] text-[#FFD700] border border-[#FFD700]";
      case "Low":
        return "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]";
      default:
        return "bg-[#A0A0A033] text-[#808080] border border-[#808080]";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {metricsData.map((metric, index) => (
          <MetricsGrid key={index} title={metric.title} value={metric.value} />
        ))}
      </div>

      <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left text-white">
              <h1 className="font-semibold text-base sm:text-lg">
                Customer Support Tickets
              </h1>
              <h2 className="text-sm text-[#F2F2F2]">
                Manage and track customer support requests
              </h2>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                  <th className="py-4 pr-4">Ticket ID</th>
                  <th className="py-4 pr-4">Customer</th>
                  <th className="py-4 pr-4">Subject</th>
                  <th className="py-4 pr-4">Priority</th>
                  <th className="py-4 pr-4">Status</th>
                  <th className="py-4 pr-4">Date</th>
                  <th className="py-4 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-[#EFEFEF] hover:bg-[#414141]/40 transition-colors">
                    <td className="py-4 pr-4 text-white text-sm font-medium">
                      {ticket.id}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      <div>
                        <div className="font-medium">{ticket.customer}</div>
                        <div className="text-gray-400 text-xs">
                          {ticket.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {ticket.subject}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityStyles(
                          ticket.priority
                        )}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                          ticket.status
                        )}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {formatDate(ticket.date)}
                    </td>
                    <td className="pl-4 pt-4 pb-4 flex justify-end">
                      <button
                        className="text-white hover:text-gray-300 transition-colors"
                        onClick={() => handleEyeByStatus(ticket.id)}>
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card */}
          <div className="md:hidden space-y-3">
            {supportTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium text-sm">
                      {ticket.id}
                    </h3>
                    <p className="text-gray-400 text-xs">{ticket.customer}</p>
                  </div>
                  <button
                    className="text-white hover:text-gray-300"
                    onClick={() => handleEyeByStatus(ticket.id)}>
                    <Eye size={16} />
                  </button>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Subject:</span>
                    <span className="text-white ml-2">{ticket.subject}</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="text-gray-400">Priority:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${getPriorityStyles(
                          ticket.priority
                        )}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusStyles(
                          ticket.status
                        )}`}>
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Date:</span>
                    <span className="text-white ml-2">
                      {formatDate(ticket.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportTab;
