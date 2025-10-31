import {
  LucideBadgeDollarSign,
  LucideBookA,
  LucideCircleDollarSign,
  LucideCloudDownload,
  LucideContact,
  LucideDownload,
  LucideFlower,
  LucideHome,
  LucideMusic,
  LucideStore,
} from "lucide-react";

export type NavbarItem = {
  title: string;
  path: () => string;
  icon?: React.ReactNode;
};

export const marketingNavbarData: NavbarItem[] = [
  {
    title: "Home",
    path: () => "/",
    icon: <LucideHome />,
  },
  {
    title: "Artists",
    path: () => "/artists",
    icon: <LucideFlower />,
  },
  {
    title: "Shop",
    path: () => "/shop",
    icon: <LucideStore />,
  },
  {
    title: "Music",
    path: () => "/music",
    icon: <LucideMusic />,
  },
  {
    title: "Download",
    path: () => "/download",
    icon: <LucideCloudDownload />,
  },
  {
    title: "Subscriptions",
    path: () => "/subscriptions",
    icon: <LucideBadgeDollarSign />,
  },
  {
    title: "About Us",
    path: () => "/about-us",
    icon: <LucideBookA />,
  },
  {
    title: "Contact",
    path: () => "/contact",
    icon: <LucideContact />,
  },
  {
    title: "Donation",
    path: () => "/donation",
    icon: <LucideCircleDollarSign />,
  },
];
