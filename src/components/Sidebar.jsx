import React, { useState, useRef, useEffect } from "react";
import paninidiganKitaCover from "../assets/paninindiganKitaCover.png";

// Import the audio file
import song from "../audio/PaninindiganKita.mp3";

import { FaPlay } from "react-icons/fa";
import { FaRegCirclePause } from "react-icons/fa6";
import MessageModal from "./MessageModal";

const Sidebar = () => {
  const [viewMessagePopupTrigger, setViewMessagePopupTrigger] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  const handleViewMessageModal = () => {
    setViewMessagePopupTrigger(true);
  };

  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  // Update current time and duration when the audio metadata is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current.duration);
      };

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
      };
    }
  }, []);

  // Handle the audio seek bar
  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  };

  return (
    <div className="bg-primary text-center h-100 my-1 rounded shadow">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="bg-white mt-4 mx-3 rounded shadow">
          <img
            src={paninidiganKitaCover}
            className="rounded mt-5"
            alt="cover"
            style={{ width: "15rem" }}
          />
          <input
            className="form-range w-75"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
          />
          {/* Pass the imported audio file path */}
          <audio ref={audioRef} src={song} />
          <h4>Paninindigan Kita</h4>
          <div className="d-flex justify-content-between mx-5 text-secondary">
            <small>{formatDuration(currentTime)}</small>
            <small>{formatDuration(duration)}</small>
          </div>
          <button onClick={handlePlayPause} className="btn mb-5">
            <span>
              {isPlaying ? <FaRegCirclePause className="fs-4" /> : <FaPlay />}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-3 mx-4 p-3 bg-light-subtle rounded shadow">
        <small className="text-secondary text-start">
          This song signifies my everlasting love for you. Though we may not
          always meet each other, I hope that you can always feel it.
        </small>
        <br />
        <small> I love you, honhon.</small>
      </div>

      <button
        className="btn btn-dark text-white mt-3 py-2"
        onClick={handleViewMessageModal}
      >
        Pindutin mo ako
      </button>

      <MessageModal
        trigger={viewMessagePopupTrigger}
        setTrigger={setViewMessagePopupTrigger}
      />
    </div>
  );
};

export default Sidebar;
