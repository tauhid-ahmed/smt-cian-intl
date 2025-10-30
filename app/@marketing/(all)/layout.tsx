import Navbar from "@/components/layout/Navbar";

export default function WebLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
