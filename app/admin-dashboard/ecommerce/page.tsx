"use client";

import ContentApprovalTab from "@/components/adminDashboard/contentManagement/ContentApprovalTab";
import ReviewModerationTab from "@/components/adminDashboard/contentManagement/ReviewModerationTab";
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/adminDashboard/custom-tabs";
import InventoryManagementTab from "@/components/adminDashboard/ecommerceManagement/InventoryManagementTab";
import OrderProcessingTab from "@/components/adminDashboard/ecommerceManagement/OrderProcessingTab";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const EcommerceManagementPage = () => {
  return (
    <>
      <DashboardPageHeader
        title="E-commerce Management"
        sub_title="Manage orders, inventory, subscriptions, and customer support"></DashboardPageHeader>

      <div>
        <CustomTabs defaultValue="tab1">
          <CustomTabsList variant="bordered">
            <CustomTabsTrigger value="tab1" variant="bordered">
              Order Processing
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab2" variant="bordered">
              Inventory Management
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab3" variant="bordered">
              Subscription Management
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab4" variant="bordered">
              Customer Support
            </CustomTabsTrigger>
          </CustomTabsList>

          <CustomTabsContent value="tab1">
            <OrderProcessingTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab2">
            <InventoryManagementTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab3">
            <ReviewModerationTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab4">
            <ContentApprovalTab />
          </CustomTabsContent>
        </CustomTabs>
      </div>
    </>
  );
};

export default EcommerceManagementPage;
