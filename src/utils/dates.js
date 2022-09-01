import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

export const formatDate = (date, format) => {
  dayjs.extend(advancedFormat);
  return dayjs(date).format(format);
};

export const formatLongDate = date => {
  dayjs.extend(customParseFormat);
  return dayjs(date).format('MMM Do, YYYY');
};
