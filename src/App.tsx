import "./App.css";
import StopWatch from "./StopWatch";
import Timer from "./Timer";
import { useDocumentTitle } from "./utils/hooks/document";

function App() {
  useDocumentTitle('React-Clock | A set of clock utilities build with React.js')
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
