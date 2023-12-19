import React, { MouseEventHandler, PropsWithChildren } from "react";

import NavbarAvatar from "../../molecules/navbar-avatar";
import SubMenuButton from "../../molecules/sub-menu-button";

type PrimaryCardProps = PropsWithChildren & {
  userId?: string;
  profileImageUrl?: string;
  rewardPoint?: number;
  walletAddress?: string;
  onSignInClick?: MouseEventHandler;
  onLogoutInClick?: MouseEventHandler;
};

const MobileNavigatorBar = ({
  userId,
  profileImageUrl,
  rewardPoint,
  walletAddress,
  onSignInClick,
  onLogoutInClick,
}: PrimaryCardProps) => {
  return (
    <>
      <NavbarAvatar
        rewardPoint={rewardPoint}
        userId={userId}
        src={profileImageUrl}
        onProfileItemClicked={onSignInClick}
        onLogoutBtnClicked={onLogoutInClick}
        walletAddress={walletAddress}
      ></NavbarAvatar>
      <SubMenuButton></SubMenuButton>
    </>
  );
};

export default MobileNavigatorBar;
