import { HtmlHTMLAttributes } from "react";

import { TicketCardHeader } from "./header";
import { TicketCardImage } from "./image";
import { TicketCardInfo } from "./info";

import { Card } from "@/components/atomic/atoms/card";
import { Image } from "@/components/atomic/atoms/image";
import { Ticket } from "@/types";

interface TicketCardProps extends HtmlHTMLAttributes<HTMLDivElement> {
  ticket?: Ticket;
  username?: string;
  isWinner?: boolean;
  onClick?: () => void;
}

export const TicketCard = ({ ticket, username, onClick }: TicketCardProps) => {
  // FIXME: name.trim should be done in query hook
  const isWinner =
    ticket?.winners?.some(({ name }) => {
      if (!username || !name) return false;
      return name.toUpperCase().trim() === username.toUpperCase().trim();
    }) ?? false;

  return (
    <Card onClick={onClick}>
      <div className="flex flex-col gap-6">
        <TicketCardHeader
          label={ticket?.project?.name}
          imageUrl={ticket?.project?.imageUrl}
          questCount={ticket?.quests?.length}
          isWinner={isWinner}
        />
        <Image
          alt="ticket image"
          src={ticket?.imageUrl}
          className="rounded"
          skeleton
        />
        <TicketCardInfo
          whiteSpaceMode
          title={ticket?.title}
          rewardName={ticket?.rewardPolicy?.context?.rewardName}
          rewardPoint={ticket?.rewardPolicy?.rewardPoint}
          limitNumber={ticket?.rewardPolicy?.context?.limitNumber}
        />
      </div>
    </Card>
  );
};
