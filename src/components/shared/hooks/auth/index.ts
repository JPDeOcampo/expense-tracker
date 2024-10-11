"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/validate-token");
      if (!response.ok) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return loading;
};

export default useAuth;
