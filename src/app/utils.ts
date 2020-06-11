export function toIterable(length: number) {
  const array = [];
  for (let i = 0; i < length; i++)
    array.push(i);
  return array;
}

export function capitalize(words: string) {
  return words
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}