import { musicNavbarData } from "@/paths";
import Logo from "../Logo";
import MobileLink from "../MobileLink";

export default function MusicNavbar() {
  return (
    <div className="bg-sidebar h-screen w-72 p-8 sticky top-0">
      <div className="flex items-center justify-between gap-4">
        <Logo />
      </div>

      <ul className="space-y-2 mt-10">
        {musicNavbarData.map((item) => {
          return (
            <li key={item.path()}>
              <MobileLink
                className="flex items-center gap-2 [&>svg]:size-4.5"
                href={item.path()}
              >
                {item.icon}
                {item.title}
              </MobileLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
