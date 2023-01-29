import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";

const Song = () => {

    const { tracks, trackIndex } = useContext(DataContext);

    const coverSrc = tracks[trackIndex].coverSrc;
    const title = tracks[trackIndex].title;
    const artist = tracks[trackIndex].artist;

    return (
        <div className="song-container">
            <img src={coverSrc} alt="album-art" />
            <h2>{title}</h2>
            <h3>{artist}</h3>
        </div>
    );
}

export default Song;