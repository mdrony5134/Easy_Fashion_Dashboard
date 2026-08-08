"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Package, 
  ShoppingBag, 
  ShoppingCart,
  Loader2 
} from "lucide-react";

interface StatsCard {
  title: string;
  value: number;
  icon: string;
  bgColor: string;
}

interface StatsCardsProps {
  stats: StatsCard[];
  isLoading: boolean;
}

const iconMap = {
  users: Users,
  categories: Package,
  products: ShoppingBag,
  orders: ShoppingCart,
};

export default function StatsCards({ stats, isLoading }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap];
        return (
          <Card key={index} className="bg-white shadow-sm border-0 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  {isLoading ? (
                    <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mt-1"></div>
                  ) : (
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value.toLocaleString()}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}