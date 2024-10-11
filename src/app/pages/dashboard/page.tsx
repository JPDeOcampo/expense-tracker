"use client";
import { useEffect, useState } from "react";
import useAuth from "@/components/layout/shared/hooks/auth";
import MenuDrawer from "@/components/layout/menu-drawer";
import DashboardContent from "@/components/layout/dashboard-content";

const Dashboard = () => {
  const loading = useAuth();
 

  if (loading) {
    return <p>Loading...</p>;
  }


  return (
    <div className="grid grid-cols-[12%_1fr] gap-6 h-full w-full">
      <MenuDrawer />
      <DashboardContent />
    
    </div>
  );
};

export default Dashboard;
