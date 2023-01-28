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
  const audioRef = useRef(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
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

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id == currentSong.id);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        })
      }
    }
  }

  //------------------------------------------->> Component
  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>

      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />

      <Song currentSong={currentSong} />

      <Player
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
      />

      {
        <Library
          songs={songs}
          setSongs={setSongs}
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          libraryOpen={libraryOpen}
        />
      }

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      >
      </audio>

    </div>
  )
}

export default App
