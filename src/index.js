const { getImages } = require('./service/imagesService')
const { uploadRandomImage } = require('./service/twitService')

const startService = () => {
  getImages()
    .then(images => {
      uploadRandomImage(images)
    })
    .catch(err => {
      console.log(err)
    })
}

startService()