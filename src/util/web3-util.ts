import Web3 from "web3";

class Web3Util {
  public static weiToEther = (wei?: bigint, toNumber?: boolean) => {
    if (!wei || wei === BigInt(0)) {
      return "0";
    }
    const ether = Web3.utils.fromWei(Number(wei), "ether");
    return ether;
  };

  public static etherToWei(ether: number) {
    return Web3.utils.toWei(ether, "ether");
  }
}

export default Web3Util;
