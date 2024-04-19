
import { LayoutDashboard, ShoppingBag, Store, UserRoundCog } from "lucide-react";

export const NavbarItems = [
  {
    to: "/dashboard/home",
    icon: <LayoutDashboard size={"18px"} />,
    label: "Home",
  },
  {
    to: "/dashboard/shop",
    icon: <Store size={"18px"} />,
    label: "Shop",
  },
  {
    to: "/dashboard/settings",
    icon: <UserRoundCog size={"18px"} />,
    label: "Settings",
  },
  {
    to: "/dashboard/orders",
    icon: <ShoppingBag size={"18px"} />,
    label: "Orders",
  },
];