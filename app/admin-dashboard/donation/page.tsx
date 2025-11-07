"use client ";

import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/adminDashboard/custom-tabs";
import DonorCrmTab from "@/components/adminDashboard/donationManagement/DonorCrmTab";
import OverviewTab from "@/components/adminDashboard/donationManagement/OverviewTab";
import ReviewModerationTab from "@/components/adminDashboard/donationManagement/ReviewModerationTab";
import TaxReceiptsTab from "@/components/adminDashboard/donationManagement/TaxReceiptsTab";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const DonationManagementPage = () => {
  return (
    <>
      <DashboardPageHeader
        title="Analytics & Insights"
        sub_title="Monitor your business performance and customer behavior"
      />

      <CustomTabs defaultValue="tab1">
        <CustomTabsList variant="bordered">
          <CustomTabsTrigger value="tab1" variant="bordered">
            Overview
          </CustomTabsTrigger>
          <CustomTabsTrigger value="tab2" variant="bordered">
            Review Moderation
          </CustomTabsTrigger>
          <CustomTabsTrigger value="tab3" variant="bordered">
            Tax Receipts
          </CustomTabsTrigger>
          <CustomTabsTrigger value="tab4" variant="bordered">
            Donor CRM
          </CustomTabsTrigger>
        </CustomTabsList>

        <CustomTabsContent value="tab1">
          <OverviewTab />
        </CustomTabsContent>

        <CustomTabsContent value="tab2">
          <ReviewModerationTab />
        </CustomTabsContent>

        <CustomTabsContent value="tab3">
          <TaxReceiptsTab />
        </CustomTabsContent>

        <CustomTabsContent value="tab4">
          <DonorCrmTab />
        </CustomTabsContent>
      </CustomTabs>
    </>
  );
};

export default DonationManagementPage;
