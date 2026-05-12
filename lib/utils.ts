/**
 * Formats a number as IDR currency.
 */
export const formatCurrency = (price: number): string => {
  if (price === 0) return 'Free';
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
  // Remove space or non-breaking space after Rp
  return formatted.replace(/Rp\s?/, 'Rp');
};

/**
 * Formats an ISO date string to a human-readable format.
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
