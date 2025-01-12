import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Layout = () => {
  const [isOpen] = useState(true);
  const router = useRouter();

  const navItems = [
    {
      title: "Umumiy",
      path: "/",
      icon: "📊",
    },
    {
      title: "Block langanar",
      path: "/blocks",
      icon: "📋",
    },
    {
      title: "Managerlar",
      path: "/managers",
      icon: "👥",
    },
    {
      title: "Hodimlar",
      path: "/employees",
      icon: "👤",
    },
    {
      title: "Vazifalar",
      path: "/tasks",
      icon: "✓",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div
        className={`w-64 min-h-screen fixed left-0 top-0 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="p-4 bg-white border-b">
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
            <span className="text-emerald-500 text-xl font-semibold">
              Тайпро
            </span>
          </div>
        </div>

        <div className="bg-gray-50 h-full">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200 ${
                router.asPath === item.path ? "bg-gray-200" : ""
              }`}
            >
              <span className="text-gray-400 w-6">{item.icon}</span>
              <span className="text-gray-600 ml-2">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-64 flex-1">
        {/* Top Navigation Bar */}
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-100" />
          <div className="bg-white w-full h-16 border-b flex justify-end items-center px-4">
            <div>
              <div className="text-gray-600 text-sm">manager@mail.ru</div>
              <div className="text-gray-400 text-sm">
                Администратор компании
              </div>
            </div>
          </div>
        </div>

        {/* Home Page Content */}
        {router.asPath === "/" && (
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">
              Welcome to Тайпро
            </h1>
            <p className="text-gray-600">
              Ushbu platforma orqali kompaniyangizni boshqarishingiz va barcha
              jarayonlarni nazorat qilish imkoniyatiga egasiz.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold text-emerald-500">
                  📊 Umumiy
                </h2>
                <p className="text-gray-600 mt-2">
                  Tizimning umumiy ko'rsatkichlari va tahlilini ko'rish.
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold text-blue-500">
                  📋 Block langanar
                </h2>
                <p className="text-gray-600 mt-2">
                  Blocklangan foydalanuvchilar haqida ma'lumot.
                </p>
              </div>
              <div className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold text-purple-500">
                  👥 Managerlar
                </h2>
                <p className="text-gray-600 mt-2">
                  Tizimdagi managerlar ro'yxati.
                </p>
              </div>
            </div>
          </div>
        )}

        {router.asPath !== "/" && (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6">
            <div className="w-32 h-32 mb-4 text-gray-200">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <path
                  d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 2v7h7M8 13h8M8 17h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">Ma'lumot yo'q</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
