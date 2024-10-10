"use client";
import { useEffect, useState } from 'react';
import useAuth from '@/components/layout/shared/hooks/auth';

const Dashboard = () => {
  const loading = useAuth();

  if (loading) {
    return <p>Loading...</p>; 
  }

  console.log(process.env.JWT_SECRET, process.env.MONGODB_URI)
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard