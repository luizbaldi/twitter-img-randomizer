module.exports = (images) => {
  const imageIndex = Math.floor(Math.random() * images.length)

  return images[imageIndex]
}
