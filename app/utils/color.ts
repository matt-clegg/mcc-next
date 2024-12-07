const defaultLightColors = [
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-lime-100",
  "bg-emerald-100",
  "bg-amber-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-fuchsia-100",
  "bg-rose-100",
  "bg-orange-100",
  "bg-teal-100",
  "bg-cyan-100",
  "bg-indigo-100"
];

function hashStringToNumber(input: string): number {
  const FNV_PRIME = 16777619;
  const FNV_OFFSET_BASIS = 2166136261;

  let hash = FNV_OFFSET_BASIS;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash *= FNV_PRIME;
  }

  return Math.abs(hash >>> 0); // Ensure the result is a non-negative 32-bit integer
}

export function colorFromString(input: string, colors: string[] = defaultLightColors) {
  const hash = hashStringToNumber(input);
  const index = hash % colors.length;
  return colors[index];
}
