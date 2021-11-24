function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var videojs = _interopDefault(require('video.js'));
var axios = _interopDefault(require('axios'));

var VideoJS = function VideoJS(props) {
  var videoRef = React__default.useRef(null);
  var playerRef = React__default.useRef(null);
  var options = props.options;
  React__default.useEffect(function () {
    if (!playerRef.current) {
      var videoElement = videoRef.current;
      if (!videoElement) return;
      var player = playerRef.current = videojs(videoElement, options, function () {
        console.log("player is ready");
        handlePlayerReady(player);
      });
    }
  }, [options, videoRef]);
  React__default.useEffect(function () {
    var player = playerRef.current;
    return function () {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  var handlePlayerReady = function handlePlayerReady(player) {
    player.on("waiting", function () {
      console.log("player is waiting");
    });
    player.on("dispose", function () {
      console.log("player will dispose");
    });
  };

  return React__default.createElement("div", {
    "data-vjs-player": true
  }, React__default.createElement("video", {
    ref: videoRef,
    className: "video-js vjs-big-play-centered"
  }));
};

var ELearningPlayer = function ELearningPlayer(_ref) {
  var vid = _ref.vid,
      _ref$apiEndPoint = _ref.apiEndPoint,
      apiEndPoint = _ref$apiEndPoint === void 0 ? "https://elearning.dev.ovptek.vn" : _ref$apiEndPoint,
      token = _ref.token,
      _ref$autoPlay = _ref.autoPlay,
      autoPlay = _ref$autoPlay === void 0 ? false : _ref$autoPlay;

  var _useState = React.useState(),
      options = _useState[0],
      setOptions = _useState[1];

  React.useEffect(function () {
    axios.get(apiEndPoint + "/api/v1/media/" + vid, {
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(function (res) {
      if (res && res.data) {
        var hls = res.data.url.hls;
        var videoJsOptions = {
          autoplay: autoPlay,
          controls: true,
          responsive: true,
          fluid: true,
          defaultVolume: 0,
          html5: {
            nativeControlsForTouch: false,
            nativeAudioTracks: false,
            nativeVideoTracks: false,
            vhs: {
              enableLowInitialPlaylist: true,
              overrideNative: true,
              fastQualityChange: true,
              cacheEncryptionKeys: true
            }
          },
          sources: [{
            src: apiEndPoint + "/" + hls,
            type: "application/x-mpegURL"
          }]
        };
        setOptions(videoJsOptions);
      }
    });
  }, [vid, autoPlay, apiEndPoint, token]);
  return options ? React__default.createElement(VideoJS, {
    options: options
  }) : React__default.createElement("div", null);
};

var PlayerELearning = function PlayerELearning(props) {
  return React__default.createElement(ELearningPlayer, Object.assign({}, props));
};

exports.PlayerELearning = PlayerELearning;
//# sourceMappingURL=index.js.map
