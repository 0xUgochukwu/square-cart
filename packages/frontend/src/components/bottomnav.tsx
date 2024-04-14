import { Card } from './ui/card';
import { Link } from 'react-router-dom';
import { NavbarItems } from '../constants/navbarItems';

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
    <div className='py-5 md:px-10 px-5'>
      <Card className='bg-white text-blue-800 px-10 py-1 z-10 w-full rounded-lg'>
        <div className='py-2 text-5x1 flex justify-between'>
          {NavbarItems.map((item, index) => (
            <BottomNavItem key={index} {...item} />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default BottomNav;