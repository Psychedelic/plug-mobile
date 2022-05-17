import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

export const formatDate = (date, format) => {
  dayjs.extend(advancedFormat);
  return dayjs(date).format(format);
};
