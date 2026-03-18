export function formatDate(value: string | number | Date | undefined | null): string {
  if (value === undefined || value === null || value === '') return '';
  const date = new Date(value);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}
