import MusicNavbar from "@/components/layout/MusicNavbar";
import NavbarWithSidebar from "@/components/layout/NavbarWithSidebar";

export default function WebLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen grid lg:gap-6 lg:grid-cols-[auto_1fr]">
      <aside className="hidden lg:block">
        <MusicNavbar />
      </aside>

      <main className="flex-1 flex flex-col">
        <NavbarWithSidebar />
        {children}
      </main>
    </div>
  );
}
