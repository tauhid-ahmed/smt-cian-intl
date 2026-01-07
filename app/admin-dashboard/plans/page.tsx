"use client";

import React from 'react';
import PlanManagement from "@/components/adminDashboard/PlanManagement";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const PlansPage = () => {
    return (
        <div className="space-y-6">
            <DashboardPageHeader
                title="Membership Architecture"
                sub_title="Manage subscription tiers, features, and global pricing configurations"
            />
            <PlanManagement />
        </div>
    );
};

export default PlansPage;