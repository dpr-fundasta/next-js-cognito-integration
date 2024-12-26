"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [router]);

  return <>{children}</>;
};

export default RouteGuard;
