/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import d1 from "@/assets/dashboard/d1.svg";
import d2 from "@/assets/dashboard/d2.svg";
import d4 from "@/assets/dashboard/d4.svg";
import reverse from "@/assets/dashboard/reverse-withdrawal.svg";
import { Card, CardContent } from "@/components/ui/card";

import { Loader2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface userDataTypes {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | StaticImageData;
  phone: string;
  email: string;
}

// Custom label function for Pie Chart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {value}
    </text>
  );
};

export default function Dashboard() {
  // Static mock dashboard overview data
  const summary = {
    totalRevenue: 45000,
    deliveredOrders: 1200,
    totalCustomers: 850,
    totalOrders: 1500,
  };

  const usersResponse = {
    lastTenUsers: [
      { id: "1", firstName: "Alice", lastName: "Johnson", profileImage: "", phone: "+1 234 567 890", email: "alice@example.com" },
      { id: "2", firstName: "Bob", lastName: "Smith", profileImage: "", phone: "+1 987 654 321", email: "bob@example.com" },
      { id: "3", firstName: "Charlie", lastName: "Brown", profileImage: "", phone: "+1 555 123 456", email: "charlie@example.com" },
    ],
    chartData: [
      { label: "Jan", value: 1000000 },
      { label: "Feb", value: 1200000 },
      { label: "Mar", value: 900000 },
      { label: "Apr", value: 1500000 },
    ],
  };

  const dashboardOverviewData = {
    revenueChart: {
      chartData: [
        { label: "Jan", totalRevenue: 1000, delivered: 800, cancelled: 50 },
        { label: "Feb", totalRevenue: 1200, delivered: 900, cancelled: 60 },
        { label: "Mar", totalRevenue: 900, delivered: 700, cancelled: 40 },
        { label: "Apr", totalRevenue: 1500, delivered: 1200, cancelled: 80 },
      ]
    },
    ringChartData: {
      pending: 100,
      inRoute: 50,
      delivered: 1200,
      cancelled: 150,
    }
  };

  // sumary data
  const statsData = [
    {
      title: "Total Revenue",
      value: summary?.totalRevenue,
      icon: reverse,
      bgColor: "bg-brand-yellow",
      iconColor: "text-white",
    },
    {
      title: "Received orders",
      value: summary?.deliveredOrders,
      icon: d2,
      bgColor: "bg-brand-yellow",
      iconColor: "text-white",
    },
    {
      title: "Total Customer",
      value: summary?.totalCustomers,
      icon: d1,
      bgColor: "bg-brand-yellow",
      iconColor: "text-white",
    },
    {
      title: "Total Order",
      value: summary?.totalOrders,
      icon: d4,
      bgColor: "bg-brand-yellow",
      iconColor: "text-white",
    },
  ];

  // finicial data

  const chartData = dashboardOverviewData?.revenueChart;

  const financialData = chartData?.chartData;

  // pie chart data

  const pieChartData = dashboardOverviewData?.ringChartData;

  const pieData = [
    { name: "Pending", value: pieChartData?.pending, color: "#ECCD3E" },
    { name: "InRoute", value: pieChartData?.inRoute, color: "#3b82f6" },
    { name: "Delivered", value: pieChartData?.delivered, color: "#4CAF50" },
    { name: "Cancelled", value: pieChartData?.cancelled, color: "#E53935" },
  ];

  // const user data

  const userData = usersResponse?.lastTenUsers.slice(0,3);

  // cash flow chart

  const cashFlowData = usersResponse?.chartData;

  // loaing effect



  return (
    <div>
      <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm border-0">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Image
                      className="w-6 h-6 object-contain"
                      src={stat.icon}
                      width={24}
                      height={24}
                      alt="icon"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Financial Highlight Chart */}
          <Card className="lg:col-span-2 bg-white shadow-sm border-0">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg md:text-[20px] font-semibold text-default mb-4 sm:mb-0">
                  Financial Highlight
                </h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-brand-yellow rounded-[4px]"></div>
                    <span className="text-grey">Total Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-brand-green rounded-[4px]"></div>
                    <span className="text-grey">Delivered Order</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-brand-red rounded-[4px]"></div>
                    <span className="text-grey">Cancel order</span>
                  </div>
                </div>
              </div>
              <div className="h-64 md:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={financialData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      className="text-xs font-medium text-default"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-xs font-medium text-default"
                      tickFormatter={(revenue) => `৳${revenue}`}
                    />
                    <Bar
                      dataKey="totalRevenue"
                      fill="#ECCD3E"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="delivered"
                      fill="#4CAF50"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="cancelled"
                      fill="#E53935"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Total Order
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart width={180}>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      paddingAngle={0}
                      dataKey="value"
                      labelLine={false}
                      label={renderCustomizedLabel}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* User Management Table */}
          <Card className="bg-white shadow-sm border-0">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                User management
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">
                        Name
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 hidden sm:table-cell">
                        Phone Number
                      </th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600 hidden md:table-cell">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData?.map((user: userDataTypes) => (
                      <tr key={user.id} className="border-b border-gray-50">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={user.profileImage || "/placeholder.svg"}
                              alt={user.lastName}
                              className="w-10 h-10 rounded-full object-cover"
                              width={40}
                              height={40}
                            />
                            <div>
                              <p className="font-medium text-gray-900">
                                {user.firstName} {user.lastName}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-gray-600 hidden sm:table-cell">
                          {user.phone || "N/A"}
                        </td>
                        <td className="py-4 text-gray-600 hidden md:table-cell">
                          {user.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Chart */}
          <Card className="bg-white shadow-sm border-0 max-h-fit">
            <CardContent className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                User Flow
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={cashFlowData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="label"
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      className="text-xs"
                      tickFormatter={(value) =>
                        `৳${(value / 1000000).toFixed(1)}`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4CAF50"
                      strokeWidth={3}
                      dot={false}
                    />
                    {/* <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={false}
                    /> */}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Net Cash</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Cash Balance</span>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
