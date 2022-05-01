import { formatTime } from "./utils/time";

function Timer() {
  const seconds = 0;
  return <div>{formatTime(seconds)}</div>;
}

export default Timer;
