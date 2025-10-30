import {
  CustomTabs,
  CustomTabsContent,
  CustomTabsList,
  CustomTabsTrigger,
} from "@/components/adminDashboard/custom-tabs";
import CustomerAnalyticsTabContent from "@/components/adminDashboard/overview/CustomerAnalyticsTabContent";
import ReviewAnalyticsTabContent from "@/components/adminDashboard/overview/ReviewAnalyticsTabContent";
import SalesDashboardTabContent from "@/components/adminDashboard/overview/SalesDashboardTabContent";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const AdminOverviewPage = () => {
  return (
    <div>
      <DashboardPageHeader
        title="Analytics & Insights"
        sub_title="Monitor your business performance and customer behavior"
      />

      <div>
        <CustomTabs defaultValue="tab1">
          <CustomTabsList variant="bordered">
            <CustomTabsTrigger value="tab1" variant="bordered">
              Sales Dashboard
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab2" variant="bordered">
              Customer Analytics
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab3" variant="bordered">
              Review Analytics
            </CustomTabsTrigger>
            <CustomTabsTrigger value="tab4" variant="bordered">
              Performance Metric
            </CustomTabsTrigger>
          </CustomTabsList>

          <CustomTabsContent value="tab1">
            <SalesDashboardTabContent />
          </CustomTabsContent>

          <CustomTabsContent value="tab2">
            <CustomerAnalyticsTabContent />
          </CustomTabsContent>

          <CustomTabsContent value="tab3">
            <ReviewAnalyticsTabContent />
          </CustomTabsContent>
        </CustomTabs>
      </div>
    </div>
  );
};

export default AdminOverviewPage;
