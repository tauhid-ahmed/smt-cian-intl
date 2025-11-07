import AuthModals from "@/features/auth/components/AuthModals";
import AuthProvider from "@/features/auth/provider/AuthProvider";
import { LenisProvider } from "@/providers/Lenis";
import QueryProvider from "@/providers/QueryProvider";

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        <LenisProvider>
          {children}
          <AuthModals />
        </LenisProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
