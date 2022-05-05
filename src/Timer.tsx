import React from "react";
import { useTimer } from "./utils/hooks/time";
import { formatTime } from "./utils/time";

const initialInputValues = { hour: 0, minute: 0, second: 0 };
function Timer({ onEnded }: { onEnded: () => void }) {
  const { timerState, seconds, setTimerState, setSeconds } = useTimer(
    0,
    "inactive"
  );
  const [inputValues, setInputValues] = React.useState<{
    hour: number;
    minute: number;
    second: number;
  }>(initialInputValues);

  React.useEffect(() => {
    if (timerState === "ended") {
      setInputValues(initialInputValues);
      onEnded();
    }
  }, [onEnded, timerState]);

  function handleTimerInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "hourInput": {
        const inputHour = Number(e.target.value);
        setSeconds(() => {
          return seconds - (inputValues.hour - inputHour) * 3600;
        });
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          hour: inputHour,
        }));
        break;
      }
      case "minuteInput": {
        const inputMinute = Number(e.target.value);
        setSeconds(() => {
          return seconds - (inputValues.minute - inputMinute) * 60;
        });
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          minute: inputMinute,
        }));
        break;
      }
      case "secondInput": {
        const inputSeconds = Number(e.target.value);
        setSeconds(() => {
          return seconds - (inputValues.second - inputSeconds);
        });
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          second: inputSeconds,
        }));
        break;
      }
      default:
        throw new Error("Somthing impossible happend!!");
    }
  }

  const isInactiveOrEnded = timerState === "inactive" || timerState === "ended";
  return (
    <div>
      {isInactiveOrEnded && (
        <div>
          <input
            type="number"
            name="hourInput"
            onChange={handleTimerInputChange}
            value={inputValues["hour"]}
            min={0}
            max={99}
            step={1}
          />
          :
          <input
            type="number"
            name="minuteInput"
            onChange={handleTimerInputChange}
            value={inputValues["minute"]}
            min={0}
            max={59}
            step={1}
          />
          <input
            type="number"
            name="secondInput"
            onChange={handleTimerInputChange}
            value={inputValues["second"]}
            min={0}
            max={59}
            step={1}
          />
          <button
            onClick={() => {
              setTimerState("running");
            }}
          >
            Start
          </button>
        </div>
      )}
      {!isInactiveOrEnded && (
        <div>
          <p>{formatTime(seconds)}</p>
          <button
            onClick={() => {
              timerState === "running"
                ? setTimerState("paused")
                : setTimerState("running");
            }}
          >
            {timerState === "running" ? "Pause" : "Resume"}
          </button>
          <button
            onClick={() => {
              setTimerState("inactive");
              setInputValues(initialInputValues);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Timer;
