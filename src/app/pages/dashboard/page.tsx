"use client";
import { useEffect, useState } from "react";
import useAuth from "@/components/layout/shared/hooks/auth";
import { useRouter } from "next/navigation";
import { logoutService } from "@/service/api/logoutService";
const Dashboard = () => {
  const loading = useAuth();
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    try {
      const response = await logoutService();
      if (response?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Dashboard <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
