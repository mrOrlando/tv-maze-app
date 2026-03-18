import { apiClient } from '@/shared/api/client';
import type { Show, SearchShowItem, ScheduleFullItem } from '@/shared/api/types';

export default {
  async getShows(query: string): Promise<Show[]> {
    const url = `/search/shows?q=${encodeURIComponent(query)}`;
    const { data: shows } = await apiClient.get<SearchShowItem[]>(url);
    return shows.map(item => item.show);
  },
  async getShow(showId: string | number): Promise<Show> {
    const url = `/shows/${showId}?embed=cast`;
    const { data: show } = await apiClient.get<Show>(url);
    return show;
  },
  async getFullSchedule(): Promise<{ data: ScheduleFullItem[] }> {
    const response = await apiClient.get<ScheduleFullItem[]>(`/schedule/full`);
    return response;
  },
};
