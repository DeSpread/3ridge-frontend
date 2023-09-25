class Web3Util {
  public static weiToEther = (wei: number) => {
    const ether = wei / 1e18; // 1 Ether = 10^18 Wei
    return ether;
  };

  public static etherToWei(ether: number) {
    const wei = ether * 1e18; // 1 Ether = 10^18 Wei
    return wei;
  }
}

export default Web3Util;
