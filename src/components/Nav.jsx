import React, { useContext } from 'react';
import { DataContext } from "../context/DataProvider";
import { FaMusic } from 'react-icons/fa';

const Nav = () => {

    const { libraryOpen, setLibraryOpen } = useContext(DataContext);

    const libraryHandler = () => {
        setLibraryOpen(!libraryOpen);
    }

    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={libraryHandler} >
                Library <FaMusic />
            </button>
        </nav>
    )
}

export default Nav