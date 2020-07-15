/**
 * @param {Object} mediaOptions
 * @return {Promise<MediaStream>}
 */
async function startMicrophone(
  mediaOptions = {
    /*
  // Borrowed from screen capture tutorial (even though this class is fully audio)
  // @see https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API/Using_Screen_Capture
  // Notes: When using STT (Homayoon), it seems (at least on of) these
  // options adversely affect the speech recognition
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
  */
    // or
    audio: true
  }
) {
  return navigator.mediaDevices.getUserMedia(mediaOptions);
}

export default startMicrophone;
