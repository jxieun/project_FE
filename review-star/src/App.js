import { useState } from "react";
import "./App.css";
import StarRating from "./components/StarRating";

function App() {
  const [tempRate1, setTempRate1] = useState(3);
  const [tempRate2, setTempRate2] = useState(2);
  return (
    <div className="App">
      {tempRate1}
      <br />
      {tempRate2}
      <StarRating
        onSetRate={setTempRate1}
        defaultRate={tempRate1}
        className="aaa"
      />
      <StarRating max={10} onSetRate={setTempRate2} defaultRate={tempRate2} />
    </div>
  );
}

export default App;
