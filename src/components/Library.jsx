import React from 'react';
import LibrarySong from './LibrarySong';

const Library = (props) => {
    return (
        <div className='library'>
            <h2>Library</h2>
            <div className='library-songs'>
                {props.songs.map( song => {
                    return <LibrarySong
                            songs={props.songs} 
                            setCurrentSong={props.setCurrentSong} 
                            song={song}
                            key={song.id} 
                           />
                })}
            </div>
        </div>
    )
}

export default Library;