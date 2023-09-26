class Web3Util {
  public static weiToEther = (wei?: bigint, toFixed?: number) => {
    if (!wei || wei === BigInt(0)) {
      if (toFixed) return "0";
      return 0;
    }
    const ether = Number(wei) / 1e18; // 1 Ether = 10^18 Wei
    if (toFixed) return ether.toFixed(toFixed);
    return ether;
  };

  public static etherToWei(ether: number) {
    const wei = ether * 1e18; // 1 Ether = 10^18 Wei
    return wei;
  }
}

export default Web3Util;
