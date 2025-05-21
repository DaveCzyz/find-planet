const formatNumber = (num: number | string): string => num === 'unknown' ? 'n/d' : Number(num).toLocaleString('en-US');

export {
  formatNumber
}
