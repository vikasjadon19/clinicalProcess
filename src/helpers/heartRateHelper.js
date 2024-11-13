function groupHeartRateData(data) {
  const groupedData = [];
  let intervalStart = new Date(data[0].on_date);
  let intervalEnd = new Date(intervalStart.getTime() + 15 * 60 * 1000);

  let intervalData = [];

  for (const record of data) {
    const currentTime = new Date(record.on_date);
    if (currentTime <= intervalEnd) {
      intervalData.push(parseInt(record.measurement));
    } else {
      groupedData.push({
        from_date: intervalStart,
        to_date: intervalEnd,
        measurement: {
          low: Math.min(...intervalData),
          high: Math.max(...intervalData),
        },
      });
      intervalStart = currentTime;
      intervalEnd = new Date(intervalStart.getTime() + 15 * 60 * 1000);
      intervalData = [parseInt(record.measurement)];
    }
  }

  if (intervalData.length > 0) {
    groupedData.push({
      from_date: intervalStart,
      to_date: intervalEnd,
      measurement: {
        low: Math.min(...intervalData),
        high: Math.max(...intervalData),
      },
    });
  }

  return groupedData;
}

module.exports = { groupHeartRateData }
