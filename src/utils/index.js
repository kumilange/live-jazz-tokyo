export function formatPrice(price) {
  return price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

export function formatMonthOrDate(date, isMonth) {
  const targetIndex = isMonth ? 1 : 2;
  return new Date(date)
    .toDateString()
    .split(' ')[targetIndex];
}

export function formatDate(date) {
  return new Date(date)
    .toDateString()
    .split(' ')
    .slice(1, 3)
    .join('-');
}

export function formatTime(date) {
  return new Date(date)
    .toTimeString()
    .split(':')
    .slice(0, 2)
    .join(':');
}

export function isObjectEmpty(prop) {
  return Object.keys(prop).length === 0;
}
