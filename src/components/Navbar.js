import React, { useState } from "react";
import { useRouter } from "next/navigation";
import GroupIcon from "@mui/icons-material/Group";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PieChartIcon from "@mui/icons-material/PieChart";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import StorageIcon from "@mui/icons-material/Storage";

const Appbar = () => {
  const [activePath, setActivePath] = useState("/"); // Faol bo'limni kuzatish uchun state
  const router = useRouter();

  const navItems = [
    {
      title: "Umumiy",
      path: "/",
      icon: <StorageIcon />,
    },
    {
      title: "Block langanar",
      path: "/blocks",
      icon: <CheckBoxIcon />,
    },
    {
      title: "Managerlar",
      path: "/managers",
      icon: <GroupIcon />,
    },
    {
      title: "Hodimlar",
      path: "/employees",
      icon: <BusinessCenterIcon />,
    },
    {
      title: "Vazifalar",
      path: "/tasks",
      icon: <PieChartIcon />,
    },
  ];

  const handleNavigation = (path) => {
    setActivePath(path); // Faol bo'limni yangilash
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex">
        <div className={`w-64 h-screen fixed left-0 top-0 bg-white shadow-lg`}>
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full text-emerald-500"
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

          <div className="h-full">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`w-full text-left cursor-pointer px-4 py-3 flex items-center rounded-lg focus:outline-none transition-all 
                  ${
                    activePath === item.path
                      ? "bg-gray-200 text-emerald-500 opacity-100"
                      : "hover:bg-gray-200 hover:text-emerald-500 opacity-60"
                  }
                `}
              >
                <span className={`w-6 transition-colors `}>{item.icon}</span>
                <span
                  className={`ml-2 ${
                    activePath === item.path
                      ? "text-emerald-500"
                      : "text-gray-500"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
