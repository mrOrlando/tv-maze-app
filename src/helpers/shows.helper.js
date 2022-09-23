import dayjs from 'dayjs';
import orderBy from 'lodash.orderby';

export const grabPopularShows = data => {
  const result = data.reduce(
    (acc, episode) => {
      const show = episode._embedded?.show;

      if (!show) {
        return acc;
      }

      const isThisWeek =
        dayjs(episode.airdate).isAfter(dayjs().subtract(1, 'day')) &&
        dayjs(episode.airdate).isBefore(dayjs().add(7, 'day'));

      if (!acc.ids.includes(show.id) && isThisWeek) {
        if (show.weight > 98) {
          acc.shows.push(show);
          acc.ids.push(show.id);
        }
      }

      return acc;
    },
    { shows: [], ids: [] }
  );

  return orderBy(result.shows, ['weight', 'rating.average'], ['desc', 'desc']);
};
