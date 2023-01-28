import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ audioRef, tracks, setTracks, trackIndex, setTrackIndex, isPlaying, setIsPlaying, libraryOpen }) => {
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