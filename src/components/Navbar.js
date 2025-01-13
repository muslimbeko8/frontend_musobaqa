import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Group,
  CheckSquare,
  PieChart,
  Briefcase,
  Database,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

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
  };

  return (
    <aside className="flex h-screen bg-gray-100">
      <div className="w-64 h-screen fixed left-0 top-0 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-full h-full text-emerald-500"
                aria-hidden="true"
              >
                <path
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-emerald-500 text-xl font-semibold select-none">
              Тайпро
            </span>
          </div>
        </div>

        <nav className="h-full py-2">
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
      </div>
    </aside>
  );
};

export default Navbar;
