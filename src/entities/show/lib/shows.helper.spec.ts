import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { grabPopularShows } from './shows.helper';
import type { ScheduleFullItem } from '@/shared/api/types';

// Fixed "today" for predictable this-week window: 2024-06-15
const MOCK_TODAY = '2024-06-15';

describe('shows.helper', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(MOCK_TODAY));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('grabPopularShows', () => {
    it('returns empty array for empty data', () => {
      expect(grabPopularShows([])).toEqual([]);
    });

    it('skips episodes without _embedded.show', () => {
      const data: ScheduleFullItem[] = [
        { airdate: '2024-06-16', _embedded: {} },
        { airdate: '2024-06-16' },
      ];
      expect(grabPopularShows(data)).toEqual([]);
    });

    it('skips episodes with airdate not in this week', () => {
      const data: ScheduleFullItem[] = [
        {
          airdate: '2024-06-01',
          _embedded: {
            show: { id: 1, name: 'A', weight: 99, rating: { average: 8 } },
          },
        },
      ];
      expect(grabPopularShows(data)).toEqual([]);
    });

    it('skips shows with weight <= 98', () => {
      const data: ScheduleFullItem[] = [
        {
          airdate: '2024-06-16',
          _embedded: {
            show: { id: 1, name: 'A', weight: 98, rating: { average: 8 } },
          },
        },
      ];
      expect(grabPopularShows(data)).toEqual([]);
    });

    it('returns shows with weight > 98 and airdate this week', () => {
      const show = {
        id: 1,
        name: 'Friends',
        weight: 99,
        rating: { average: 8.5 },
      };
      const data: ScheduleFullItem[] = [
        {
          airdate: '2024-06-16',
          _embedded: { show },
        },
      ];
      expect(grabPopularShows(data)).toEqual([show]);
    });

    it('deduplicates by show id', () => {
      const show = {
        id: 42,
        name: 'Same Show',
        weight: 99,
        rating: { average: 7 },
      };
      const data: ScheduleFullItem[] = [
        { airdate: '2024-06-16', _embedded: { show } },
        { airdate: '2024-06-17', _embedded: { show } },
      ];
      expect(grabPopularShows(data)).toEqual([show]);
    });

    it('sorts by weight desc, then rating.average desc', () => {
      const showA = {
        id: 1,
        name: 'A',
        weight: 99,
        rating: { average: 7 },
      };
      const showB = {
        id: 2,
        name: 'B',
        weight: 99,
        rating: { average: 9 },
      };
      const showC = {
        id: 3,
        name: 'C',
        weight: 100,
        rating: { average: 5 },
      };
      const data: ScheduleFullItem[] = [
        { airdate: '2024-06-16', _embedded: { show: showA } },
        { airdate: '2024-06-16', _embedded: { show: showB } },
        { airdate: '2024-06-16', _embedded: { show: showC } },
      ];
      const result = grabPopularShows(data);
      expect(result).toHaveLength(3);
      expect(result[0]).toBe(showC); // weight 100 first
      expect(result[1]).toBe(showB); // weight 99, rating 9
      expect(result[2]).toBe(showA); // weight 99, rating 7
    });
  });
});
