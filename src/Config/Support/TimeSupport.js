export const converTimeToDate = (time) => {
  let timeReceived = moment(time);
  return timeReceived.format('HH:mm DD/MM/YYYY');
};

export const convertToTimeString = (time, t) => {
  let timeReceived = moment(time);
  let currentTime = moment();
  let equalDate = !timeReceived.isBefore(currentTime, 'day');
  let equalHour = !timeReceived.isBefore(currentTime, 'hour');
  let equalMonth = !timeReceived.isBefore(currentTime, 'month');
  let equalYear = !timeReceived.isBefore(currentTime, 'year');
  if (equalDate && equalHour && equalMonth && equalYear) {
    let diff = Math.floor(currentTime.diff(timeReceived, 'minute'));
    return `${diff} ${t('time.minute')}`;
  } else if (equalDate && equalMonth && equalYear) {
    let diff = Math.floor(currentTime.diff(timeReceived, 'hour'));
    if (diff <= 0) {
      let diff = Math.floor(currentTime.diff(timeReceived, 'minute'));
      return `${diff} ${t('time.minute')}`;
    }
    return `${diff} ${t('time.hour')}`;
  } else if (equalMonth && equalYear) {
    let diff = Math.floor(currentTime.diff(timeReceived, 'day'));
    if (diff <= 0) {
      let diff = Math.floor(currentTime.diff(timeReceived, 'hour'));
      return `${diff} ${t('time.hour')}`;
    }
    return `${diff} ${t('time.day')}`;
  } else if (equalYear) {
    let diff = Math.floor(currentTime.diff(timeReceived, 'month'));
    if (diff <= 0) {
      let diff = Math.floor(currentTime.diff(timeReceived, 'day'));
      return `${diff} ${t('time.day')}`;
    }
    return `${diff} ${t('time.month')}`;
  } else {
    let diff = Math.floor(currentTime.diff(timeReceived, 'year'));
    if (diff <= 0) {
      let diff = Math.floor(currentTime.diff(timeReceived, 'month'));
      return `${diff} ${t('time.month')}`;
    }
    return `${diff} ${t('time.year')}`;
  }
};
