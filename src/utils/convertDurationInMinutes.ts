function convertDurationInMinutes(duration: string): number {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);

  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1].replace('H', ''), 10) : 0;
  const minutes = match[2] ? parseInt(match[2].replace('M', ''), 10) : 0;

  return hours * 60 + minutes;
}

export default convertDurationInMinutes;
