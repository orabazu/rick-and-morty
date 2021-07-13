import React from "react";
import { CharacterContextProvider } from "./contexts/characterContext";
import Characters from "./components/Characters";

import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <CharacterContextProvider>
        <Characters />
      </CharacterContextProvider>
    </div>
  );
}

export default App;
