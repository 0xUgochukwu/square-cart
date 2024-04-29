/** @format */

import React, { useEffect, useState } from "react";
import BottomNav from "../../components/bottom-nav";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import { getLocalStorage } from "../../services/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Socket from "../../hooks/socket";
import { encodeIfURL } from "../../services/helpers";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [profilePicture, setProfilePicture] = useState<string>("");

  useEffect(() => {
    const base64image = getLocalStorage("@picture");
    if (base64image) {
      setProfilePicture(JSON.parse(base64image));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Socket />
      <div className='bg-slate-100 min-h-screen'>
        <Header image={encodeIfURL(profilePicture) || ""} />
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
