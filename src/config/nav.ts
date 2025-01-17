import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, User, HomeIcon ,Package,Bot} from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/addproducts", title: "Products", icon: Package },
  { href: "/chat", title: "Chat", icon: Bot },
  { href: "/settings", title: "Settings", icon: Cog },
  { href: "/account", title: "Account", icon: User },
];

export const additionalLinks: AdditionalLinks[] = [];
