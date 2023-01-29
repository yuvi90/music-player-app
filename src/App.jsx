import React, { useRef, useContext, useEffect } from "react";
import { Player, Song, Library, Nav } from "./components";
import { DataContext } from "./context/DataProvider";
import "./styles/app.scss";

function App() {

  const { tracks, trackIndex, setTrackIndex, setSongProgress, isPlaying, libraryOpen } = useContext(DataContext);
  const audioSrc = tracks[trackIndex].audioSrc;
  const audioRef = useRef(new Audio(audioSrc));

  //------------------------------------------>> Hooks

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.src = audioSrc;
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => audioRef.current.play())
      }
    }
  }, [trackIndex])

  //------------------------------------------->> Event Listeners

  audioRef.current.onloadeddata = (event) => {
    setSongProgress(
      {
        currentTime: event.target.currentTime,
        duration: event.target.duration,
      }
    );
  };

  audioRef.current.ontimeupdate = (event) => {
    setSongProgress(
      {
        currentTime: event.target.currentTime,
        duration: event.target.duration,
      }
    );
  };

  audioRef.current.onended = () => {
    if (trackIndex < (tracks.length - 1)) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  //------------------------------------------->> Components

  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>

      <Nav />
      <Song />
      <Player audioRef={audioRef} />
      <Library />

    </div>
  )
}

export default App
