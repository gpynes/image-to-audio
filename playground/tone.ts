import * as tone from 'tonegenerator'
import * as Speaker from 'speaker'
import wavefile = require('wavefile')
import { createWriteStream } from 'fs'

const note = tone({
  freq: 346.48,
  lengthInSecs: 4,
  volume: 100,
  rate: 44100,
  shape: 'sine',
})

// @ts-ignore
// const speaker = new Speaker({
//   channels: 2, // 2 channels
//   bitDepth: 16, // 16-bit samples
//   sampleRate: 44100, // 44,100 Hz sample rate
// })

const wav = new wavefile.WaveFile()

console.log('NOTE', note)
wav.fromScratch(2, 44100, '8', note)
// speaker.write(wav.toBuffer())
createWriteStream('./blah.wav').write(wav.toBuffer())
