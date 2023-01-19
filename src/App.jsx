import React, { useState } from "react";
//Adding Styles
import "./styles/app.scss";
//Adding Components
import { Player, Song, Library } from "./components";
//Adding Data
import { data } from "./dummy_data/data";

function App() {

  const [songs, setSongs] = useState(data);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </>
  )
}

export default App
