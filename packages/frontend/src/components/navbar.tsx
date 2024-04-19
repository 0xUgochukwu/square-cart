/** @format */

import { NavLink, useLocation } from "react-router-dom";
import { NavbarItems } from "../utils/navbar/navbarItems";
import { LogOut } from "lucide-react";
import { Logout } from "../services/storage";

const NavbarItem = ({
  to,
  icon,
  label,
  location,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  location: string;
}) => (
  <div
    className={`rounded-lg p-2 group hover:bg-orange-600 ${
      location === to && "bg-orange-600"
    } transition-all mb-2`}>
    <NavLink
      to={to}
      className={`text-gray-600 w-full group-hover:text-white ${
        location === to && "text-white"
      }`}>
      <span className='flex justify-left items-center gap-2'>
        {icon}
        <span>{label}</span>
      </span>
    </NavLink>
  </div>
);

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='auto-rows-max text-sm md:flex hidden'>
      <div className='w-full p-2'>
        {NavbarItems.map((item, index) => (
          <NavbarItem key={index} {...item} location={location.pathname} />
        ))}
        <div
          className={`rounded-lg p-2 group hover:bg-orange-600 transition-all mb-2`}>
          <NavLink
            className={`text-gray-600 w-full group-hover:text-white`}
            to={""}
            onClick={Logout}>
            <span className='flex justify-left items-center gap-2'>
              <LogOut size={"18px"} />
              <span>Logout</span>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
