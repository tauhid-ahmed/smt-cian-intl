import { toast } from "sonner";
import { MetricsGrid } from "../metrics-grid";
import { Eye } from "lucide-react"; // Assuming you're using lucide-react for icons

const SubscriptionManagementTab = () => {
  // Mock metrics data
  const metricsData = [
    { title: "Total Subscribers", value: "1,234" },
    { title: "Active Subscriptions", value: "987" },
    { title: "Monthly Revenue", value: "$12,456" },
  ];

  // Mock subscription data
  const subscriptions = [
    {
      id: "1",
      customer: "John Smith",
      email: "john.smith@email.com",
      tier: "Premium",
      amount: "$29.99",
      nextBilling: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: "2",
      customer: "Sarah Johnson",
      email: "sarah.j@email.com",
      tier: "Basic",
      amount: "$9.99",
      nextBilling: "Jan 18, 2024",
      status: "Active",
    },
    {
      id: "3",
      customer: "Mike Chen",
      email: "mike.chen@email.com",
      tier: "Enterprise",
      amount: "$99.99",
      nextBilling: "Jan 20, 2024",
      status: "Pending",
    },
    {
      id: "4",
      customer: "Emily Davis",
      email: "emily.davis@email.com",
      tier: "Premium",
      amount: "$29.99",
      nextBilling: "Jan 22, 2024",
      status: "Cancelled",
    },
    {
      id: "5",
      customer: "Alex Rodriguez",
      email: "alex.r@email.com",
      tier: "Basic",
      amount: "$9.99",
      nextBilling: "Jan 25, 2024",
      status: "Active",
    },
  ];

  const handleEyeByStatus = (id: string) => {
    const subscription = subscriptions.find((s) => s.id === id);
    if (!subscription) return;

    let message = "";
    let variant: "success" | "warning" | "info" | "error" = "info";

    switch (subscription.status) {
      case "Pending":
        message = `${subscription.customer}'s subscription is pending activation.`;
        variant = "warning";
        break;
      case "Active":
        message = `${subscription.customer}'s subscription is active and in good standing.`;
        variant = "success";
        break;
      case "Cancelled":
        message = `${subscription.customer}'s subscription has been cancelled.`;
        variant = "error";
        break;
      case "Suspended":
        message = `${subscription.customer}'s subscription is temporarily suspended.`;
        variant = "warning";
        break;
      default:
        message = `${subscription.customer}'s subscription status: ${subscription.status}`;
        variant = "info";
    }

    // Trigger toast dynamically with proper variant
    toast[variant](message);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]";
      case "Pending":
        return "bg-[#FFF17233] text-[#FFD700] border border-[#FFD700]";
      case "Cancelled":
        return "bg-[#FF727233] text-[#FF0000] border border-[#FF0000]";
      case "Suspended":
        return "bg-[#FFB17233] text-[#FF8C00] border border-[#FF8C00]";
      default:
        return "bg-[#89FF7233] text-[#22FF00] border border-[#22FF00]";
    }
  };

  return (
    <div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metricsData.map((metric, index) => (
          <MetricsGrid key={index} title={metric.title} value={metric.value} />
        ))}
      </div>

      <div className="bg-transparent border border-white rounded-xl p-3 sm:p-5 w-full mt-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-left text-white">
              <h1 className="font-semibold text-base sm:text-lg">
                Subscription Management
              </h1>
              <h2 className="text-sm text-[#F2F2F2]">
                Manage member tiers, billing, and cancellations
              </h2>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white text-base font-semibold border-b border-[#EFEFEF]">
                  <th className="py-4 pr-4">Customer</th>
                  <th className="py-4 pr-4">Tier</th>
                  <th className="py-4 pr-4">Amount</th>
                  <th className="py-4 pr-4">Next Billing</th>
                  <th className="py-4 pr-4">Status</th>
                  <th className="py-4 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr
                    key={subscription.id}
                    className="border-b border-[#EFEFEF] hover:bg-[#414141]/40">
                    <td className="py-4 pr-4 text-white text-sm">
                      <div>
                        <div className="font-medium">
                          {subscription.customer}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {subscription.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {subscription.tier}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {subscription.amount}
                    </td>
                    <td className="py-4 pr-4 text-white text-sm">
                      {subscription.nextBilling}
                    </td>
                    <td className="py-4 pr-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                          subscription.status
                        )}`}>
                        {subscription.status}
                      </span>
                    </td>
                    <td className="pl-4 pt-4 pb-4 flex justify-end">
                      <button
                        className="text-white hover:text-gray-300 transition-colors"
                        onClick={() => handleEyeByStatus(subscription.id)}>
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
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-white font-medium text-sm">
                      {subscription.customer}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {subscription.email}
                    </p>
                  </div>
                  <button
                    className="text-white hover:text-gray-300"
                    onClick={() => handleEyeByStatus(subscription.id)}>
                    <Eye size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Tier:</span>
                    <span className="text-white ml-2">{subscription.tier}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Amount:</span>
                    <span className="text-white ml-2">
                      {subscription.amount}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Next Billing:</span>
                    <span className="text-white ml-2">
                      {subscription.nextBilling}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusStyles(
                        subscription.status
                      )}`}>
                      {subscription.status}
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

export default SubscriptionManagementTab;
