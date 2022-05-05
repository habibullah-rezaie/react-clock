import * as React from "react";

export type TimerState = "inactive" | "paused" | "running" | "ended";

export function useTimer(
  startTime?: number,
  initialState: TimerState = "inactive"
) {
  const [timerState, setTimerState] = React.useState<TimerState>(initialState);
  const [seconds, setSeconds] = React.useState(startTime || 0);

  React.useEffect(() => {
    let timerInterval: null | number = null;

    if (timerState === "ended") {
      setTimerState("inactive");
    }

    if (timerState === "running" && seconds !== 0) {
      timerInterval = window.setInterval(() => {
        if (seconds === 1) {
          setTimerState("ended");
          setSeconds(0)
        } else {
          setSeconds((sec) => sec - 1);
        }
      }, 1000);
    } else if (seconds === 0) {
      setTimerState("inactive");
    }

    return () => {
      if (timerInterval != null) {
        window.clearInterval(timerInterval);
      }
    };
  }, [seconds, timerState]);

  return { timerState, setTimerState, seconds, setSeconds };
}
