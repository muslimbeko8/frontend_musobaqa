"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Group,
  CheckSquare,
  PieChart,
  Briefcase,
  Database,
  Menu,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      title: "Umumiy",
      path: "/",
      icon: <Database className="w-5 h-5" />,
    },
    {
      title: "Block langanar",
      path: "/blocks",
      icon: <CheckSquare className="w-5 h-5" />,
    },
    {
      title: "Managerlar",
      path: "/managers",
      icon: <Group className="w-5 h-5" />,
    },
    {
      title: "Hodimlar",
      path: "/employees",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      title: "Vazifalar",
      path: "/tasks",
      icon: <PieChart className="w-5 h-5" />,
    },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Top AppBar */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm h-14 z-20">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 text-lg font-semibold">
              Тайпро
            </span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-white shadow-lg transition-transform lg:translate-x-0 z-10 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="h-full py-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left px-4 py-3 flex items-center gap-2 transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden z-0"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
