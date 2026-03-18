import { describe, it, expect, vi, afterEach } from 'vitest';
import { formatDate } from './formatDate';

describe('date.helper', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('formatDate', () => {
    it('returns empty string for null', () => {
      expect(formatDate(null)).toBe('');
    });

    it('returns empty string for undefined', () => {
      expect(formatDate(undefined)).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(formatDate('')).toBe('');
    });

    it('formats ISO date string (en-US short month, 2-digit day, numeric year)', () => {
      const result = formatDate('1994-09-22');
      expect(result).toMatch(/^[A-Za-z]{3}\s+\d{1,2},\s*\d{4}$/);
      expect(result).toContain('1994');
    });

    it('formats Date instance', () => {
      const result = formatDate(new Date('2020-03-15'));
      expect(result).toMatch(/^[A-Za-z]{3}\s+\d{1,2},\s*\d{4}$/);
      expect(result).toContain('2020');
    });

    it('formats timestamp number', () => {
      const result = formatDate(new Date('2015-01-10').getTime());
      expect(result).toMatch(/^[A-Za-z]{3}\s+\d{1,2},\s*\d{4}$/);
      expect(result).toContain('2015');
    });
  });
});
