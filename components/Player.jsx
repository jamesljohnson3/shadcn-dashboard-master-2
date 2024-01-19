"use client";
import React, { useEffect, useRef, useState } from "react";
import { BsFillVolumeUpFill } from "react-icons/bs";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import Overlay from "./adsOverlay/Overlay";
import { useAppContext } from '@/app/utils/AppContext';

const Player = ({ prerollVideoURL, mainVideoURL, source, width = 100, loop = false }) => {
  const videoRef = useRef(null);
  const inputRef = useRef(null);
  const wraperRef = useRef(null);
  const [isplaying, setIsplaying] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState("1.0");
  const [playbackToggle, setPlaybackToggle] = useState(false);
  const [volumeValue, setVolumeValue] = useState(100);
  const [progress, setProgress] = useState(
    videoRef?.current?.currentTime ? videoRef.current.currentTime : 0
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [ads, setAds] = useState(true);
  const [adPlayed, setAdPlayed] = useState(false);
  const [showNewButton, setShowNewButton] = useState(true);
  const [skipAdVisible, setSkipAdVisible] = useState(true); // State for Skip Ad visibility

  const videoSource = prerollVideoURL ? prerollVideoURL : mainVideoURL;
  const isMainVideo = videoSource === mainVideoURL;
  const { state, dispatch } = useAppContext();

  const playVideo = () => {
    setIsplaying(true);
    dispatch({ type: 'TOGGLE_PLAYBACK' });


    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pause = (isplaying) => {
    setIsplaying(isplaying);
    dispatch({ type: 'TOGGLE_PLAYBACK' });

    if (!isplaying && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const setPlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = parseFloat(speed);
  };

  const changeVolume = (volume) => {
    videoRef.current.volume = volume;
  };

  function openFullscreen() {
    if (wraperRef.current.requestFullscreen) {
      wraperRef.current.requestFullscreen();
    } else if (wraperRef.current.webkitRequestFullscreen) {
      wraperRef.current.webkitRequestFullscreen();
    } else if (wraperRef.current.msRequestFullscreen) {
      wraperRef.current.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.ontimeupdate = () => {
        setProgress(
          (videoRef.current.currentTime / videoRef.current.duration) * 100
        );
      };
    }

    if (adPlayed && !isplaying) {
      videoRef.current.src = mainVideoURL;
      videoRef.current.play();
    }
  }, [progress, isplaying, adPlayed, mainVideoURL]);


  useEffect(() => {
    if (isMainVideo && prerollVideoURL) {
      videoRef.current.src = prerollVideoURL;
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [isMainVideo, prerollVideoURL]);

  const reloadPlayer = () => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };
  
  const handleSkip = () => {
    videoRef.current.src = mainVideoURL;
    reloadPlayer();
    setSkipAdVisible(false); // Hide Skip Ad button after it's clicked

  };

  const handleNewButtonClick = () => {
    playVideo();
    setShowNewButton(false);
  };

  const playAds = () => {
    let timerId = setTimeout(() => {
      setAds(false);
      setShowSnackbar(true);

      timerId = setTimeout(() => {
        setAds(false);
      }, 10000);
    }, 3000);
  };

  const endAds = () => {
    setAds(false);
  };

  return (
    <div
      ref={wraperRef}
      className="text-white overflow-hidden shadow-xl relative flex items-center justify-center"
      style={{ width: width + "%" }}
    >
      <video
        loop={loop}
        controls={false}
        src={prerollVideoURL || mainVideoURL}
        width={700}
        height={700}
        id="next-player"
        ref={videoRef}
        autoPlay={!prerollVideoURL}
        className="w-full"
        onEnded={endAds}
        onPlay={() => {
          playAds();
          if (isMainVideo) {
            setShowSnackbar(true);
          }
        }}
      ></video>
      <div className=" absolute w-full video-wraper h-[70px] bottom-0 left-0 sm:p-5  flex items-center justify-center">
        <div className="relative w-full  transition-all duration-500 player-controls">
          <div className="absolute w-full bottom-0 flex bg-gradient-to-t from-[#000000ad] to-[#0000] items-center justify-between  space-x-2">
            {!isplaying ? (
              <button
                className="text-3xl text-white"
                onClick={playVideo}
              >
                <AiFillPlayCircle />
              </button>
            ) : (
              <button
                className="text-3xl text-white"
                onClick={() => {
                  pause(false);
                }}
              >
                <AiFillPauseCircle />
              </button>
            )}
            <div className="sm:w-[80%] cursor-pointer w-[60%] relative rounded-full overflow-hidden">
              <div className="w-full cursor-pointer flex items-center justify-center rounded-full ">
                <input
                  type="range"
                  className="absolute cursor-pointer left-0 appearance-none bg-transparent w-full"
                  value={progress}
                  min={0}
                  max={100}
                  ref={inputRef}
                  onChange={(e) => {
                    videoRef.current.currentTime =
                      (e.target.value * videoRef.current.duration) / 100;
                  }}
                />
                <div
                  className="w-full bg-[#b0b0b0]"
                  onClick={(e) => {
                    console.log(e);
                  }}
                >
                  <div
                    style={{ width: progress + "%" }}
                    className={"transition-all h-2 bg-[#ffffff]"}
                  ></div>
                </div>
              </div>
            </div>
            <div className="">
              <button className="text-2xl text-white relative group">
                <span className="">
                  <BsFillVolumeUpFill />
                </span>

                <span className="hidden group-focus-within:inline">
                  <input
                    type="range"
                    className="absolute left-1/2 -translate-x-1/2 bottom-10 -translate-y-1/2 -rotate-90 scale-1 transition-all duration-500  w-[80px] h-[5px] mb-6 bg-transparent rounded-lg cursor-pointer"
                    min={0}
                    max={100}
                    value={volumeValue}
                    onChange={(e) => {
                      setVolumeValue(e.target.value);
                      changeVolume(e.target.value / 100);
                    }}
                  />
                </span>
              </button>
            </div>
            <div className="">
              <button className="bg-white text-xs text-black py-[2px]  font-[800] rounded-xl relative">
                <span
                  onClick={() => {
                    setPlaybackToggle(!playbackToggle);
                  }}
                  className=" z-[999] relative py-[2px] px-3  bg-white top-0 left-0 w-full rounded-full"
                >
                  {currentSpeed}x
                </span>
                <span
                  onClick={() => {
                    setCurrentSpeed("0.5");
                    setPlaybackToggle(false);
                    setPlaybackSpeed(0.5);
                  }}
                  className={
                    playbackToggle
                      ? "absolute z-[1] -top-7  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff]  left-0 w-full rounded-full"
                      : "absolute z-[1]  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff] top-0 left-0 w-full rounded-full"
                  }
                >
                  0.5x
                </span>
                <span
                  onClick={() => {
                    setCurrentSpeed("1.0");
                    setPlaybackToggle(false);
                    setPlaybackSpeed(1);
                  }}
                  className={
                    playbackToggle
                      ? "absolute z-[1] -top-14  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff]  left-0 w-full rounded-full"
                      : "absolute z-[1]  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff] top-0 left-0 w-full rounded-full"
                  }
                >
                  1.0x
                </span>
                <span
                  onClick={() => {
                    setCurrentSpeed("1.5");
                    setPlaybackToggle(false);
                    setPlaybackSpeed(1.5);
                  }}
                  className={
                    playbackToggle
                      ? "absolute z-[1] -top-[5.19rem]  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff]  left-0 w-full rounded-full"
                      : "absolute z-[1]  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff] top-0 left-0 w-full rounded-full"
                  }
                >
                  1.5x
                </span>
                <span
                  onClick={() => {
                    setCurrentSpeed("1.75");
                    setPlaybackToggle(false);
                    setPlaybackSpeed(1.75);
                  }}
                  className={
                    playbackToggle
                      ? "absolute z-[1] -top-28  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff]  left-0 w-full rounded-full"
                      : "absolute z-[1]  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff] top-0 left-0 w-full rounded-full"
                  }
                >
                  1.75x
                </span>
                <span
                  onClick={() => {
                    setCurrentSpeed("2.0");
                    setPlaybackToggle(false);
                    setPlaybackSpeed(2);
                  }}
                  className={
                    playbackToggle
                      ? "absolute z-[1] -top-[8.65rem]  transition-all duration-100 py-[2px] px-3 hover:bg-[#fff] bg-[#d6d6d6]  left-0 w-full rounded-full"
                      : "absolute z-[1]  transition-all duration-100 py-[2px] px-3  bg-[#d6d6d6] hover:bg-[#fff] top-0 left-0 w-full rounded-full"
                  }
                >
                  2.0x
                </span>
              </button>
            </div>
            {isFullscreen ? (
              <button
                className="text-2xl text-white"
                onClick={() => {
                  setIsFullscreen(false);
                  closeFullscreen();
                }}
              >
                <AiOutlineFullscreenExit />
              </button>
            ) : (
              <button
                className="text-2xl text-white"
                onClick={() => {
                  setIsFullscreen(true);
                  openFullscreen();
                }}
              >
                <AiOutlineFullscreen />
              </button>
            )}
          </div>
        </div>
        {!isMainVideo && skipAdVisible && (  // Only show Skip Ad if prerollVideoURL is provided

  <div className="flex justify-center mt-4">
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleSkip}
    >
      Skip Ad
    </button>
  </div>
)}

      </div>
      

      {ads && <Overlay setAds={setAds} endAds={endAds} />}

      {!isplaying && (
        <button
          className="text-3xl text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={handleNewButtonClick}
        >
          <AiFillPlayCircle />
        </button>
      )}
      {showSnackbar && (
        <div className="absolute top-0 left-0 p-2 bg-black bg-opacity-50 text-white">
          Snackbar Message
        </div>
      )}
    </div>
  );
};

export default Player;
