import { WaveFile } from 'wavefile'
import { promises } from 'fs'
const { writeFile, readFile } = promises

export const readFileAsArray = async (path: string): Promise<number[]> => {
  const buffer = await readFile(path)
  return Array.from(buffer)
}

export interface WavfileOptions {
  channels: number
  sampleRate: number
  bitDepth: string
}
const defaultOptions: WavfileOptions = {
  channels: 2,
  sampleRate: 44100,
  bitDepth: '8',
}
export const writeToWav = (
  path: string,
  options: WavfileOptions = defaultOptions,
) => (data: number[]) => {
  const wav = new WaveFile()
  const _options = Object.assign(defaultOptions, options)
  wav.fromScratch(
    _options.channels,
    _options.sampleRate,
    _options.bitDepth,
    data,
  )

  return writeFile(path, wav.toBuffer())
}
