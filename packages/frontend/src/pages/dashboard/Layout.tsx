/** @format */

import React, { useEffect, useState } from "react";
import BottomNav from "../../components/bottom-nav";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { getCookieData } from "../../services/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Socket from "../../hooks/socket";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = getCookieData("user");
    if (data) {
      setUserData(data);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Socket />
      <div className='bg-slate-100 min-h-screen'>
        <Header image={encodeURI(userData?.picture) || ""} />
        <div className='grid grid-cols-1  sm:grid-cols-12 gap-4'>
          <div className='hidden sm:block sm:col-span-2'>
            <Navbar />
          </div>
          <div className='sm:col-span-10'>{children}</div>
        </div>
        <div className='fixed bottom-0 md:hidden visible w-full'>
          <BottomNav />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Layout;
