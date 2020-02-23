import * as tone from 'tonegenerator'
import wavefile = require('wavefile')
import { createWriteStream } from 'fs'

const note = tone({
  freq: 346.48,
  lengthInSecs: 4,
  volume: 100,
  rate: 44100,
  shape: 'sine',
})

const wav = new wavefile.WaveFile()

console.log('NOTE', note)
wav.fromScratch(2, 44100, '8', note)
createWriteStream('./blah.wav').write(wav.toBuffer())
