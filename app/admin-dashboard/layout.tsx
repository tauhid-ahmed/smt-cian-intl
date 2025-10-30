import NavbarWithSidebar from "@/components/layout/NavbarWithSidebar";
import SideNavbar from "@/components/layout/SideNavbar";

export default function WebLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen grid lg:gap-6 lg:grid-cols-[auto_1fr]">
      <aside className="hidden lg:block">
        <SideNavbar />
      </aside>

      <main className="flex-1 flex flex-col">
        <NavbarWithSidebar />
        {children}
      </main>
    </div>
  );
}
