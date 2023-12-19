import React, { MouseEventHandler, PropsWithChildren } from "react";

import NavbarAvatar from "../../molecules/navbar-avatar";
import SubMenuButton from "../../molecules/sub-menu-button";

type PrimaryCardProps = PropsWithChildren & {
  userId?: string;
  userName?: string;
  profileImageUrl?: string;
  rewardPoint?: number;
  walletAddress?: string;
};

const MobileNavigatorBar = ({
  userId,
  userName,
  profileImageUrl,
  rewardPoint,
  walletAddress,
}: PrimaryCardProps) => {
  return (
    <>
      <NavbarAvatar
        rewardPoint={rewardPoint}
        userId={userId}
        userName={userName}
        src={profileImageUrl}
        walletAddress={walletAddress}
      ></NavbarAvatar>
      <SubMenuButton></SubMenuButton>
    </>
  );
};

export default MobileNavigatorBar;
