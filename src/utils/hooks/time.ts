import * as React from "react";

export type TimerState = "inactive" | "paused" | "running" | "ended";

export function useTimer(startTime?: number) {
  const [timerState, setTimerState] = React.useState<TimerState>("inactive");
  const [seconds, setSeconds] = React.useState(startTime || 0);

  React.useEffect(() => {
    const timerInterval = window.setInterval(() => {
      if (seconds === 0 && timerState === "running") {
        setTimerState("ended");
      }
      setSeconds((sec) => sec - 1);
    }, 1000);

    return () => window.clearInterval(timerInterval);
  }, [seconds, timerState]);

  return { timerState, setTimerState, seconds };
}
