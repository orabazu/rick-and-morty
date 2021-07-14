import React from "react";
import { CharacterContextProvider } from "./contexts/characterContext";
import { EpisodeContextProvider } from "./contexts/episodeContext";
import Characters from "./components/Characters";

import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App">
      <CharacterContextProvider>
        <EpisodeContextProvider>
          <Characters />
        </EpisodeContextProvider>
      </CharacterContextProvider>
    </div>
  );
}

export default App;
