import "./App.css";
import React from "react";
import { formatTime } from "./utils/time";

function useStopWatch() {
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

function StopWatch() {
  const { seconds, isPaused, changeIsPaused, reset, isStartTime } =
    useStopWatch();

  React.useEffect(() => {
    document.title = "Stopwatch";
    const spaceKeyDownEv = (ev: KeyboardEvent): void => {
      if (ev.key === " ") {
        changeIsPaused();
      }
    };
    document.addEventListener("keydown", spaceKeyDownEv);

    return () => {
      document.removeEventListener("keydown", spaceKeyDownEv);
    };
  }, [changeIsPaused]);

  return (
    <>
      <p>{formatTime(seconds, { includeMSeconds: true })}</p>
      <button
        onClick={changeIsPaused}
        onKeyDown={(e) => {
          console.log(e.key);
        }}
      >
        {isStartTime ? `Start` : isPaused ? "Resume" : "Pause"}
      </button>
      {isPaused && !isStartTime && <button onClick={reset}>Reset</button>}
    </>
  );
}

export default StopWatch;
