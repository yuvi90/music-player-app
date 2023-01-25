import React from 'react';
import { FaMusic } from 'react-icons/fa';

const Nav = ({ libraryOpen, setLibraryOpen }) => {

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