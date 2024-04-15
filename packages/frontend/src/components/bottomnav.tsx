/** @format */

import { Card } from "./ui/card";
import { Link } from "react-router-dom";
import { NavbarItems } from "../constants/navbarItems";
import { LogOut } from "lucide-react";
import { Logout } from "../services/storage";

const BottomNavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <Link to={to} className='flex flex-col items-center hover:text-slate-500'>
    {icon}
    <span>{label}</span>
  </Link>
);

function BottomNav() {
  return (
    <Card className='bg-white text-blue-800 px-5 py-1 z-10 w-full rounded-lg py-3'>
      <div className='py-2 text-5x1 flex justify-between'>
        {NavbarItems.map((item, index) => (
          <BottomNavItem key={index} {...item} />
        ))}
        <Link
          to={""}
          onClick={Logout}
          className='flex flex-col items-center hover:text-slate-500'>
          <LogOut size={"18px"} />
          <span>Logout</span>
        </Link>
      </div>
    </Card>
  );
}

export default BottomNav;
