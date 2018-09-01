const fs = require('fs')
const path = require('path')
const Twit = require('twit')
const config = require('./config/production')
const getRandomImage = require('./util/getRandomImage')

const T = new Twit(config)

const uploadRandomImage = (images) => {
  console.log('Opening image...')

  const imgPath = path.join(__dirname, `/images/new/${getRandomImage(images)}`)
  const b64content = fs.readFileSync(imgPath, { encoding: 'base64' })

  console.log('Uploading image...')

  T.post('media/upload', { media_data: b64content })
    .then(({ data: uploadData }) => {
      console.log('Image uploaded.')
      T.post('statuses/update', { media_ids: new Array(uploadData.media_id_string) })
        .then(tweetData => {
          console.log('Tweet posted.')
        })
    })
}

const getImages = () => {
  const imagesPromise = new Promise((resolve, reject) => {
    const imagesDir = path.join(__dirname, 'images/new')
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

getImages()
  .then(images => {
    uploadRandomImage(images)
  })
  .catch(err => {
    console.log(err)
  })
