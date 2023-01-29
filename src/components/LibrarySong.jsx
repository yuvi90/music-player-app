import React, { useContext } from 'react';
import { DataContext } from "../context/DataProvider";

const LibrarySong = ({ track }) => {

    const { tracks, setTracks, setTrackIndex } = useContext(DataContext);

    const selectHandler = async () => {
        const newSongs = tracks.map((song) => {
            if (song.id == track.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setTracks(newSongs);
        await setTrackIndex(track.id - 1);
    }

    return (
        <div onClick={selectHandler} className={`library-song ${track.active ? 'selected' : ''}`}>
            <img src={track.coverSrc} alt="album-art" />
            <div className='song-desc'>
                <h3>{track.title}</h3>
                <h4>{track.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;