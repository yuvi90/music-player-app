import React, { useRef, useState } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from 'react-icons/fa';

const Player = (props) => {
    
    // Ref
    const audioRef = useRef(null);
    // Event Handlers
    const playSongHandler = () => {
        if (!props.isPlaying) {
            audioRef.current.play();
            props.setIsPlaying(true);
        }
        else {
            audioRef.current.pause();
            props.setIsPlaying(false);
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>Start Time</p>
                <input type="range" />
                <p>End Time</p>
            </div>
            <div className="play-control">
                <FaAngleLeft size={20} className="skip-back" />
                {!props.isPlaying ? <FaPlay size={25} className="play" onClick={playSongHandler} /> : <FaPause size={25} className="pause" onClick={playSongHandler} />}
                <FaAngleRight size={20} className="skip-forward" />
            </div>
            <audio ref={audioRef} src={props.currentSong.audio}></audio>
        </div>
    );
}

export default Player;