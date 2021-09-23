function makeCalendar() {
  function makeDate(year, month, date) {
    return [year, month, date];
  }

  const d = new Date();

  let months = [];
  let month_idx = 0;
  let month_curr = d.getMonth() + 1;
  let year_curr = d.getFullYear();

  while (month_idx < 12) {
    months.push([year_curr, month_curr]);
    month_idx += 1;

    if (month_curr === 11) {
      month_curr = 0;
      year_curr += 1;
    } else month_curr += 1;
  }

  months = months.map((m) => [m[0], m[1] + 1]);

  let dates = [];
  const daysInMonthMap = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  months.forEach((month) => {
    dates.push([
      makeDate(month[0], month[1], 1),
      makeDate(month[0], month[1], daysInMonthMap[month[1]]),
    ]);
  });

  return dates;
}

module.exports = makeCalendar;
