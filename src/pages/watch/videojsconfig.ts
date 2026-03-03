export const videojs_config = {
  autoplay: true,
  controls: true,
  loop: false,
  fluid: false,
  disablePictureInPicture: true,

  children: [
    'textTrackDisplay',
    'customOverlay',
    'titleBar',
    'errorDisplay',
    'customLoader',
  ],

  inactivityTimeout: 1000,

  html5: {
    nativeTextTracks: false,
  },
  controlBar: {
    customPlayToggle: true,
    currentTimeDisplay: true,
    progressControl: true,
    durationDisplay: true,
    children: [],
  },
};
