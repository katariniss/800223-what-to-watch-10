import { MINUTES_IN_AN_HOUR } from '../const';

const getTimeFromMins = (mins: number): string => {
  const hours = Math.trunc(mins / MINUTES_IN_AN_HOUR);
  const minutes = mins % MINUTES_IN_AN_HOUR;
  return `${hours}h ${minutes}m`;
};

export { getTimeFromMins };
