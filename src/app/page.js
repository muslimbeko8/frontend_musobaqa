"use client";
import HomePage from "@/components/home";
import { useAuth } from "@/hooks/auth";
import StorefrontIcon from "@mui/icons-material/Storefront";
export default function Home() {
  useAuth();

  return (
    <>
      {/* <div className="flex mt-[350px] flex-col items-center justify-center h-full">
        <StorefrontIcon
          style={{
            fontSize: "100px",
            color: "#E0E0E0",
          }}
        />
        <p className="text-gray-500 mt-4 text-lg">Ma'lumot yo'q</p>
      </div> */}
      <HomePage />
    </>
  );
}
