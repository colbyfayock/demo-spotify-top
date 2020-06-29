import React, { useState, useRef, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { FaPlay, FaPause, FaPlug } from 'react-icons/fa';

function currentAudioElementFromPlayerRef({ current: currentRef } = {}) {
  const { audioEl } = currentRef;
  const { current } = audioEl;
  return current;
}

const Player = React.forwardRef(({ src, ...rest }, ref) => {
  const backupRef = useRef();
  const playerRef = ref || backupRef;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if ( !src ) return;

    const audio = currentAudioElementFromPlayerRef(playerRef);

    audio.play();
    setIsPlaying(true);
  }, [src])

  function handleOnPlayClick() {
    if ( !src ) return;

    const audio = currentAudioElementFromPlayerRef(playerRef);

    if ( isPlaying ) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  }

  return (
    <div className={`player ${!src ? 'player-inactive' : ''}`}>
      <button onClick={handleOnPlayClick}>
        {src && (
          <>
            { !isPlaying && (
              <>
                <FaPlay className="icon-play" /> <span>Play</span>
              </>
            )}
            { isPlaying && (
              <>
                <FaPause /> <span>Pause</span>
              </>
            )}
          </>
        )}
        {!src && (
          <>
            <FaPlug /> <span>No Track</span>
          </>
        )}
      </button>
      <div className="player-audio">
        <ReactAudioPlayer ref={playerRef} src={src} controls loop {...rest} />
      </div>
    </div>
  )
});

export default Player;