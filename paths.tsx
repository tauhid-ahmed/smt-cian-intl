import {
  LucideBadgeDollarSign,
  LucideBookA,
  LucideCircleDollarSign,
  LucideCloudDownload,
  LucideContact,
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

export const musicNavbarData: NavbarItem[] = [
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
];
