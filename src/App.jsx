import React, { useRef, useContext } from "react";
import { Player, Song, Library, Nav } from "./components";
import { DataContext } from "./context/DataProvider";
import "./styles/app.scss";

function App() {

  const { tracks, trackIndex, libraryOpen, setTrackIndex, setSongProgress } = useContext(DataContext);
  const audioSrc = tracks[trackIndex].audioSrc;
  const audioRef = useRef(new Audio(audioSrc));

  //------------------------------------------->> Event Listeners

  audioRef.current.addEventListener('loadeddata', (event) => {
    setSongProgress(
      {
        currentTime: event.target.currentTime,
        duration: event.target.duration,
      }
    );
  });

  audioRef.current.addEventListener('timeupdate', (event) => {
    setSongProgress(
      {
        currentTime: event.target.currentTime,
        duration: event.target.duration,
      }
    );
  });

  audioRef.current.addEventListener('ended', () => {
    if (trackIndex < (tracks.length - 1)) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  });

  //------------------------------------------->> Components

  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>

      <Nav />
      <Song />
      <Player
        audioRef={audioRef}
      />
      {
        // <Library
        //   audioRef={audioRef}
        // />
      }

    </div>
  )
}

export default App
