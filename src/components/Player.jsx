import React from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from 'react-icons/fa';

const Player = ({ audioRef, isPlaying, setIsPlaying, songInfo, setSongInfo }) => {

//----------------------------------------------->> Event Handlers
    const playSongHandler = () => {
        if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
        }
        else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const remainingTime = (duration, time) => {
        let remainT = duration - time;
        return getTime(remainT);
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

//--------------------------------------------------------------------->> Component
    return (
        <div className="player">

            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    onChange={dragHandler}
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    type="range"
                />
                <p>
                    {
                        !isPlaying ?
                            getTime(songInfo.duration) :
                            remainingTime(songInfo.duration, songInfo.currentTime)
                    }
                </p>
            </div>

            <div className="play-control">
                <FaAngleLeft size={20} className="skip-back" />

                {
                    !isPlaying ?
                        <FaPlay size={25} className="play" onClick={playSongHandler} /> :
                        <FaPause size={25} className="pause" onClick={playSongHandler} />
                }

                <FaAngleRight size={20} className="skip-forward" />
            </div>

        </div>
    );
}

export default Player;