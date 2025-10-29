import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { marketingNavbarData } from "@/paths";
import { LucideAlignJustify, LucideX } from "lucide-react";
import Logo from "../Logo";
import MobileLink from "../MobileLink";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <LucideAlignJustify className="text-white size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4 max-w-72!">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between gap-4">
            <Logo />
            <SheetClose asChild>
              <Button size="icon" variant="ghost">
                <LucideX className="text-white size-5 rotate-180" />
              </Button>
            </SheetClose>
          </SheetTitle>

          <ul className="space-y-2 mt-6">
            {marketingNavbarData.map((item) => {
              return (
                <li key={item.path()}>
                  <MobileLink
                    className="flex items-center gap-2 [&>svg]:size-4.5"
                    href={item.path()}
                  >
                    {item.icon}
                    {item.title}
                  </MobileLink>
                </li>
              );
            })}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
