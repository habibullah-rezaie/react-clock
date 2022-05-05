import "./App.css";
import React from "react";
import { formatTime } from "./utils/time";


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
