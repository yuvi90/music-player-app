import React, { useContext, useRef, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { getTime, remainingTime } from "../util";
import { FaPlay, FaPause } from 'react-icons/fa';
import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from 'react-icons/bs';

const Player = () => {

    //------------------------------------------>> State
    const { isPlaying, setIsPlaying, songProgress, setSongProgress, trackIndex, setTrackIndex, tracks } = useContext(DataContext);
    const [volume, setVolume] = useState(80);
    const audioSrc = tracks[trackIndex].audioSrc;
    const audioRef = useRef(new Audio(audioSrc));

    //------------------------------------------>> Hooks

    useEffect(() => {
        (async () => {
            audioRef.current.pause();
            audioRef.current.src = audioSrc;
            await setSongProgress(
                {
                    currentTime: audioRef.current.currentTime,
                    duration: audioRef.current.duration,
                }
            );
            if (isPlaying) {
                await audioRef.current.play();
            }
            // Cleans Up Song Progress
            return () => setSongProgress({ currentTime: 0, duration: 0, });
        })();
    }, [trackIndex])

    //----------------------------------------------->> Event Handlers

    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongProgress({ ...songProgress, currentTime: event.target.value });
    }

    audioRef.current.ontimeupdate = async (event) => {
        await setSongProgress(
            {
                currentTime: event.target.currentTime,
                duration: event.target.duration,
            }
        );
    };

    audioRef.current.onended = () => {
        if (trackIndex < (tracks.length - 1)) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    };

    const skipTrackHandler = (direction) => {
        if (direction === 'skip-forward') {
            if (trackIndex < (tracks.length - 1)) {
                setTrackIndex(trackIndex + 1);
            } else {
                setTrackIndex(0);
            }
        }
        if (direction === 'skip-back') {
            if (trackIndex - 1 < 0) {
                setTrackIndex(tracks.length - 1);
            } else {
                setTrackIndex(trackIndex - 1);
            }
        }
    }

    const playSongHandler = async () => {
        if (!isPlaying) {
            await audioRef.current.play();

            setIsPlaying(true);
        }
        else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }

    const volumeHandler = (event) => {
        setVolume(event.target.value);
        audioRef.current.volume = event.target.value / 100;
    }

    //--------------------------------------------------------------------->> Components

    return (
        <div className="player">

            <div className="time-control">

                <input
                    onChange={dragHandler}
                    min={0}
                    max={songProgress.duration || 0}
                    value={songProgress.currentTime}
                    type="range"
                    className="seek-control"
                />

                <div className="time">

                    <p>{getTime(songProgress.currentTime)}</p>

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

            </div>

            <div className="play-control">

                <BsFillSkipBackwardFill
                    className="skip-back"
                    onClick={() => { skipTrackHandler('skip-back') }}
                />

                {
                    !isPlaying ?
                        <FaPlay className="play" onClick={playSongHandler} /> :
                        <FaPause className="pause" onClick={playSongHandler} />
                }

                <BsFillSkipForwardFill
                    className="skip-forward"
                    onClick={() => { skipTrackHandler('skip-forward') }}
                />

            </div>
            
            {/* <input
                onChange={volumeHandler}
                min={0}
                max={100}
                value={volume}
                type="range"
                className="volume-slider"
            /> */}

        </div>
    );
}

export default Player;