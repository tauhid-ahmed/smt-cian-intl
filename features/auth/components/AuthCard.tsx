import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type AuthCardProps = {
  variant: "signin" | "signup";
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AuthCard({ children, footer }: AuthCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xl" shape="sm">
          Start Free Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="visually-hidden">
          Authentication Card
        </DialogTitle>

        {children}

        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

/*
<DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

*/
