import React, { useState } from "react";
//Adding Styles
import "./styles/app.scss";
//Adding Components
import { Player, Song, Library } from "./components";
import { FaMusic } from 'react-icons/fa';
//Adding Data
import { data } from "./dummy_data/data";

function App() {

  const songs = data;
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <>
      <FaMusic onClick={menuHandler} className="library-icon"/>
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      {!menuOpen ? <Library songs={songs} setCurrentSong={setCurrentSong} /> : null }
      
    </>
  )
}

export default App
