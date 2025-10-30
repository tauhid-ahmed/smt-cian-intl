import { Heading } from "@/components/Heading";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  variant: "signin" | "signup" | "forgot-password" | "email-verified";
  children: React.ReactNode;
  footer?: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AuthCard({
  children,
  footer,
  trigger,
  title,
  variant,
  open,
  onOpenChange,
}: AuthCardProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogOverlay
        className={cn(variant === "signup" ? "bg-black/90" : "bg-black/50")}
      />
      <DialogContent
        className={cn(
          "sm:max-w-lg space-y-6 lg:space-y-10 rounded-xl shadow-2xl p-6 md:p-10 flex flex-col",
          {
            "bg-sidebar":
              variant === "signin" ||
              variant === "forgot-password" ||
              variant === "email-verified",
            "bg-white text-primary-foreground": variant === "signup",
          }
        )}
      >
        <DialogTitle asChild>
          <Heading as="h2" size="h4" align="center">
            {title}
          </Heading>
        </DialogTitle>
        {children}
        <DialogFooter className="self-center m-0">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
