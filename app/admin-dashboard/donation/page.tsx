"use client";
import OverviewTab from "@/components/adminDashboard/donationManagement/OverviewTab";
// import { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import {
//   CustomTabs,
//   CustomTabsContent,
//   CustomTabsList,
//   CustomTabsTrigger,
// } from "@/components/adminDashboard/custom-tabs";
// import OverviewTab from "@/components/adminDashboard/donationManagement/OverviewTab";
// import TaxReceiptsTab from "@/components/adminDashboard/donationManagement/TaxReceiptsTab";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const DonationManagementPage = () => {
  // const [activeTab, setActiveTab] = useState("tab1");
  // const [open, setOpen] = useState(false);

  // const tabs = [
  //   { value: "tab1", label: "Overview" },
  //   { value: "tab3", label: "Tax Receipts" },
  // ];

  return (
    <>
      <DashboardPageHeader
        title="Analytics & Insights"
        sub_title="Monitor your business performance and customer behavior"
      />

      <div className="mt-4">
        <OverviewTab />

        {/* <CustomTabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
   
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


          <CustomTabsContent value="tab1">
            <OverviewTab />
          </CustomTabsContent>

      

          <CustomTabsContent value="tab3">
            <TaxReceiptsTab />
          </CustomTabsContent>

        </CustomTabs> */}
      </div>
    </>
  );
};

export default DonationManagementPage;
