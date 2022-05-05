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
          setSeconds(0);
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

export function useStopWatch() {
  const [seconds, setSeconds] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(true);

  React.useEffect(() => {
    let timeoutId: undefined | number = undefined;
    if (!isPaused) {
      timeoutId = window.setInterval(() => {
        setSeconds((time) => time + 0.01);
      }, 10);
    }
    return () => {
      if (timeoutId !== undefined) window.clearInterval(timeoutId);
    };
  }, [isPaused]);

  const isStartTime = seconds === 0;

  const changeIsPaused = () => {
    setIsPaused((pause) => !pause);
  };

  const reset = () => {
    setSeconds(0);
  };
  return { isPaused, seconds, isStartTime, changeIsPaused, reset };
}
