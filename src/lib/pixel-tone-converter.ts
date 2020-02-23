import * as tonegenerator from 'tonegenerator'

export const convertPixelToTone = (
  options: PixelConversionOptions = pixelConverterDefaultOptions,
) => (data: number[]): number[] => {
  const _options = Object.assign(
    pixelConverterDefaultOptions as mapToTonesOptions,
    options,
  )

  return mapToTones(data, _options)
}

// Each value should be a number between 0 - 255
export type PixelMapper = (
  red: number,
  green: number,
  blue: number,
  alpha: number,
) => number

export interface PixelConversionOptions {
  /**
   * @default 44100
   */
  sampleRate?: number | string
  /**
   * @default 2
   */
  channels?: number
  /**
   * @default 8
   */
  bitDepth?: number | string
  /**
   * @default sum
   */
  frequency?: PixelMapper
  /**
   * @default 30
   */
  volume?: PixelMapper
  /**
   * @default alpha
   */
  length?: PixelMapper
  progress?: (percentage: number) => void
}

const pixelConverterDefaultOptions: PixelConversionOptions = {
  sampleRate: 44100,
  channels: 2,
  bitDepth: '8',
  frequency: (r, g, b) => r + g + b,
  volume: () => 30,
  length: (_r, _g, _b, a) => a / 255,
  progress,
}

interface mapToTonesOptions {
  frequency: PixelMapper
  volume: PixelMapper
  length: PixelMapper
  sampleRate: number
}

const mapToTones = (
  array: number[],
  { frequency, volume, length, sampleRate }: mapToTonesOptions,
) => {
  const tones = []
  const len = array.length / 4
  for (let idx = 0; idx <= array.length / 4; idx += 4) {
    let percentage = Math.floor((idx / len) * 100)
    progress(percentage)

    const r = array[idx] || 0
    const g = array[idx + 1] || 0
    const b = array[idx + 2] || 0
    const a = array[idx + 3] || 0

    const toneData = {
      freq: frequency(r, g, b, a),
      length: length(r, g, b, a),
      volume: volume(r, g, b, a),
      rate: sampleRate,
    }
    const tone = tonegenerator(toneData)
    tones.push(tone)
  }
  return tones.flat()
}

function progress(percentage: number) {
  process.stdout.clearLine(1)
  process.stdout.cursorTo(0)
  process.stdout.write(
    `========= PROCESSING: ${percentage}% ====================`,
  )
}
