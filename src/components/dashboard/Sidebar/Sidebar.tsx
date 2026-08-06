"use client";

import logo from "@/assets/logo.webp";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Users,
  X,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  onCloseClick?: () => void;
}

interface DecodedToken {
  role: string;
  exp: number;
}

const Sidebar = ({ onCloseClick }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const menuItems = [
    {
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
    {
      href: "/admin/products",
      icon: Package,
      label: "Products",
      roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
    {
      href: "/admin/attributes",
      icon: Tags,
      label: "Attributes",
      roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
    {
      href: "/admin/order-list",
      icon: FileText,
      label: "Order List",
      roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
    {
      href: "/admin/users",
      icon: Users,
      label: "User Management",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      href: "/admin/settings",
      icon: Settings,
      label: "Settings",
      roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"],
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !role || item.roles.includes(role),
  );

  const handleLogout = () => {
    Cookies.remove("token");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="relative">
      <aside className="w-full lg:w-72 h-screen bg-white  flex flex-col">
        <button
          onClick={onCloseClick}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="p-6 ">
          <div className="flex items-center justify-center">
            <Image className="w-[160px] object-contain" src={logo} alt="logo" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base  transition-colors ${
                      isActive
                        ? "bg-brand-red text-white font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={onCloseClick}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
