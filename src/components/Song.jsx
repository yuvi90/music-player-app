import React from "react";

const Song = (props) => {
    return (
        <div className="song-container">
            <img src={props.currentSong.cover} alt="album-art" />
            <h2>{props.currentSong.name}</h2>
            <h3>{props.currentSong.artist}</h3>
        </div>
    );
}

export default Song;