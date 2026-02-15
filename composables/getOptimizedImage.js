export default function (image, width = 1200, height = 0) {
  if (!image?.filename) return

  const isGif = /\.gif$/i.test(image.filename)
  if (isGif) return image.filename

  let imageSource = image.filename + `/m/${width}x${height}`

  if (image.focus) imageSource += `/filters:focal(${image.focus})`

  return imageSource
}
