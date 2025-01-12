import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const parsedToken = JSON.parse(token);

      if (!parsedToken.accessToken) {
        console.error("Access token not found");
        localStorage.removeItem("authToken");
        router.push("/login");
      } else {
        console.log("Token is valid.");
      }
    } else {
      router.push("/login");
    }
  }, [router]);
};
