import React from 'react';

const LibrarySong = ({ song, setCurrentSong }) => {

    const selectHandler = () => {
        setCurrentSong(song)
    }

    return (
        <div onClick={selectHandler} className="library-song">
            <img src={song.cover} alt="album-art" />
            <div className='song-desc'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;