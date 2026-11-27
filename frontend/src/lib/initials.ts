// Two letters for an avatar: first letters of the first two words, or the first two letters of a single word.
export const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  const letters = words.length > 1 ? words[0][0] + words[1][0] : Array.from(words[0]).slice(0, 2).join('');
  return letters.toUpperCase();
};
