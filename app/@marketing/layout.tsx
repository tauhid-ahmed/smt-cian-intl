import QueryProvider from "@/providers/QueryProvider";

export default function MarketingLayout({ children }: React.PropsWithChildren) {
  return <QueryProvider>{children}</QueryProvider>;
}
