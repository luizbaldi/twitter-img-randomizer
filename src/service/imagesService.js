/* modules */
const path = require('path')
const fs = require('fs')

const getImages = () => {
  const imagesPromise = new Promise((resolve, reject) => {
    const imagesDir = path.join(__dirname, '..', 'images/museum')
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        reject(err)
      }

      const images = []
      files.forEach(file => images.push(file))

      resolve(images)
    })
  })

  return imagesPromise
}

module.exports = { getImages }
