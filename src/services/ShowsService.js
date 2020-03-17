import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://api.tvmaze.com',
});

export default {
  async getShows(query) {
    try {
      const url = `/search/shows?q=${query}`;
      const { data: shows } = await apiClient.get(url);

      return shows.map(show => show.show);
    } catch (error) {
      console.error("Can't load shows", error);
    }
  },
  async getShow(showId) {
    try {
      const url = `/shows/${showId}?embed=cast`;
      const { data: show } = await apiClient.get(url);

      return show;
    } catch (error) {
      console.error("Can't load the show with id " + showId, error);
    }
  },
};
