const wait = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

const callWithRetry = async <T,>(
  fn: () => Promise<T>,
  depth = 0
): Promise<T> => {
  try {
    return await fn();
  } catch (e) {
    if (depth > 3) {
      throw e;
    }
    await wait(2 ** depth * 10);
    return callWithRetry(fn, depth + 1);
  }
};

export { callWithRetry };
