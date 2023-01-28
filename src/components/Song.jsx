import React from "react";

const Song = ({ title, artist, coverSrc }) => {
    return (
        <div className="song-container">
            <img src={coverSrc} alt="album-art" />
            <h2>{title}</h2>
            <h3>{artist}</h3>
        </div>
    );
}

export default Song;