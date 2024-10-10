"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateTokenService } from "@/service/api/validateTokenService";
const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  console.log(loading);
  const validateToken = async (token: any) => {
    try {
      const response = await validateTokenService(token);
      if (!response?.ok) {
        router.push("/");
        setLoading(true);
        return;
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error validating token:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    validateToken(token);
  }, [router]);

  return loading;
};

export default useAuth;
