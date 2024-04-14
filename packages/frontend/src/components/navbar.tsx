import { Link, useLocation } from "react-router-dom";
import { NavbarItems } from "../constants/navbarItems";

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
    <Link
      to={to}
      className={`text-gray-600 w-full group-hover:text-white ${
        location === to && "text-white"
      }`}>
      <span className='flex justify-left items-center gap-2'>
        {icon}
        <span>{label}</span>
      </span>
    </Link>
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
      </div>
    </div>
  );
};

export default Navbar;
