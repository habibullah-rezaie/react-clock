import "./App.css";
import StopWatch from "./StopWatch";
import Timer from "./Timer";

function App() {
  return (
    <div>
      <Timer
        onEnded={() => {
          const ringtone = new Audio("/beep-tone.mp3");
          ringtone.play().then(() => {
            alert("Time is up!!");
          });
        }}
      />
      <StopWatch />
    </div>
  );
}

export default App;
