import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function page() {
  return (
    <div className="h-screen bg-black">
      <Button width="responsive" size="lg">
        Explore the world
      </Button>
      <Button size="lg" variant="outline" shape="pill" weight="bold">
        Sign up
      </Button>
      <Button variant="secondary" shape="pill" weight="bold">
        Sign up
      </Button>
      <Button variant="accent" shape="pill" weight="bold">
        Sign up
      </Button>
      <Button variant="ghost" text="lg">
        Login
      </Button>
      <Button variant="outline" text="lg">
        Login
      </Button>
      <Logo />
      <div className="h-9.5">Hello</div>
      <SheetDemo />
    </div>
  );
}
