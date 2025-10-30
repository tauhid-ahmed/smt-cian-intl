"use client";

import ProductCatalogTab from "@/components/adminDashboard/contentManagement/ProductCatalogTab";
import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/adminDashboard/custom-tabs";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const ContentManagementPage = () => {
  return (
    <>
      <DashboardPageHeader
        title="Analytics & Insights"
        sub_title="Monitor your business performance and customer behavior"
      />

      <div>
        <CustomTabs defaultValue="tab1">
          <CustomTabsList variant="bordered">
            <CustomTabsTrigger value="tab1" variant="bordered">
              Product Catalog
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab2" variant="bordered">
              Artist Profiles
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab3" variant="bordered">
              Review Moderation
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab4" variant="bordered">
              Content Approval
            </CustomTabsTrigger>
          </CustomTabsList>

          <CustomTabsContent value="tab1">
            <ProductCatalogTab />
          </CustomTabsContent>

          <CustomTabsContent value="tab2">advved</CustomTabsContent>

          <CustomTabsContent value="tab3">adadvad</CustomTabsContent>

          <CustomTabsContent value="tab4">adadv</CustomTabsContent>
        </CustomTabs>
      </div>
    </>
  );
};

export default ContentManagementPage;
