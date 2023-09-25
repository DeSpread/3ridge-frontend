import Image from "next/image";

interface TicketCardHeaderProps {
  label?: string;
  questCount?: number;
  isWinner: boolean;
  imageUrl?: string;
}

const DEFAULT_PROJECT_IMAGE =
  "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/favicon.ico";

export const TicketCardHeader = ({
  label,
  imageUrl,
  questCount,
  isWinner,
}: TicketCardHeaderProps) => {
  // FIXME: why imageUrl, label is empty string not undefined?
  return (
    <div className="flex items-center justify-between pb-6 pl-1">
      <div className="flex items-center gap-2">
        <Image
          alt="project logo image"
          src={imageUrl || DEFAULT_PROJECT_IMAGE}
          width={28}
          height={28}
          style={{
            borderWidth: 2,
            borderColor: "white",
            borderStyle: "solid",
            borderRadius: 32,
          }}
        />
        <label className="md:text-body1 text-h6">{label || "3ridge"}</label>
      </div>
      {!isWinner ? (
        <div className="text-body1 md:text-body2">{questCount ?? 0} 퀘스트</div>
      ) : (
        <div className="md:text-h6 text-h5">👑</div>
      )}
    </div>
  );
};
