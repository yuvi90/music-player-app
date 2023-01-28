import React, { useRef, useState } from "react";
//Adding Styles
import "./styles/app.scss";
//Adding Components
import { Player, Song, Library, Nav } from "./components";
//Adding Data
import { data } from "./assets/data";

function App() {

  //------------------------------------------->> Hooks

  const [tracks, setTracks] = useState(data);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [songProgress, setSongProgress] = useState(
    {
      currentTime: 0,
      duration: 0,
    }
  );

  //-----------------> Destructuring
  const { id, title, artist, coverSrc, audioSrc, active, color } = tracks[trackIndex];

  //------------------------------------------->> Refs
  const audioRef = useRef(new Audio(audioSrc));

  //------------------> Functions
  function loadNewAudio() {
    try {
      audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      if (audioRef.current.readyState == 4) {
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  //------------------------------------------->> Component
  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>

      <Nav
        libraryOpen={libraryOpen}
        setLibraryOpen={setLibraryOpen}
      />

      <Song
        title={title}
        artist={artist}
        coverSrc={coverSrc}
      />

      <Player
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songProgress={songProgress}
        setSongProgress={setSongProgress}
        trackIndex={trackIndex}
        setTrackIndex={setTrackIndex}
        tracks={tracks}
      />

      {
        // <Library
        //   audioRef={audioRef}
        //   tracks={tracks}
        //   setTracks={setTracks}
        //   trackIndex={trackIndex}
        //   setTrackIndex={setTrackIndex}
        //   isPlaying={isPlaying}
        //   setIsPlaying={setIsPlaying}
        //   libraryOpen={libraryOpen}
        // />
      }

    </div>
  )
}

export default App
