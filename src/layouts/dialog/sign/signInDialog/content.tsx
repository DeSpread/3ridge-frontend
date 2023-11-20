import NetworkSelect from "./networkSelect";
import SignInTypeSelect from "./signInTypeSelect";
import { SignInType } from "./types";
import WalletSelect from "./walletSelect";

import { SupportedNetwork } from "@/types";

interface ContentProps {
  signInType?: SignInType;
  network?: SupportedNetwork;
  onChangeSignInType?(type: SignInType): void;
  onChangeNetwork?(network: SupportedNetwork): void;
  onChangeWallet?(value: string): void;
  onSignIn(): void;
}

export default function Content(props: ContentProps) {
  if (props.signInType === "wallet") {
    if (props.network) {
      return (
        <WalletSelect
          network={props.network}
          onChangeWallet={props.onChangeWallet}
        />
      );
    }

    return <NetworkSelect onChangeNetwork={props.onChangeNetwork} />;
  }

  return (
    <SignInTypeSelect
      onChangeType={props.onChangeSignInType}
      onSignIn={props.onSignIn}
    />
  );
}
