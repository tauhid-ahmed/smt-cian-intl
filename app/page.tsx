import { Heading } from "@/components/Heading";
import SmartVideo, { Demo } from "@/components/Video";
import { Button } from "@/components/ui/button"; // example import

export default function Page() {
  return (
    <div className="">
      <Heading size="h1" as="h1" font="serif">
        Feel the Rhythm of Your Soul
      </Heading>
      <Demo />
    </div>
  );
}
