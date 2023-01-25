import React, { useRef, useState } from "react";
//Adding Styles
import "./styles/app.scss";
//Adding Components
import { Player, Song, Library, Nav } from "./components";
//Adding Data
import { data } from "./dummy_data/data";

function App() {

  //------------------------------------------->> State
  const [songs, setSongs] = useState(data);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState(
    {
      currentTime: 0,
      duration: 0,
    }
  );

  //------------------------------------------->> Event Handlers


  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
    });
  }

  //------------------------------------------->> Component
  return (
    <>
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />

      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />

      {
        <Library
          songs={songs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setSongs={setSongs}
          libraryOpen={libraryOpen}
        />
      }

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}>
      </audio>

    </>
  )
}

export default App
