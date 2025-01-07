import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const Logo = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-y-4  rounded-full p-1">
          <Image src="/logo.svg" alt="Castify" height="80" width="80" />
          <div className={cn("flex flex-col items-center", font.className)}>
            <p className="text-xl font-semibold">Castify</p>
            <p className="text-sm text-muted-foreground">
              Broadcast brilliance, live with Castify.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
