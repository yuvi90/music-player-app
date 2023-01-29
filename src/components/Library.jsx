import React, { useContext } from 'react';
import LibrarySong from './LibrarySong';
import { DataContext } from "../context/DataProvider";

const Library = ({ audioRef }) => {

    const { tracks, setTracks, trackIndex, setTrackIndex, isPlaying, setIsPlaying, libraryOpen } = useContext(DataContext);

    return (
        <div className={`library ${libraryOpen ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {
                    tracks.map(track => {
                        return (
                            <LibrarySong
                                key={track.id}
                                track={track}
                                audioRef={audioRef}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                tracks={tracks}
                                setTracks={setTracks}
                                trackIndex={trackIndex}
                                setTrackIndex={setTrackIndex}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Library;