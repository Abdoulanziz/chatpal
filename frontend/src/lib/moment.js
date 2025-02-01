import moment from 'moment';

// Format a given date
export const formatDate = (date, format = 'MMMM Do YYYY') => {
  return moment(date).format(format);
};

// Get current date and time
export const getCurrentDateTime = (format = 'MMMM Do YYYY, h:mm:ss a') => {
  return moment().format(format);
};

// Get time from now for a given date
export const timeFromNow = (date) => {
  return moment(date).fromNow();
};