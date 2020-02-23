import {
  transformImageArray,
  convertPixelToTone,
  readFileAsArray,
  writeToWav,
} from './lib'
import { resolve } from 'path'
import { melodic } from './lib/helpers/melodic'
const filePath = (image: string) => resolve(__dirname, '..', 'images', image)

const outputPath = 'test.wav'
const imageName = 'ImagetoSound_Test03_256x362_smaller.jpeg'

readFileAsArray(filePath(imageName))
  .then(transformImageArray())
  .then(convertPixelToTone())
  .then(writeToWav(outputPath))
