import React, { useContext } from "react";
import { Player, Song, Library, Nav } from "./components";
import { DataContext } from "./context/DataProvider";
import "./styles/app.scss";

function App() {

  const { libraryOpen } = useContext(DataContext);

  //------------------------------------------->> Components

  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>

      <Nav />
      <div className="container">
        <Song />
        <Player />
      </div>
      <Library />

    </div>
  )
}

export default App
