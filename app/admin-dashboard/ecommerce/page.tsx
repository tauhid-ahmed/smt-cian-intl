// "use client";

// import {
//   CustomTabs,
//   CustomTabsContent,
//   CustomTabsList,
//   CustomTabsTrigger,
// } from "@/components/adminDashboard/custom-tabs";
// import CustomerSupportTab from "@/components/adminDashboard/ecommerceManagement/CustomerSupportTab";
// import InventoryManagementTab from "@/components/adminDashboard/ecommerceManagement/InventoryManagementTab";
// import OrderProcessingTab from "@/components/adminDashboard/ecommerceManagement/OrderProcessingTab";
// import SubscriptionManagementTab from "@/components/adminDashboard/ecommerceManagement/SubscriptionManagementTab";
// import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

// const EcommerceManagementPage = () => {
//   return (
//     <>
//       <DashboardPageHeader
//         title="E-commerce Management"
//         sub_title="Manage orders, inventory, subscriptions, and customer support"></DashboardPageHeader>

//       <div>
//         <CustomTabs defaultValue="tab1">
//           <CustomTabsList variant="bordered">
//             <CustomTabsTrigger value="tab1" variant="bordered">
//               Order Processing
//             </CustomTabsTrigger>
//             <CustomTabsTrigger value="tab2" variant="bordered">
//               Inventory Management
//             </CustomTabsTrigger>
//             <CustomTabsTrigger value="tab3" variant="bordered">
//               Subscription Management
//             </CustomTabsTrigger>
//             <CustomTabsTrigger value="tab4" variant="bordered">
//               Customer Support
//             </CustomTabsTrigger>
//           </CustomTabsList>

//           <CustomTabsContent value="tab1">
//             <OrderProcessingTab />
//           </CustomTabsContent>

//           <CustomTabsContent value="tab2">
//             <InventoryManagementTab />
//           </CustomTabsContent>

//           <CustomTabsContent value="tab3">
//             <SubscriptionManagementTab />
//           </CustomTabsContent>

//           <CustomTabsContent value="tab4">
//             <CustomerSupportTab />
//           </CustomTabsContent>
//         </CustomTabs>
//       </div>
//     </>
//   );
// };

// export default EcommerceManagementPage;

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/adminDashboard/custom-tabs";
import CustomerSupportTab from "@/components/adminDashboard/ecommerceManagement/CustomerSupportTab";
import InventoryManagementTab from "@/components/adminDashboard/ecommerceManagement/InventoryManagementTab";
import OrderProcessingTab from "@/components/adminDashboard/ecommerceManagement/OrderProcessingTab";
import SubscriptionManagementTab from "@/components/adminDashboard/ecommerceManagement/SubscriptionManagementTab";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const EcommerceManagementPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [open, setOpen] = useState(false);

  const tabs = [
    { value: "tab1", label: "Order Processing" },
    { value: "tab2", label: "Inventory Management" },
    { value: "tab3", label: "Subscription Management" },
    { value: "tab4", label: "Customer Support" },
  ];

  return (
    <>
      <DashboardPageHeader
        title="E-commerce Management"
        sub_title="Manage orders, inventory, subscriptions, and customer support"
      />

      <div className="mt-4">
        <CustomTabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          {/* ===== Mobile Dropdown (visible on sm) ===== */}
          <div className="relative md:hidden mb-4">
            <button
              onClick={() => setOpen(!open)}
              className="flex justify-between items-center w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-[#1A1A1A] shadow-sm"
            >
              {tabs.find((t) => t.value === activeTab)?.label}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <ul className="absolute z-10 mt-1 w-full bg-[#252525] border border-gray-200 rounded-lg shadow-md">
                {tabs.map((tab) => (
                  <li
                    key={tab.value}
                    onClick={() => {
                      setActiveTab(tab.value);
                      setOpen(false);
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${activeTab === tab.value ? "bg-[#1A1A1A] font-medium" : ""
                      }`}
                  >
                    {tab.label}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ===== Desktop Tabs (md and up) ===== */}
          <div className="hidden md:block">
            <CustomTabsList variant="bordered">
              {tabs.map((tab) => (
                <CustomTabsTrigger
                  key={tab.value}
                  value={tab.value}
                  variant="bordered"
                >
                  {tab.label}
                </CustomTabsTrigger>
              ))}
            </CustomTabsList>
          </div>

          {/* ===== Tab Contents ===== */}
          <CustomTabsContent value="tab1">
            <OrderProcessingTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab2">
            <InventoryManagementTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab3">
            <SubscriptionManagementTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab4">
            <CustomerSupportTab />
          </CustomTabsContent>
        </CustomTabs>
      </div>
    </>
  );
};

export default EcommerceManagementPage;

