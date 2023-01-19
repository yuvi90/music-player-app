import React from "react";
import { FaPlay, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Player =   () => 
{
    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <FaPlay />
                <FaAngleLeft />
                <FaAngleRight />
                <p>End Time</p>
            </div>
            <div className="play-control"></div>
        </div>
    );
}

export default Player;