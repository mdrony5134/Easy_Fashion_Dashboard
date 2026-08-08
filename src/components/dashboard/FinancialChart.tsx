"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

interface FinancialChartProps {
  data: Array<{
    label: string;
    totalRevenue: number;
    delivered: number;
    cancelled: number;
  }>;
  isLoading: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            {item.name}: ৳{item.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function FinancialChart({ data, isLoading }: FinancialChartProps) {


  const hasData = data.some(item => 
    item.totalRevenue > 0 || item.delivered > 0 || item.cancelled > 0
  );

  return (
    <Card className="lg:col-span-2 bg-white shadow-sm border-0">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg md:text-[20px] font-semibold text-gray-900 mb-4 sm:mb-0">
            Financial Highlight
          </h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ECCD3E] rounded-[4px]"></div>
              <span className="text-gray-600">Total Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#4CAF50] rounded-[4px]"></div>
              <span className="text-gray-600">Delivered Order</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#E53935] rounded-[4px]"></div>
              <span className="text-gray-600">Cancel Order</span>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="h-64 md:h-80 bg-gray-100 rounded-lg animate-pulse"></div>
        ) : !hasData ? (
          <div className="flex items-center justify-center h-64 md:h-80 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">No data available for the selected period</p>
          </div>
        ) : (
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  className="text-xs font-medium text-gray-600"
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  className="text-xs font-medium text-gray-600"
                  tickFormatter={(value) => `৳${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar
                  dataKey="totalRevenue"
                  name="Total Revenue"
                  fill="#ECCD3E"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  barSize={20}
                />
                <Bar
                  dataKey="delivered"
                  name="Delivered"
                  fill="#4CAF50"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  barSize={20}
                />
                <Bar
                  dataKey="cancelled"
                  name="Cancelled"
                  fill="#E53935"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}