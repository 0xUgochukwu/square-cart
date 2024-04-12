/** @format */

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='bg-slate-100 min-h-screen'>{children}</div>;
};

export default Layout;
