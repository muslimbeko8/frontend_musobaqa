"use client";

import React from "react";
import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Appbar";
import StoreProvider from "./storeProvider";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="min-h-screen bg-gray-50">
            {!isLoginPage && <Navbar />}
            <main
              className={`${
                !isLoginPage ? "lg:ml-64 pt-14" : ""
              } min-h-screen transition-all duration-300 p-4`}
            >
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
