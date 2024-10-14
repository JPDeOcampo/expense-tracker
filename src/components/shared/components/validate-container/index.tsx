"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const ValidateContainer = ({ children }: any) => {
  const [isValidating, setIsValidating] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/validate-token");
        if (!response.ok) {
            console.log('ll')
            router.push("/");
            // location.reload(); 
        } else {
         
          setIsValidating(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };
    if (pathname !== "/") {
      checkAuth();
    } else {
      setIsValidating(false);
    }
  }, [router, pathname, isValidating]);

  return (
    <>
      {isValidating && pathname !== "/" ? <p>redirecting</p> : <>{children}</>}
    </>
  );
};

export default ValidateContainer;
