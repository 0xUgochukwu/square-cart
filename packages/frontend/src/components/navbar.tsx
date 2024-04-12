/** @format */

import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, Store, UserRoundCog } from "lucide-react";

const NavbarItem = ({ to, icon, label }: {to: string, icon: React.ReactNode, label: string}) => (
  <div className='rounded-lg p-2 group hover:bg-black transition-all mb-2'>
    <Link to={to} className='text-gray-600 w-full group-hover:text-white'>
      <span className='flex justify-left items-center gap-2'>
        {icon}
        <span>{label}</span>
      </span>
    </Link>
  </div>
);

const Navbar = () => {
  const navbarItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={"18px"} />,
      label: "Home",
    },
    {
      to: "/shop",
      icon: <Store size={"18px"} />,
      label: "Shop",
    },
    {
      to: "/settings",
      icon: <UserRoundCog size={"18px"} />,
      label: "Settings",
    },
    {
      to: "/logout",
      icon: <LogOut size={"18px"} />,
      label: "Logout",
    },
  ];

  return (
    <Card className='auto-rows-max text-sm md:flex hidden'>
      <CardContent className='w-full p-2'>
        {navbarItems.map((item, index) => (
          <NavbarItem key={index} {...item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Navbar;
