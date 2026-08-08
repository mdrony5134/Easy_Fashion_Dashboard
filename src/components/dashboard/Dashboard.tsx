"use client";

import React from "react";
import { useGetDashboardSummaryQuery } from "@/redux/api/dashboardApi";
import StatsCards from "./StatsCards";
import FinancialChart from "./FinancialChart";
import OrderPieChart from "./OrderPieChart";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardSummaryQuery({});

  const summary = dashboardData?.data;
  const revenueChartData = summary?.dashboardOverviewData?.revenueChart?.chartData || [];
  const ringChartData = summary?.dashboardOverviewData?.ringChartData || {};

  // Stats data
  const statsData = [
    {
      title: "Total Users",
      value: summary?.totalUsers || 0,
      icon: "users",
      bgColor: "bg-blue-500",
    },
    {
      title: "Total Categories",
      value: summary?.totalCategories || 0,
      icon: "categories",
      bgColor: "bg-purple-500",
    },
    {
      title: "Total Products",
      value: summary?.totalProducts || 0,
      icon: "products",
      bgColor: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: summary?.totalOrders || 0,
      icon: "orders",
      bgColor: "bg-orange-500",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <StatsCards stats={statsData} isLoading={isLoading} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
        <FinancialChart
          data={revenueChartData}
          isLoading={isLoading}
        />
        <OrderPieChart
          data={ringChartData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}