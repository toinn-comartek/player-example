import React, {useEffect, useState} from "react";
import VideoJS from "./player";
import axios from "axios";

require("videojs-contrib-quality-levels");
require("videojs-hls-quality-selector");
require("videojs-overlay");

interface IVideoJSPlayerProps {
  apiEndPoint?: string
  idStorage: string,
  token: string,
  autoPlay?: boolean
}

const ELearningPlayer: React.FC<IVideoJSPlayerProps> = ({ idStorage, apiEndPoint= 'https://elearning.dev.ovptek.vn', token,autoPlay }) => {

  const playerRef = React.useRef(null);

  const [state, setState] = useState({
    options: null,
  })

  useEffect(() => {
    axios.get(`${apiEndPoint}/api/v1/media/${idStorage}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      if (res && res.data) {
        const {hls} = res.data.url
        let videoJsOptions: any = {
          autoplay: autoPlay,
          controls: true,
          responsive: true,
          fluid: true,
          playsinline: true,
          volume: 0,
          plugins: {
            hlsQualitySelector: {
              default: "auto",
              displayCurrentQuality: true,
            },
          },
          html5: {
            nativeControlsForTouch: false,
            nativeAudioTracks: false,
            nativeVideoTracks: false,
            hls: {
              limitRenditionByPlayerDimensions: true,
              smoothQualityChange: true,
              overrideNative: true,
              cacheEncryptionKeys: true,
            },
          },
          sources: [{
            src: `${apiEndPoint}/${hls}`,
            type: "application/x-mpegURL",
          }],

        };
        setState({
          ...state,
          options: videoJsOptions
        })
      }
    })
  }, [idStorage])

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };
  return (
    state.options && <VideoJS options={state.options} onReady={handlePlayerReady}/>
  );
}

export default ELearningPlayer;