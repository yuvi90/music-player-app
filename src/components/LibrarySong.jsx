import React from 'react';

const LibrarySong = ({ songs, setSongs, song, setCurrentSong, audioRef, isPlaying }) => {

    const selectHandler = () => {
        const newSongs = songs.map((sg) => {
            if (sg.id == song.id) {
                return {
                    ...sg,
                    active: true,
                };
            } else 
            {
                return {
                    ...sg,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
        setCurrentSong(song);

        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        }
    }

    return (
        <div onClick={selectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt="album-art" />
            <div className='song-desc'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;