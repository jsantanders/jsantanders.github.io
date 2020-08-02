export function formatReadingTime(minutes : number) {
  let cups = Math.round(minutes / 5);
  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E))
      .fill('🍱')
      .join('')} ${minutes} min read`;
  } else {
    return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} min read`;
  }
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date : string, lang: string) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  const parsedDate = new Date(date);
  const args : Array<string> = [
    lang,
    date,
  ].filter(Boolean);
  return parsedDate.toLocaleDateString(...args);
}
