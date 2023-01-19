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

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration: duration,
        });
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const remainingTime = (duration, time) => {
        let remainT = duration - time;
        return getTime(remainT)
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration} value={songInfo.currentTime} type="range" />
                <p>{!props.isPlaying ? getTime(songInfo.duration) : remainingTime(songInfo.duration, songInfo.currentTime)}</p>
            </div>
            <div className="play-control">
                <FaAngleLeft size={20} className="skip-back" />
                {!props.isPlaying ? <FaPlay size={25} className="play" onClick={playSongHandler} /> : <FaPause size={25} className="pause" onClick={playSongHandler} />}
                <FaAngleRight size={20} className="skip-forward" />
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={props.currentSong.audio}></audio>
        </div>
    );
}

export default Player;