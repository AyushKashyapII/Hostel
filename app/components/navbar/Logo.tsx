"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundColor: "white",
        display: "inline-block",
      }}
    >
      <div className="text-bold text-black">PEC Hostels</div>
      {/* <Image
        onClick={() => router.push("/")}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="75"
        width="120"
        src="/images/logo.png"
      /> */}
    </div>
  );
}

export default Logo;
