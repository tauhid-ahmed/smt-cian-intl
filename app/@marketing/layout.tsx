import AuthModals from "@/features/auth/components/AuthModals";
import AuthProvider from "@/features/auth/provider/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
        <AuthModals />
      </AuthProvider>
    </QueryProvider>
  );
}
