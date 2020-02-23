import * as hilbertCurve from './hilbert-curve'

export interface TransformImageArrayOptions {
  /**
   * @default hilbert
   */
  curve?: 'snake' | 'hilbert'

  /**
   * @default false
   */
  blackAndWhite?: boolean
}

const defaultOptions: TransformImageArrayOptions = {
  blackAndWhite: false,
  curve: 'hilbert',
}
export const transformImageArray = (
  options: TransformImageArrayOptions = defaultOptions,
) => (array: number[]): number[] => {
  const _options = Object.assign(defaultOptions, options)
  if (_options.curve === 'snake') {
    return array
  }

  // TODO: figure out
  return hilbertCurve.construct(array, 10)
}
