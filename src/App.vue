<template lang="pug">
  b-container#app
    b-row
      b-col.mb-5.text-center.text-md-left(md="4")
        Navigation
      b-col.mb-5(md="8")
        router-view
</template>

<script>
import io from "socket.io-client";
import Navigation from "./components/Navigation.vue";

import startMicrophoneUtil from "./utils/startMicrophone";
import MediaRecorder, {
  EVT_OUTPUT_AUDIO_BUFFER,
} from "./utils/MediaRecorder.class";
import AudioDownsampler from "./utils/AudioDownsampler.class";

const useSpeech = Object.freeze(false);
import { mapState } from 'vuex'

export default {
  name: "app",
  data: () => ({
    socket: null,
    availableSpeechIntents: [],
    currentTranscript: null,
    currentIntentName: null,
  }),
  computed: {
    ...mapState(['me'])
  },
  components: {
    Navigation,
  },
  watch: {
    currentIntentName(newVal) {
      switch (newVal) {
        case "about":
          this.$router.push("/");
          break;
        case "skills":
          this.$router.push("/skills");
          break;
        case "experience":
          this.$router.push("/experience");
          break;
        case "resume":
          window.open('/guido-ruiz-resume.pdf', '_blank');
          break;
        case "email":
          window.open(`mailto:${this.me.email}`, '_blank')
          break;
        case "phone-number":
          window.open(`tel:${this.me.phone}`, '_blank')
          break;
        case "github":
          window.open(this.me.github, '_blank')
          break;
        case "linkedin":
          window.open(this.me.linkedin, '_blank')
          break;
      }
    },
  },
  methods: {
    _handleAvailableSpeechIntents(availableSpeechIntents) {
      this.availableSpeechIntents = availableSpeechIntents;
    },
    _handleCurrentIntentName(currentIntentName) {
      this.currentIntentName = currentIntentName;
    },
    _handleTranscript(currentTranscript) {
      this.currentTranscript = currentTranscript;
    },
  },
  async mounted() {
    if (!useSpeech) return;

    this.socket = io("https://sb-audio-tokenizer-demo.zenosmosis.com/");

    this.socket.on("availableSpeechIntents", this._handleAvailableSpeechIntents);
    this.socket.on("currentIntentName", this._handleCurrentIntentName);
    this.socket.on("transcript", this._handleTranscript);
    // eslint-disable-next-line
    this.socket.on("transcriptionError", console.error);

    const mediaStream = await startMicrophoneUtil();

    const mediaRecorder = new MediaRecorder(mediaStream);
    const audioDownsampler = new AudioDownsampler();

    mediaRecorder.on(EVT_OUTPUT_AUDIO_BUFFER, (audioBuffer) => {
      const { sampleRate } = audioBuffer;

      // Float32Array of single-channel (mono) microphone audio buffer data
      const f32AudioBufferData = audioBuffer.getChannelData(0);

      const audioBlob = audioDownsampler.float32ToPCM16AudioBlob(
        f32AudioBufferData,
        sampleRate
      );

      // Pipe audio blob to backend
      // Note, binary(true) flag is not required, but increases performance
      this.socket.binary(true).emit("audioBuffer", audioBlob);
    });
  },
  destroyed() {
    if (!useSpeech) return;

    this.socket.off("availableSpeechIntents", this._handleAvailableSpeechIntents);
    this.socket.off("currentIntentName", this._handleCurrentIntentName);
    this.socket.off("transcript", this._handleTranscript);
    // eslint-disable-next-line
    this.socket.off("transcriptionError", console.error);
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
