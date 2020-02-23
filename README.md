# Image To Audio App

This is a little application that converts an image to a `wav` file.

### Install instructions

- `npm i` install dependencies
- `nvm install 12.14.1` install node version

### Start

- `npm start`

## How to use

This application works by using the [index](./src/index.ts) file to modify your inputs and outputs.

- `imageName` - what image to use as input (please put all images in the `images/` folder)
- `outputPath` - what to name the audio file
- `transformImageArray()` - options on how to process the input image
- `convertPixelToTone()` - options for how to process each note/tone

## Examples

#### Melodic

There is an example plugin for melodic sounds in the `src/lib/helpers/melodic.ts` file. This will convert each pixel to the closest # note it finds. It is already imported so you can use it.

```ts
.then(transformImageArray({
      curve: 'snake'
  }))
.then(convertPixelToTone(melodic))
```

#### Customize

In order to customize the way the image is `flattened` there are two options:

- `hilbert` (default) - based on the hilbert curve algorithm [link](https://www.youtube.com/watch?v=3s7h2MHQtxc)
- `snake` - read the image line by line

```js
.then(transformImageArray({
    curve: 'snake'
}))

```

In order to customize the pixel -> note processing there are 3 options for the `convertPixelToTone` function.

- `frequency` - how to turn the `red`, `blue`, `green` and `alpha` values into a frequency (basically the note) Should be a value between `0.0 - 9999.9999999999`
- `length` - how long you want that note/frequency to be played for. Should be a value beteen `0.0 - 30.0`
- `volume` - how loud you want the note/frequency to be. Should be a value between `0 - 100`

Each of the properties above has the same signature:

`(red, green, blue, alpha) => number`

Where the parameters passed are number values between `0 - 255` corresponding to how that pixel is composed.

Examples of how to play with these are:

```js
.then(convertPixelToTone({
    frequency: (r, g, b, a) => r + g + b, // default setup
    length: () => 1, // play each note for 1 second
    volume: () => 60 // each note should be 60% volume
}))
```

```js
.then(convertPixelToTone({
    frequency: (r, g, b, a) => Math.max(r, g, b) // grab the biggest of the 3
    length: (r, g, b, a) => (a / 255) * 100 * 3, // play each note for 0 - 3 seconds based on how bright that pixel is
    volume: (r, g, b, a) => (((r + g + b + a) / 4) / 255) * 100 // each note should be louder if it is a darker color
}))
```

```js
.then(convertPixelToTone({
    frequency: (r, g, b, a) => melodic.closest(Math.max(r, g, b)) // grab the closest sharp to the largest number of the 3
}))
```

## TIP

When playing around and testing out, try to use a smaller image (pixel count - height x width) so you can see different results faster. I have a few `_smaller` images in the `images` folder, but feel free to add your own.

## TODO:

- [ ] Fix the `hilbert_curve` function to dynamically calculate the proper `order` to use based on the image's height/width.
- [ ] Create UI layer that can make it easier to play with for non-devs
- [ ] Create more plugins
