export function formatResultLabel(count: number, limit: number) {
  if (count === 0) {
    return "No results";
  }

  return count === 1 ? "1 result" : `${Math.min(limit, count)} of ${count} results`;
}
