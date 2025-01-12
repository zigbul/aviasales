function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);

  if (!match) return 'N/A';

  const hours = match[1] ? match[1].replace('H', 'ч ') : '';
  const minutes = match[2] ? match[2].replace('M', 'мин') : '';

  return `${hours}${minutes}`.trim();
}

export default formatDuration;
