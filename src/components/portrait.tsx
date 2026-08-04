import fs from "fs";
import path from "path";
import Image from "next/image";
import { cn } from "@/lib/utils";

function localAssetExists(src: string) {
  if (!src.startsWith("/")) return false;
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

export function BrianPortrait({ src = "/Brian.jpeg", className }: { src?: string; className?: string }) {
  const imageSrc = src.startsWith("/") && localAssetExists(src) ? src : "/portrait-placeholder.svg";

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border-8 border-white bg-[#0B1F33] shadow-[0_28px_70px_rgba(11,31,51,0.18)]", className)}>
      <Image
        src={imageSrc}
        alt="Brian M. Burudi, B2B sales and business development professional"
        width={720}
        height={860}
        priority
        className="h-full w-full object-cover object-center"
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 55vw, 82vw"
      />
    </div>
  );
}
