import { Skeleton } from "@mui/material";
import Image from "next/image";

interface TicketCardImageProps {
  url?: string;
}

export const TicketCardImage = ({ url }: TicketCardImageProps) => {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center rounded-lg">
      {url ? (
        <Image
          alt="ticket image"
          src={url}
          fill
          style={{
            position: "absolute",
            borderRadius: 4,
            objectFit: "cover",
          }}
        />
      ) : (
        // TODO: update skeleton with tailwindcss component
        <Skeleton
          style={{
            position: "absolute",
            borderRadius: 4,
            width: "100%",
            height: "100%",
          }}
          animation={"wave"}
          variant={"rounded"}
        />
      )}
    </div>
  );
};
