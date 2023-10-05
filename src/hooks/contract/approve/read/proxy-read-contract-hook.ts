export function useProxyReadContract({
  userAddress,
}: {
  userAddress?: `0x${string}`;
}) {
  return {
    data: undefined,
    isError: true,
    isLoading: false,
    error: new Error("it is unable to read contract"),
    isSuccess: false,
  };
}
