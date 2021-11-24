import React, { useEffect, useState } from "react";
import VideoJS from "./player";
import axios from "axios";
import { VideoJsPlayerOptions } from "video.js";

interface IVideoJSPlayerProps {
  apiEndPoint?: string;
  vid: string;
  token: string;
  autoPlay?: boolean;
}

const ELearningPlayer: React.FC<IVideoJSPlayerProps> = ({
  vid,
  apiEndPoint = "https://elearning.dev.ovptek.vn",
  token,
  autoPlay = false,
}) => {
  const [options, setOptions] = useState<VideoJsPlayerOptions>();

  useEffect(() => {
    axios
      .get(`${apiEndPoint}/api/v1/media/${vid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res && res.data) {
          const { hls } = res.data.url;
          let videoJsOptions: VideoJsPlayerOptions = {
            autoplay: autoPlay,
            controls: true,
            responsive: true,
            fluid: true,
            // playsinline: true,
            defaultVolume: 0,
            html5: {
              nativeControlsForTouch: false,
              nativeAudioTracks: false,
              nativeVideoTracks: false,
              vhs: {
                enableLowInitialPlaylist: true,
                overrideNative: true,
                fastQualityChange: true,
                cacheEncryptionKeys: true,
              },
            },
            sources: [
              {
                src: `${apiEndPoint}/${hls}`,
                type: "application/x-mpegURL",
              },
            ],
          };
          setOptions(videoJsOptions);
        }
      });
  }, [vid, autoPlay, apiEndPoint, token]);

  return options ? <VideoJS options={options} /> : <div></div>;
};

export default ELearningPlayer;
