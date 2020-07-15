class AudioDownsampler {
  constructor() {
    // Used internally by the this.downsampleL16 method
    this._downsamplerF32Unused = new Float32Array(0);
  }

  /**
   * Converts the given float32Array to a PCM 16, 16-khz ... audio blob,
   * optimized for human voice transmission.
   *
   * @param {Float32Array} float32Array A mono (1 channel) RAW audio container
   * @param {number} inputSampleRate
   * @return {Blob} Blob with mime type of audio/pcm
   */
  float32ToPCM16AudioBlob(float32Array, inputSampleRate) {
    const pcm16 = this.float32ToInt16(
      this.downsampleL16(float32Array, inputSampleRate)
    );
    const audioBlob = new Blob([pcm16], {
      type: 'audio/pcm',
    });
    return audioBlob;
  }

  /**
   * Converts Float32Array to signed Int16Array.
   *
   * @param {Float32Array} float32Array A mono (1 channel) RAW audio container
   */
  float32ToInt16(float32Array) {
    let l = float32Array.length;
    const i16 = new Int16Array(l);

    while (l--) {
      i16[l] = float32Array[l] * 0xffff; // convert to 16 bit
    }

    return i16.buffer;
  }

  /**
   * Downsamples given Float32Array to this class' outputSampleRate options.
   *
   * TODO: Force outputSampleRate to be 16000 for filtering?
   *
   * Code implementation borrowed from IBM Watson:
   * @see https://github.com/watson-developer-cloud/speech-javascript-sdk/blob/master/speech-to-text/webaudio-l16-stream.js
   *
   * @param {Float32Array} float32Array A mono (1 channel) RAW audio container
   * @param {number} inputSampleRate
   * @param {number} outputSampleRate? [default = 16000]
   * @return {Float32Array} Downsampled audio data
   */
  downsampleL16(float32Array, inputSampleRate, outputSampleRate = 16000) {
    if (!inputSampleRate) {
      throw new Error('inputSampleRate is not set');
    }

    let buffer = null;
    const newSamples = float32Array.length;
    const unusedSamples = this._downsamplerF32Unused.length;
    let i = 0;
    let offset = 0;
    if (unusedSamples > 0) {
      buffer = new Float32Array(unusedSamples + newSamples);
      for (i = 0; i < unusedSamples; ++i) {
        buffer[i] = this._downsamplerF32Unused[i];
      }
      for (i = 0; i < newSamples; ++i) {
        buffer[unusedSamples + i] = float32Array[i];
      }
    } else {
      buffer = float32Array;
    }
    // Downsampling and low-pass filter:
    // Input audio is typically 44.1kHz or 48kHz, this downsamples it to 16kHz.
    // It uses a FIR (finite impulse response) filter to remove (or, at least attinuate)
    // audio frequencies > ~8kHz because sampled audio cannot accurately represent
    // frequiencies greater than half of the sample rate.
    // (Human voice tops out at < 4kHz, so nothing important is lost for transcription.)
    // See http://dsp.stackexchange.com/a/37475/26392 for a good explination of this code.
    let filter = [
      -0.037935,
      -0.00089024,
      0.040173,
      0.019989,
      0.0047792,
      -0.058675,
      -0.056487,
      -0.0040653,
      0.14527,
      0.26927,
      0.33913,
      0.26927,
      0.14527,
      -0.0040653,
      -0.056487,
      -0.058675,
      0.0047792,
      0.019989,
      0.040173,
      -0.00089024,
      -0.037935,
    ];

    let samplingRateRatio = inputSampleRate / outputSampleRate;

    let nOutputSamples =
      Math.floor((buffer.length - filter.length) / samplingRateRatio) + 1;
    let outputBuffer = new Float32Array(nOutputSamples);
    for (i = 0; i + filter.length - 1 < buffer.length; i++) {
      offset = Math.round(samplingRateRatio * i);
      let sample = 0;
      for (let j = 0; j < filter.length; ++j) {
        sample += buffer[offset + j] * filter[j];
      }
      outputBuffer[i] = sample;
    }
    let indexSampleAfterLastUsed = Math.round(samplingRateRatio * i);
    let remaining = buffer.length - indexSampleAfterLastUsed;
    if (remaining > 0) {
      this._downsamplerF32Unused = new Float32Array(remaining);
      for (i = 0; i < remaining; ++i) {
        this._downsamplerF32Unused[i] = buffer[indexSampleAfterLastUsed + i];
      }
    } else {
      this._downsamplerF32Unused = new Float32Array(0);
    }
    return outputBuffer;
  }
}

export default AudioDownsampler;
