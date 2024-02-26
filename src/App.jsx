import { useState } from "react";

import "./App.css";
import Filter from "./components/Filter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="main-container">
      <Filter />
    </div>
  );
}

export default App;
