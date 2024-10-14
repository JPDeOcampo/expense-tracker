"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isValidating, setIsValidating] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/validate-token");
      if (!response.ok) {
        router.push("/");
      } else {
        setIsValidating(false);
      }
    };

    checkAuth();
  }, [router]);

  return isValidating;
};

export default useAuth;
