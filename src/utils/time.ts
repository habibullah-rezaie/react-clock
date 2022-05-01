export function formatTime(
  seconds: number,
  options?: { includeMSeconds?: boolean }
) {
  const minString = `${Math.floor((seconds % 3600) / 60)}`.padStart(2, "0");
  const secString = `${Math.floor(seconds % 60)}`.padStart(2, "0");

  const hourString = `${Math.floor(seconds / 3600)}`.padStart(2, "0");
  let timeString = `${hourString}:${minString}:${secString}`;
  if (options?.includeMSeconds) {
    const hundredthOfSecond =
      seconds === 0 ? "00" : `${seconds}`.split(".")[1].slice(0, 2);

    timeString = `${timeString}:${hundredthOfSecond}`;
  }
  return timeString;
}
