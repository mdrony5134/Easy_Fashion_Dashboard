import React from "react";
import { AttributeType } from "@/types/attributeTypes";

interface AttributesTabsProps {
  activeTab: AttributeType;
  onTabChange: (tab: AttributeType) => void;
  tabs: AttributeType[];
}

export default function AttributesTabs({ activeTab, onTabChange, tabs }: AttributesTabsProps) {
  return (
    <div className="flex overflow-x-auto pb-2 border-b border-gray-200">
      <div className="flex gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-2.5 rounded-t-lg font-medium text-sm transition-colors ${
              activeTab === tab
                ? "bg-white text-brand-green border-t border-x border-gray-200 shadow-[0_-2px_4px_rgba(0,0,0,0.02)]"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            {tab}s
          </button>
        ))}
      </div>
    </div>
  );
}