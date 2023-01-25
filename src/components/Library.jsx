import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setIsPlaying, setSongs, libraryOpen }) => {
    return (
        <div className={`library ${libraryOpen ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className='library-songs'>
                {
                    songs.map(song => {
                        return <LibrarySong
                            key={song.id}
                            songs={songs}
                            song={song}
                            setCurrentSong={setCurrentSong}
                            audioRef={audioRef}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            setSongs={setSongs}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Library;