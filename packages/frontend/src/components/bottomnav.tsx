import { LayoutDashboard, LogOut, Store, UserRoundCog } from 'lucide-react';
import { Card } from './ui/card';
import { Link } from 'react-router-dom';

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
    <div className='py-5 md:px-10 px-5'>
      <Card className='bg-white text-blue-800 px-10 py-1 z-10 w-full rounded-lg'>
        <div className='py-2 text-5x1 flex justify-between'>
          {navbarItems.map((item, index) => (
            <BottomNavItem key={index} {...item} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default BottomNav;