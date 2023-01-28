import React, { useEffect } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from 'react-icons/fa';

const Player = ({ audioRef, isPlaying, setIsPlaying, songProgress, setSongProgress, trackIndex, setTrackIndex, tracks }) => {

    //----------------------------------------------->> Hooks
    useEffect(() => {
        try {
            audioRef.current.pause();
            audioRef.current = new Audio(tracks[trackIndex].audioSrc);
            if (isPlaying) {
                audioRef.current.play();
            }
        } catch (error) {
            console.log(error);
        }
    }, [trackIndex])

    //----------------------------------------------->> Event Handlers
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }

    const remainingTime = (duration, time) => {
        let remainT = duration - time;
        return getTime(remainT);
    }

    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongProgress({ ...songProgress, currentTime: event.target.value });
    }

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

    const skipTrackHandler = async (direction) => {
        if (direction === 'skip-forward') {
            if (trackIndex < (tracks.length - 1)) {
                await setTrackIndex(trackIndex + 1);
            } else {
                await setTrackIndex(0);
            }
        }
        if (direction === 'skip-back') {
            if (trackIndex - 1 < 0) {
                await setTrackIndex(tracks.length - 1);
            } else {
                await setTrackIndex(trackIndex - 1);
            }
        }
        // audioRef.current.pause();
        // audioRef.current = new Audio(tracks[trackIndex].audioSrc);
        // if (isPlaying) {
        //     audioRef.current.play();
        // }
    }

    //--------------------------------------------------------------------->> Component
    return (
        <div className="player">

            <div className="time-control">

                <p>{getTime(songProgress.currentTime)}</p>

                <input
                    onChange={dragHandler}
                    min={0}
                    max={songProgress.duration || 0}
                    value={songProgress.currentTime}
                    type="range"
                />

                <p>
                    {
                        songProgress.duration ?
                            (
                                !isPlaying ?
                                    getTime(songProgress.duration) :
                                    remainingTime(songProgress.duration, songProgress.currentTime)
                            ) : "0:00"

                    }
                </p>

            </div>

            <div className="play-control">

                <FaAngleLeft
                    className="skip-back"
                    onClick={() => { skipTrackHandler('skip-back') }}
                />

                {
                    !isPlaying ?
                        <FaPlay className="play" onClick={playSongHandler} /> :
                        <FaPause className="pause" onClick={playSongHandler} />
                }

                <FaAngleRight
                    className="skip-forward"
                    onClick={() => { skipTrackHandler('skip-forward') }}
                />

            </div>

        </div>
    );
}

export default Player;