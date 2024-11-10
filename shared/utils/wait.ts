export async function wait(timeMs: number) {
  await new Promise(resolve => setTimeout(resolve, timeMs));
}

export async function delay<T>(promise: () => Promise<T>, timeMs: number): Promise<T> {
  const [result] = await Promise.all([promise(), wait(timeMs)]);
  return result;
}
