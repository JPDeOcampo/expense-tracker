"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/components/layout/shared/hooks/auth';
import { useRouter } from 'next/navigation';
const Dashboard = () => {
  const loading = useAuth();
  const router = useRouter();
  if (loading) {
    return <p>Loading...</p>; 
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    router.push('/');
  }
  console.log(process.env.JWT_SECRET, process.env.MONGODB_URI)
  return (
    <div>Dashboard <button onClick={handleLogout}>Logout</button></div>
  )
}

export default Dashboard