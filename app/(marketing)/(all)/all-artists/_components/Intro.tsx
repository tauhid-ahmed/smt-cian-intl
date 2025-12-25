import Image from "next/image";

export default function Intro() {
  return (
    <div className="intro-height bg-black">
      <Image
        src="/images/all-artist-page-intro-bg.png"
        alt="Intro Image"
        fill
        className="size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"/> 
    </div>
  );
}
