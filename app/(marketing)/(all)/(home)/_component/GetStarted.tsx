"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/provider/AuthProvider";

export default function GetStarted() {
  const { openSignUp } = useAuth();

  return (
    <>
          <Button size="lg" shape="md" width="xl" onClick={openSignUp}>
              Start Free Now
          </Button>
    </>
  );
}
