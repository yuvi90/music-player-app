import React, { useEffect } from "react";
import { FaPlay, FaAngleLeft, FaAngleRight, FaPause } from 'react-icons/fa';

const Player = ({ currentSong, setCurrentSong, audioRef, isPlaying, setIsPlaying, songInfo, setSongInfo, songs, setSongs }) => {

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id == currentSong.id) {
                return {
                    ...song,
                    active: true,
                };
            } else {
                return {
                    ...song,
                    active: false,
                };
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

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

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id == currentSong.id);
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                if (isPlaying) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.then((audio) => {
                            audioRef.current.play();
                        })
                    }
                }
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                })
            }
        }
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
                        songInfo.duration ? 
                            (
                                !isPlaying ?
                                    getTime(songInfo.duration) :
                                    remainingTime(songInfo.duration, songInfo.currentTime)
                            ) : "0:00"

                    }
                </p>
            </div>

            <div className="play-control">
                <FaAngleLeft size={20} className="skip-back" onClick={() => { skipTrackHandler('skip-back') }} />

                {
                    !isPlaying ?
                        <FaPlay size={25} className="play" onClick={playSongHandler} /> :
                        <FaPause size={25} className="pause" onClick={playSongHandler} />
                }

                <FaAngleRight size={20} className="skip-forward" onClick={() => { skipTrackHandler('skip-forward') }} />
            </div>

        </div>
    );
}

export default Player;