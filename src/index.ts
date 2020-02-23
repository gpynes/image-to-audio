import {
  transformImageArray,
  convertPixelToTone,
  readFileAsArray,
  writeToWav,
} from './lib'
import { resolve } from 'path'
const filePath = resolve(
  __dirname,
  '..',
  'images',
  'ImagetoSound_Test03_256x362_smaller.jpeg',
)

const outputPath = 'test.wav'
readFileAsArray(filePath)
  .then(transformImageArray())
  .then(convertPixelToTone())
  .then(writeToWav(outputPath))
