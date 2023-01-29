import React, { createContext, useState } from 'react';
import { data } from "../assets/data";

export const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [tracks, setTracks] = useState(data);
    const [trackIndex, setTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);
    const [songProgress, setSongProgress] = useState({ currentTime: 0, duration: 0, });

    return (
        <DataContext.Provider value={{ tracks, setTracks, trackIndex, setTrackIndex, isPlaying, setIsPlaying, libraryOpen, setLibraryOpen, songProgress, setSongProgress }}>
            {children}
        </DataContext.Provider >
    )
}

export default DataProvider