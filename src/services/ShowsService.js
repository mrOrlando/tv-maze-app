import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://api.tvmaze.com',
});

export default {
  async getShows(query) {
    const url = `/search/shows?q=${query}`;
    const { data: shows } = await apiClient.get(url);

    return shows.map(show => show.show);
  },
  async getShow(showId) {
    const url = `/shows/${showId}?embed=cast`;
    const { data: show } = await apiClient.get(url);

    return show;
  },
  async getFullSchedule() {
    const response = await apiClient.get(`/schedule/full`);
    return response;
  },
};
