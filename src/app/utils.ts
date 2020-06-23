export function toIterable(length: number) {
  const array = [];
  for (let i = 0; i < length; i++)
    array.push(i);
  return array;
}

// string
export function capitalize(words: string) {
  return words
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function snakeToTitleCase(word: string) {
  return word
    ?.split('_')
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ') ?? '';
}
export function kebabToTitleCase(word: string) {
  return word
    ?.split('-')
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ') ?? '';
}
export function kebabToLowerCase(word: string) {
  return word
    ?.split('-')
    .map(w => w[0] + w.slice(1).toLowerCase())
    .join(' ') ?? '';
}