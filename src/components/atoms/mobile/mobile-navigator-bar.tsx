import React, { MouseEventHandler, PropsWithChildren } from "react";
import NavbarAvatar from "../../molecules/navbar-avatar";
import SubMenuButton from "../../molecules/sub-menu-button";

type PrimaryCardProps = PropsWithChildren & {
  isLoggedIn?: boolean;
  userId?: string;
  profileImageUrl?: string;
  rewardPoint?: number;
  walletAddress?: string;
  onSignInClick?: MouseEventHandler;
  onLogoutInClick?: MouseEventHandler;
  onExploreClick?: MouseEventHandler;
  onProjectsClick?: MouseEventHandler;
  onLeaderBoardClick?: MouseEventHandler;
};

const MobileNavigatorBar = ({
  isLoggedIn = false,
  userId,
  profileImageUrl,
  rewardPoint,
  walletAddress,
  onSignInClick,
  onLogoutInClick,
  onExploreClick,
  onProjectsClick,
  onLeaderBoardClick,
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
      <SubMenuButton
        isLoggedIn={isLoggedIn}
        onExploreClick={onExploreClick}
        onProjectsClick={onProjectsClick}
        onLeaderBoardClick={onLeaderBoardClick}
      ></SubMenuButton>
    </>
  );
};

export default MobileNavigatorBar;
