import React, { useContext } from 'react';
import LibrarySong from './LibrarySong';
import { DataContext } from "../context/DataProvider";

const Library = () => {

    const { tracks, libraryOpen } = useContext(DataContext);

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
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Library;