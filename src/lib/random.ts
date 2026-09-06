export function freshOrder<T extends { src: string }>(items: readonly T[], key: string): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  try {
    const previous = localStorage.getItem(key);
    if (result.length > 1 && result[0].src === previous) [result[0], result[1]] = [result[1], result[0]];
    if (result.length) localStorage.setItem(key, result[0].src);
  } catch { /* Random ordering also works without browser storage. */ }
  return result;
}
